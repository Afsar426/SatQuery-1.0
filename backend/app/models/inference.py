import io
from typing import Tuple, Optional, Any
from PIL import Image
from ..core.logging import logger

def preprocess_image(image_bytes: bytes, target_size: int = 448) -> Any:
    """
    Preprocess image according to the SatQuery InternVL 2.5-2B specifications:
    - Open with PIL (handles JPG, JPEG, PNG, TIFF)
    - Convert to RGB (normalizing multi-band/alpha channels)
    - Resize to target_size x target_size (448x448)
    - Convert to normalized PyTorch tensor if torch is available
    """
    image = Image.open(io.BytesIO(image_bytes))
    if image.mode != "RGB":
        image = image.convert("RGB")
    
    # Check if PyTorch and torchvision are available
    try:
        import torch
        from torchvision import transforms
        
        transform = transforms.Compose([
            transforms.Resize((target_size, target_size)),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=(0.485, 0.456, 0.406),
                std=(0.229, 0.224, 0.225)
            )
        ])
        pixel_values = transform(image).unsqueeze(0)
        return pixel_values
    except ImportError:
        # Fallback to PIL Image if PyTorch is not yet installed in the environment
        image = image.resize((target_size, target_size))
        return image


class ConvTemplate:
    """
    Self-contained conversation template for InternVL2.5 ChatML format.
    Matches prototype specification: <|im_start|>user\n...<|im_end|>\n<|im_start|>assistant\n
    """
    def __init__(
        self,
        system_message: str = "",
        roles: Tuple[str, str] = ("<|im_start|>user\n", "<|im_start|>assistant\n"),
        sep: str = "<|im_end|>\n"
    ):
        self.system_message = system_message
        self.roles = roles
        self.messages: list[Tuple[str, Optional[str]]] = []
        self.sep = sep

    def append_message(self, role: str, message: Optional[str]):
        self.messages.append((role, message))

    def get_prompt(self) -> str:
        prompt = ""
        if self.system_message:
            prompt += f"<|im_start|>system\n{self.system_message}{self.sep}"
        for role, message in self.messages:
            if message:
                prompt += f"{role}{message}{self.sep}"
            else:
                prompt += f"{role}"
        return prompt


def run_model_inference(
    model: Any,
    tokenizer: Any,
    pixel_values: Any,
    question: str,
    generation_config: dict,
    device: str = "cpu"
) -> Tuple[str, Optional[float]]:
    """
    Executes model inference and calculates genuine token confidence score.
    Uses ChatML conversation structure and genuine softmax probability average.
    """
    import torch
    
    # 1. Format prompt with image token tags
    if "<image>" not in question:
        question = "<image>\n" + question

    IMG_START_TOKEN = "<img>"
    IMG_END_TOKEN = "</img>"
    IMG_CONTEXT_TOKEN = "<IMG_CONTEXT>"
    
    # Ensure model has img_context_token_id set
    img_context_id = tokenizer.convert_tokens_to_ids(IMG_CONTEXT_TOKEN)
    if img_context_id is not None:
        model.img_context_token_id = img_context_id

    # 2. Build conversation template
    system_msg = getattr(model, "system_message", "") or "You are an AI assistant specialized in satellite and aerial remote sensing image analysis."
    template = ConvTemplate(system_message=system_msg)
    template.append_message(template.roles[0], question)
    template.append_message(template.roles[1], None)
    query = template.get_prompt()
    
    sep_token = template.sep.strip()
    eos_token_id = tokenizer.convert_tokens_to_ids(sep_token)
    if eos_token_id is None or eos_token_id < 0:
        eos_token_id = tokenizer.eos_token_id or 92542

    # 3. Inject image context tokens
    num_image_tokens = getattr(model, "num_image_token", 256)
    num_patches = pixel_values.shape[0] if hasattr(pixel_values, "shape") else 1
    image_tokens = (
        IMG_START_TOKEN
        + IMG_CONTEXT_TOKEN * num_image_tokens * num_patches
        + IMG_END_TOKEN
    )
    query = query.replace("<image>", image_tokens, 1)

    # 4. Tokenize
    model_inputs = tokenizer(query, return_tensors="pt")
    
    # Determine target device
    target_device = torch.device(device)
    if hasattr(model, "language_model") and hasattr(model.language_model, "device"):
        target_device = model.language_model.device
    elif hasattr(model, "device"):
        target_device = model.device

    input_ids = model_inputs["input_ids"].to(target_device)
    attention_mask = model_inputs["attention_mask"].to(target_device)
    
    # Move pixel values
    dtype = torch.float16 if device in ["cuda", "mps"] else torch.float32
    if hasattr(pixel_values, "to"):
        pixel_values = pixel_values.to(device=target_device, dtype=dtype)

    # 5. Build generation configuration
    config = generation_config.copy()
    config.update({
        "eos_token_id": eos_token_id or config.get("eos_token_id", 92542),
        "output_scores": True,
        "return_dict_in_generate": True,
    })

    # 6. Generate with no_grad
    with torch.no_grad():
        output = model.generate(
            pixel_values=pixel_values,
            input_ids=input_ids,
            attention_mask=attention_mask,
            **config,
        )

    # 7. Decode generated answer
    response = tokenizer.decode(output.sequences[0], skip_special_tokens=True)
    if "assistant" in response.lower():
        response = response.split("assistant")[-1].strip(":\n ")
    elif sep_token in response:
        response = response.split(sep_token)[0].strip()

    for stop_word in ["<|im_end|>", "<|endoftext|>", "</s>"]:
        if stop_word in response:
            response = response.split(stop_word)[0].strip()

    # 8. Calculate genuine confidence from token probability scores (NO MOCK SCORES)
    confidence = None
    if hasattr(output, "scores") and output.scores:
        sequence = output.sequences[0]
        num_scored_tokens = len(output.scores)
        generated_tokens = sequence[-num_scored_tokens:] if num_scored_tokens else sequence

        token_confidences = []
        for step, score in enumerate(output.scores):
            if step >= len(generated_tokens):
                break
            probabilities = torch.softmax(score.float(), dim=-1)
            token_id = generated_tokens[step].to(score.device)
            token_confidences.append(probabilities[0, token_id].item())

        if token_confidences:
            confidence = float(sum(token_confidences) / len(token_confidences))

    return response.strip(), confidence
