from fastapi import APIRouter
from ..models.loader import model_loader
from ..schemas.analysis import HealthResponse
from ..core.config import settings

router = APIRouter(tags=["Health"])

@router.get("/health", response_model=HealthResponse)
async def check_health():
    """
    Returns system status, device info, model readiness, and upload limits.
    """
    if model_loader.is_loaded:
        message = "Model ready for inference"
    elif model_loader.is_loading:
        message = f"Model '{model_loader.model_name}' weights are currently loading into memory. Ready shortly."
    else:
        message = model_loader.load_error or "Model weights not loaded"

    return HealthResponse(
        status="ok",
        model_loaded=model_loader.is_loaded,
        model_loading=model_loader.is_loading,
        device=model_loader.device,
        model=model_loader.model_name,
        config_loaded=bool(model_loader.config),
        upload_limit_mb=settings.MAX_UPLOAD_SIZE_MB,
        message=message
    )
