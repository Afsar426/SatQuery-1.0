from fastapi import APIRouter, File, Form, UploadFile, HTTPException, status
from typing import Optional
from ..services.analysis_service import AnalysisService
from ..schemas.analysis import AnalysisResponse

router = APIRouter(tags=["Analysis"])

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_image(
    file: Optional[UploadFile] = File(None),
    image: Optional[UploadFile] = File(None),
    image_url: Optional[str] = Form(None),
    query: Optional[str] = Form(None),
    question: Optional[str] = Form(None),
    mode: Optional[str] = Form(None)
):
    """
    Primary analysis endpoint for SatQuery AI:
    - Accepts satellite/geographical imagery (max 100 MB).
    - Accepts natural language question in any language (English, Hindi, Hinglish, etc.).
    - Executes remote-sensing vision-language model inference.
    - Returns evidence-based answer and confidence score.
    """
    content: Optional[bytes] = None
    filename = "uploaded_scene.jpg"

    target_file = image or file
    if target_file is not None:
        content = await target_file.read()
        filename = target_file.filename or "uploaded_scene.jpg"
    elif image_url:
        import base64
        import urllib.request
        from pathlib import Path
        
        # Handle data URI
        if image_url.startswith("data:image"):
            try:
                base64_data = image_url.split(",", 1)[1]
                content = base64.b64decode(base64_data)
                filename = "data_uri_image.jpg"
            except Exception as e:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Invalid base64 data in image_url: {e}"
                )
        # Handle local file path
        elif Path(image_url).exists():
            content = Path(image_url).read_bytes()
            filename = Path(image_url).name
        # Handle HTTP URL
        elif image_url.startswith("http://") or image_url.startswith("https://"):
            try:
                with urllib.request.urlopen(image_url, timeout=10) as resp:
                    content = resp.read()
                filename = image_url.split("/")[-1] or "remote_image.jpg"
            except Exception as e:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Could not retrieve image from image_url: {e}"
                )
        else:
            # Check public or workspace directory
            for candidate in [Path(image_url.lstrip("/")), Path("public") / image_url.lstrip("/")]:
                if candidate.exists():
                    content = candidate.read_bytes()
                    filename = candidate.name
                    break

    if content is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No image file or valid image_url provided. Please upload a satellite or geographical image."
        )

    target_query = query or question
    if not target_query:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No question provided. Please enter a natural language question about the image."
        )

    return await AnalysisService.process_analysis(
        image_bytes=content,
        filename=filename,
        raw_query=target_query,
        task_type="Visual Question Answering"
    )


@router.post("/vqa", response_model=AnalysisResponse)
async def visual_question_answering(
    file: Optional[UploadFile] = File(None),
    image: Optional[UploadFile] = File(None),
    query: Optional[str] = Form(None),
    question: Optional[str] = Form(None)
):
    """
    Dedicated endpoint for Visual Question Answering.
    """
    return await analyze_image(file=file, image=image, query=query, question=question)


@router.post("/ground", response_model=AnalysisResponse)
async def visual_grounding(
    file: Optional[UploadFile] = File(None),
    image: Optional[UploadFile] = File(None),
    query: Optional[str] = Form(None),
    question: Optional[str] = Form(None)
):
    """
    Dedicated endpoint for Visual Grounding.
    """
    target_file = image or file
    if target_file is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No image file provided for visual grounding."
        )
    target_query = query or question or "Locate all prominent geographical features in this image."
    content = await target_file.read()
    filename = target_file.filename or "grounding_scene.jpg"

    return await AnalysisService.process_analysis(
        image_bytes=content,
        filename=filename,
        raw_query=target_query,
        task_type="Visual Grounding"
    )
