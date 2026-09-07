import os
import pickle
from pathlib import Path
from typing import Optional, Dict, Any
from ..core.config import settings
from ..core.logging import logger
from .registry import detect_device

class ModelLoader:
    _instance: Optional['ModelLoader'] = None

    def __init__(self):
        self.model: Any = None
        self.tokenizer: Any = None
        self.config: Dict[str, Any] = {}
        self.device: str = "cpu"
        self.is_loaded: bool = False
        self.is_loading: bool = False
        self.load_error: Optional[str] = None
        self.model_name: str = "OpenGVLab/InternVL2_5-2B"

    @classmethod
    def get_instance(cls) -> 'ModelLoader':
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def load_config(self) -> Dict[str, Any]:
        """
        Safely loads satquery_inference_config.pkl from the project.
        """
        config_path = Path(settings.CONFIG_PATH)
        if not config_path.exists():
            # Check alternative locations
            alt_path = Path("models/satquery_inference_config.pkl")
            if alt_path.exists():
                config_path = alt_path
            else:
                root_path = Path("satquery_inference_config.pkl")
                if root_path.exists():
                    config_path = root_path

        if config_path.exists():
            try:
                with open(config_path, "rb") as f:
                    self.config = pickle.load(f)
                logger.info(f"Loaded inference configuration from {config_path}")
                if "model_path" in self.config:
                    self.model_name = self.config["model_path"]
            except Exception as e:
                logger.error(f"Error reading inference config: {e}")
                self.config = {}
        else:
            logger.warning(f"Inference config not found at {config_path}")
            self.config = {
                "model_path": "OpenGVLab/InternVL2_5-2B",
                "generation_config": {
                    "num_beams": 1,
                    "max_new_tokens": 100,
                    "do_sample": False,
                    "eos_token_id": 92542
                },
                "image_size": 448,
                "num_image_token": 256
            }
        return self.config

    def _resolve_model_target(self) -> tuple[str, bool]:
        """
        Resolves model location and returns (target_path_or_id, local_files_only).
        Resolution order:
        1. settings.MODEL_PATH if it exists locally
        2. ./models/InternVL2_5-2B if it exists locally
        3. Hugging Face local cache snapshot
        4. Configured model_path or settings.MODEL_ID / OpenGVLab/InternVL2_5-2B
        """
        # 1. Configured MODEL_PATH
        configured_path = Path(settings.MODEL_PATH)
        if configured_path.exists() and (configured_path / "config.json").exists():
            resolved = str(configured_path.resolve())
            logger.info(f"Using configured model weights directory: {resolved}")
            return resolved, True

        # 2. Local models directory
        local_dir = Path("models/InternVL2_5-2B")
        if local_dir.exists() and (local_dir / "config.json").exists():
            resolved = str(local_dir.resolve())
            logger.info(f"Using local repository weights directory: {resolved}")
            return resolved, True

        # 3. Check Hugging Face Hub cache snapshots
        candidate_ids = [
            self.config.get("model_path"),
            getattr(settings, "MODEL_ID", None),
            self.model_name,
            "OpenGVLab/InternVL2_5-2B"
        ]
        for cid in candidate_ids:
            if not cid:
                continue
            repo_folder = "models--" + cid.replace("/", "--")
            cache_snapshots = Path.home() / ".cache" / "huggingface" / "hub" / repo_folder / "snapshots"
            if cache_snapshots.exists():
                for snap in cache_snapshots.iterdir():
                    if snap.is_dir() and (snap / "config.json").exists() and (snap / "model.safetensors").exists():
                        resolved = str(snap.resolve())
                        logger.info(f"Found cached Hugging Face snapshot for '{cid}': {resolved}")
                        return resolved, True

        # 4. Fallback to repository ID (will download if internet is accessible)
        model_target = self.config.get("model_path") or getattr(settings, "MODEL_ID", None) or "OpenGVLab/InternVL2_5-2B"
        logger.info(f"No local weights directory found. Target set to remote/hub ID: '{model_target}'")
        return model_target, False

    def load_model(self):
        """
        Loads the trained model once into memory.
        Supports CUDA, Apple Silicon MPS, or CPU fallback.
        """
        if self.is_loaded:
            logger.info(f"Model '{self.model_name}' is already loaded in memory.")
            return

        self.load_config()
        self.device = detect_device(settings.DEVICE)
        
        # Check for PyTorch & Transformers availability
        try:
            import torch
            import transformers
            from transformers import AutoTokenizer, AutoModel
        except ImportError as e:
            self.is_loaded = False
            self.load_error = (
                f"Missing required ML libraries ({e.name}). "
                "Please install torch and transformers into your Python environment."
            )
            logger.warning(f"Model loading skipped: {self.load_error}")
            return

        model_target, local_files_only = self._resolve_model_target()

        # Explicit startup logs
        logger.info("=" * 65)
        logger.info("SatQuery AI Neural Model Initialization")
        logger.info(f"  Selected Model:        {self.model_name}")
        logger.info(f"  Resolved Target Path:  {model_target}")
        logger.info(f"  Compute Device:        {self.device}")
        logger.info(f"  Transformers Version:  {transformers.__version__}")
        logger.info(f"  PyTorch Version:       {torch.__version__}")
        logger.info(f"  Local Files Only:      {local_files_only}")
        logger.info(f"  Initialization Status: INITIALIZING")
        logger.info("=" * 65)

        self.is_loading = True

        try:
            # 1. Sanitize SentencePiece null character if required by modern SentencePiece (>= 0.2.1)
            try:
                import sentencepiece.sentencepiece_model_pb2 as sp_pb2
                for sp_path in Path.home().glob(".cache/huggingface/hub/models--OpenGVLab--InternVL2_5-2B/snapshots/*/tokenizer.model"):
                    try:
                        sp_model = sp_pb2.ModelProto()
                        with open(sp_path, "rb") as f:
                            sp_model.ParseFromString(f.read())
                        has_null = any("\x00" in p.piece for p in sp_model.pieces)
                        if has_null:
                            for p in sp_model.pieces:
                                if "\x00" in p.piece:
                                    p.piece = "<NUL>"
                            with open(sp_path, "wb") as f:
                                f.write(sp_model.SerializeToString())
                            logger.info(f"Sanitized SentencePiece vocabulary at {sp_path}")
                    except Exception as e:
                        logger.debug(f"SentencePiece patch check: {e}")
            except Exception as e:
                logger.debug(f"SentencePiece proto check skipped: {e}")

            # Load Tokenizer
            self.tokenizer = AutoTokenizer.from_pretrained(
                model_target,
                trust_remote_code=True,
                use_fast=False,
                local_files_only=local_files_only
            )
            logger.info("Tokenizer loaded successfully.")

            # 2. Configure model device/dtype
            torch_dtype = torch.float16 if self.device in ["cuda", "mps"] else torch.float32

            # Try loading InternVLChatModel or AutoModel
            try:
                from internvl.model.internvl_chat import InternVLChatModel
                model_cls = InternVLChatModel
            except ImportError:
                model_cls = AutoModel

            # Device map handling
            device_map = "auto" if self.device == "cuda" else None

            self.model = model_cls.from_pretrained(
                model_target,
                torch_dtype=torch_dtype,
                device_map=device_map,
                low_cpu_mem_usage=True,
                trust_remote_code=True,
                local_files_only=local_files_only
            ).eval()

            # Move to device if not auto-mapped by accelerate
            if self.device != "cuda" and hasattr(self.model, "to"):
                self.model = self.model.to(self.device)

            # Assign context token ID for InternVL architecture
            img_context_id = self.tokenizer.convert_tokens_to_ids("<IMG_CONTEXT>")
            if img_context_id is not None:
                self.model.img_context_token_id = img_context_id

            # Defensive guard for weight-tying inspection
            if not hasattr(self.model, "all_tied_weights_keys"):
                self.model.all_tied_weights_keys = {}

            self.is_loaded = True
            self.load_error = None
            logger.info("=" * 65)
            logger.info(f"Model initialization status: SUCCESS ✅")
            logger.info(f"Model '{self.model_name}' successfully loaded and cached in memory on {self.device}.")
            logger.info("=" * 65)

        except Exception as e:
            self.is_loaded = False
            self.load_error = (
                f"Model weights for '{model_target}' could not be loaded: {str(e)}. "
                "Ensure model weights are present in ./models/ or available on Hugging Face Hub."
            )
            logger.error("=" * 65)
            logger.error(f"Model initialization status: FAILED ❌")
            logger.error(self.load_error)
            logger.error("=" * 65)
        finally:
            self.is_loading = False

model_loader = ModelLoader.get_instance()
