from typing import Optional, Dict, Any, List
from pydantic import BaseModel, Field

class AnalysisResponse(BaseModel):
    success: bool = True
    taskId: str
    question: str
    answer: str
    confidence: Optional[float] = None
    model: str = "OpenGVLab/InternVL2_5-2B"
    status: str = "completed"
    detectedArea: Optional[str] = None
    visualEvidence: Optional[Dict[str, Any]] = None
    metadata: Optional[Dict[str, Any]] = None

class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    model_loading: bool = False
    device: str
    model: str
    config_loaded: bool
    upload_limit_mb: int
    message: Optional[str] = None
