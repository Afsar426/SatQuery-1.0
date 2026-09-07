import time
import uuid
from fastapi import HTTPException, status
from ..models.loader import model_loader
from ..models.inference import preprocess_image, run_model_inference
from ..services.image_service import ImageService
from ..services.query_service import QueryService
from ..schemas.analysis import AnalysisResponse
from ..core.logging import logger

class AnalysisService:
    @staticmethod
    async def process_analysis(
        image_bytes: bytes,
        filename: str,
        raw_query: str,
        task_type: str = "Visual Question Answering"
    ) -> AnalysisResponse:
        # 1. Enforce 100 MB file size limit
        ImageService.validate_file_size(image_bytes, filename)

        # 2. Validate image structure & format
        ImageService.validate_and_open_image(image_bytes, filename)

        # 3. Validate query
        query = QueryService.validate_query(raw_query)

        # 4. Check model availability (NO MOCK AI RULE)
        if model_loader.is_loading:
            err_msg = (
                f"Model '{model_loader.model_name}' is currently loading weights into memory. "
                "Please retry in a moment."
            )
            logger.info(err_msg)
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail=err_msg
            )
        elif not model_loader.is_loaded:
            err_msg = (
                f"Model is not loaded for {model_loader.model_name}: "
                f"{model_loader.load_error or 'Model weights are unavailable.'} "
                "Please place the model weights in ./models/InternVL2_5-2B or ensure network access to download from Hugging Face."
            )
            logger.error(err_msg)
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail=err_msg
            )

        task_id = f"sat-{int(time.time() * 1000)}-{uuid.uuid4().hex[:6]}"
        logger.info(f"Executing inference for task {task_id} (Query: '{query}')")

        try:
            # 5. Preprocess image
            target_size = model_loader.config.get("image_size", 448)
            pixel_values = preprocess_image(image_bytes, target_size=target_size)

            # 6. Run model inference & calculate token confidence
            generation_config = model_loader.config.get("generation_config", {
                "num_beams": 1,
                "max_new_tokens": 100,
                "do_sample": False,
                "eos_token_id": 92542
            })

            answer, confidence = run_model_inference(
                model=model_loader.model,
                tokenizer=model_loader.tokenizer,
                pixel_values=pixel_values,
                question=query,
                generation_config=generation_config,
                device=model_loader.device
            )

            # 7. Formulate clean response
            return AnalysisResponse(
                success=True,
                taskId=task_id,
                question=query,
                answer=answer,
                confidence=confidence,
                model=model_loader.model_name,
                status="completed"
            )

        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Inference execution failed for task {task_id}: {e}", exc_info=True)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Inference execution failed: {str(e)}"
            )
