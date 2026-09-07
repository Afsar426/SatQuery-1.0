import os
import json
from pathlib import Path
from typing import List

def get_cors_origins() -> List[str]:
    default_origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000"
    ]
    raw = os.getenv("CORS_ORIGINS")
    if not raw:
        return default_origins
    raw = raw.strip()
    if raw.startswith("[") and raw.endswith("]"):
        try:
            parsed = json.loads(raw)
            if isinstance(parsed, list):
                return [str(o).strip() for o in parsed if str(o).strip()]
        except Exception:
            pass
    return [o.strip() for o in raw.split(",") if o.strip()]

try:
    from pydantic_settings import BaseSettings
    class Settings(BaseSettings):
        APP_NAME: str = "SatQuery AI Backend"
        APP_VERSION: str = "1.0.0"
        API_PREFIX: str = "/api"
        DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"
        BASE_DIR: Path = Path(__file__).resolve().parent.parent.parent
        MODEL_ID: str = os.getenv("MODEL_ID", "OpenGVLab/InternVL2_5-2B")
        MODEL_PATH: str = os.getenv("MODEL_PATH", "models/InternVL2_5-2B")
        CONFIG_PATH: str = os.getenv(
            "CONFIG_PATH", 
            str(Path(__file__).resolve().parent.parent.parent.parent / "models" / "satquery_inference_config.pkl")
        )
        DEVICE: str = os.getenv("DEVICE", "auto")
        MAX_UPLOAD_SIZE_MB: int = int(os.getenv("MAX_UPLOAD_SIZE_MB", "100"))
        
        @property
        def MAX_UPLOAD_SIZE_BYTES(self) -> int:
            return self.MAX_UPLOAD_SIZE_MB * 1024 * 1024

        CORS_ORIGINS: List[str] = get_cors_origins()

        class Config:
            extra = "allow"
except ImportError:
    class Settings:
        APP_NAME: str = "SatQuery AI Backend"
        APP_VERSION: str = "1.0.0"
        API_PREFIX: str = "/api"
        DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"
        BASE_DIR: Path = Path(__file__).resolve().parent.parent.parent
        MODEL_ID: str = os.getenv("MODEL_ID", "OpenGVLab/InternVL2_5-2B")
        MODEL_PATH: str = os.getenv("MODEL_PATH", "models/InternVL2_5-2B")
        CONFIG_PATH: str = os.getenv(
            "CONFIG_PATH", 
            str(Path(__file__).resolve().parent.parent.parent.parent / "models" / "satquery_inference_config.pkl")
        )
        DEVICE: str = os.getenv("DEVICE", "auto")
        MAX_UPLOAD_SIZE_MB: int = int(os.getenv("MAX_UPLOAD_SIZE_MB", "100"))
        
        @property
        def MAX_UPLOAD_SIZE_BYTES(self) -> int:
            return self.MAX_UPLOAD_SIZE_MB * 1024 * 1024

        CORS_ORIGINS: List[str] = get_cors_origins()

settings = Settings()
