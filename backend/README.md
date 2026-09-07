# SatQuery AI - FastAPI Backend

Agentic Vision-Language AI for Multimodal Remote-Sensing Image Analysis.

## System Architecture

```
                 USER
                   │
                   ▼
            React / Vite UI
                   │
             FormData Upload
                   │
                   ▼
          FastAPI (Port 8000)
                   │
          ┌────────┴────────┐
          │                 │
     Validation        Query handling
     (100 MB max)      (English / Hindi / Hinglish)
          │                 │
          └────────┬────────┘
                   ▼
             Model Service
                   │
          ┌────────┴────────┐
          │                 │
      Model File       .pkl Config
   (InternVL 2.5-2B)  (satquery_inference_config.pkl)
          │                 │
          └────────┬────────┘
                   ▼
              Preprocessing
          (RGB, 448x448, ImageNet norm)
                   │
                   ▼
             Actual Model
                   │
                   ▼
               Inference
          (Token logits scoring)
                   │
                   ▼
          Answer + Confidence
                   │
                   ▼
             FastAPI JSON
                   │
                   ▼
             React UI
          ┌────────┴────────┐
          ▼                 ▼
    Uploaded Image       AI Answer
                            +
                       Confidence
```

## Setup & Installation

1. Create and activate a Python virtual environment:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

2. Install backend dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```

3. Configure environment variables (optional):
   ```bash
   export MODEL_PATH=./models/InternVL2_5-2B
   export CONFIG_PATH=./models/satquery_inference_config.pkl
   export MAX_UPLOAD_SIZE_MB=100
   export DEVICE=auto
   ```

4. Run the server:
   ```bash
   uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

## API Endpoints

- `GET /api/health` - Check backend status, device, model loaded state, and limits.
- `POST /api/analyze` - Primary analysis endpoint. Accepts `image` / `file` (max 100 MB) and `query` / `question`.
- `POST /api/vqa` - Visual Question Answering endpoint.
- `POST /api/ground` - Visual Grounding endpoint.

## 100 MB Upload Limit

Both the frontend and FastAPI backend strictly enforce a 100 MB maximum file size limit. Uploads exceeding 100 MB return HTTP 413 (`"File size exceeds the 100 MB limit."`).
