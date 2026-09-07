# SatQuery AI
### *Agentic Vision-Language AI for Multimodal Remote-Sensing Image Analysis*

SatQuery is a specialized remote-sensing multimodal platform. It transforms natural-language queries (in English, Hindi, Hinglish, etc.) into evidence-grounded insights from satellite and aerial geographical imagery using an integrated FastAPI model inference service and React/Vite interface.

---

## 1. System Architecture

```
                 USER
                   │
                   ▼
            React / Vite UI
                   │
       Multipart / FormData Upload
                   │
                   ▼
          FastAPI (Port 8000)
                   │
          ┌────────┴────────┐
          │                 │
     Validation        Query Handling
   (100 MB Limit)   (Multilingual Support)
          │                 │
          └────────┬────────┘
                   ▼
             Model Service
                   │
          ┌────────┴────────┐
          │                 │
     Model Weights    .pkl Config
   (InternVL 2.5-2B) (satquery_inference_config.pkl)
          │                 │
          └────────┬────────┘
                   ▼
              Preprocessing
        (448x448 RGB, ImageNet Norm)
                   │
                   ▼
             Actual Model
                   │
                   ▼
           Inference Execution
         (Token Logits Scoring)
                   │
                   ▼
          Answer + Confidence
                   │
                   ▼
             FastAPI JSON
                   │
                   ▼
            React Workspace
          ┌────────┴────────┐
          ▼                 ▼
    Uploaded Image      AI Answer
                            +
                       Confidence
```

---

## 2. Model & Inference Configuration

- **Trained Model Architecture**: OpenGVLab InternVL 2.5-2B (`OpenGVLab/InternVL2_5-2B`)
- **Inference Bundle**: [`models/satquery_inference_config.pkl`](./models/satquery_inference_config.pkl)
- **Image Input Format**: 448x448 RGB image tensor normalized with ImageNet mean `(0.485, 0.456, 0.406)` and std `(0.229, 0.224, 0.225)`
- **Image Tokens**: 256 image context tokens per 448x448 patch
- **Generation Parameters**:
  - `num_beams`: 1
  - `max_new_tokens`: 100
  - `do_sample`: False
  - `eos_token_id`: 92542
- **Confidence Calculation**: Mathematically calculated from softmax probabilities over output token logits. If a model inference run does not provide legitimate token logits, `confidence` is returned as `null` without fabricating fake metrics.

### Model Weights Placement
Place local model weights inside the `models/` directory:
```
models/
├── InternVL2_5-2B/
│   ├── config.json
│   ├── model.safetensors (or pytorch_model.bin)
│   ├── tokenizer.json
│   └── ...
└── satquery_inference_config.pkl
```
Alternatively, configure `MODEL_PATH` to point to a local directory or Hugging Face Hub repository.

---

## 3. 100 MB Upload Limit

SatQuery AI enforces a strict **100 MB** upload limit on both ends:
- **Frontend Client**: Blocks files > 100 MB before upload and displays: `"File size exceeds the 100 MB limit."`
- **FastAPI Backend**: Validates payload size and returns HTTP 413 Entity Too Large with `"File size exceeds the 100 MB limit."`

---

## 4. Hardware Requirements & Device Support

The backend automatically detects the best available computing device:
- **NVIDIA GPU (CUDA)**: Uses CUDA acceleration and optional 4-bit quantization.
- **Apple Silicon (MPS)**: Uses Metal Performance Shaders on macOS.
- **CPU Fallback**: Full CPU execution fallback when no GPU is available.

---

## 5. Getting Started

### Prerequisites
- Node.js >= 18.0 & npm >= 9.0
- Python >= 3.10

### Step 1: Install Frontend Dependencies
```bash
npm install
```

### Step 2: Set Up Python Backend Environment
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
```

### Step 3: Run the FastAPI Backend
```bash
# Using the helper script:
./run_backend.sh

# Or directly with uvicorn:
python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
```
The backend API documentation is available at `http://localhost:8000/docs`.

### Step 4: Run the React Frontend
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 6. API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health, active device, model loaded status, and upload limits |
| `POST` | `/api/analyze` | Unified analysis endpoint accepting image (max 100 MB) and query |
| `POST` | `/api/vqa` | Specialized Visual Question Answering |
| `POST` | `/api/ground` | Specialized Visual Grounding |

### Example Request (`POST /api/analyze`)
```bash
curl -X POST http://localhost:8000/api/analyze \
  -F "image=@photo.jpg" \
  -F "query=What geographical features are visible in this satellite image?"
```

### Example Response
```json
{
  "success": true,
  "taskId": "sat-1741366123456-a1b2c3",
  "question": "What geographical features are visible in this satellite image?",
  "answer": "The image reveals a distinct coastline with active tidal estuaries and dense coastal vegetation.",
  "confidence": 0.8937,
  "model": "OpenGVLab/InternVL2_5-2B",
  "status": "completed"
}
```

---

## 7. Development Roadmap

- **CURRENT**:
  - React/Vite interactive geospatial workspace
  - FastAPI backend integration
  - 100 MB upload limit validation (frontend & backend)
  - Multilingual natural language querying (English, Hindi, Hinglish)
  - Single-load model lifecycle and confidence scoring
- **NEXT**:
  - Domain-specific remote-sensing model fine-tuning
  - Visual grounding segmentation overlays
  - Optical + SAR multi-sensor fusion
  - Automated change detection across temporal pairs
- **FUTURE**:
  - Autonomous multi-agent query decomposition
  - Distributed multi-sensor inference pipelines
  - Mission-scale geospatial intelligence deployment
