import os
from ..core.logging import logger

def detect_device(preferred: str = "auto") -> str:
    """
    Detects best available computing device: CUDA -> MPS -> CPU
    """
    if preferred and preferred.lower() != "auto":
        return preferred.lower()
    
    try:
        import torch
        if torch.cuda.is_available():
            logger.info(f"CUDA detected: {torch.cuda.get_device_name(0)}")
            return "cuda"
        if hasattr(torch.backends, "mps") and torch.backends.mps.is_available():
            logger.info("Apple Silicon MPS (Metal Performance Shaders) detected")
            return "mps"
    except ImportError:
        pass
    
    logger.info("Using CPU for model execution")
    return "cpu"
