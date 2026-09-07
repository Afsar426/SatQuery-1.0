# SatQuery AI

SatQuery AI is a multimodal remote-sensing analysis project that lets users upload satellite or aerial imagery and ask questions in natural language. The app is designed to support English, Hindi, and Hinglish queries, making geospatial understanding more accessible for both technical and non-technical users.

This repository contains the full stack for the project:

- React + Vite frontend
- FastAPI backend
- Vision-language model inference layer
- Upload validation and API orchestration
- Remote-sensing image analysis workflow

---

## Overview

The goal of SatQuery is simple: turn satellite imagery into structured, answerable insights using AI. Instead of manually inspecting imagery, users can ask questions like:

- What land use patterns are visible in this image?
- Are there roads, water bodies, or vegetation clusters?
- What features stand out in this satellite scene?

The backend processes the uploaded image and model input, then returns an AI-generated response with confidence information and status metadata.

---

## Key Features

- Satellite and aerial image upload
- Natural-language querying in English, Hindi, and Hinglish
- Visual Question Answering (VQA)
- AI-powered remote-sensing analysis workflow
- Model inference with confidence scoring
- FastAPI backend with structured API responses
- Frontend and backend upload validation
- 100 MB upload cap
- CUDA / MPS / CPU device support
- Modular architecture for future model expansion

---

## Tech Stack

### Frontend
- React
- Vite
- TypeScript
- Tailwind CSS

### Backend
- Python
- FastAPI
- Uvicorn
- Pydantic

### AI / Inference
- Vision-language model integration
- Remote-sensing image preprocessing
- Model lifecycle loading at startup

---

## Project Structure

```text
SatQuery/
├── backend/
│   ├── app/
│   ├── tests/
│   └── requirements.txt
├── models/
├── public/
├── src/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
├── run_backend.sh
├── README.md
└── requirements-ml.txt
```

---

## System Architecture

```text
User
  │
  ▼
React / Vite UI
  │
  ▼
FastAPI Backend
  │
  ├── Upload validation
  ├── Query handling
  ├── Model orchestration
  └── Response formatting
  │
  ▼
Vision-Language Model
  │
  ▼
Image preprocessing + inference
  │
  ▼
Answer + confidence + metadata
```

---

## Model and Configuration

The backend is designed to load a local vision-language model and related configuration from the project environment. The expected model setup is similar to:

```text
models/
├── InternVL2_5-2B/
│   ├── config.json
│   ├── model.safetensors
│   ├── tokenizer.json
│   └── ...
└── satquery_inference_config.pkl
```

The app can be configured to point to a local model directory or a model repository path depending on the environment.

---

## Upload Limit

The project enforces a strict 100 MB maximum upload size for both the frontend and backend.

- Frontend blocks oversized files before upload
- Backend rejects large requests with HTTP 413
- User-facing message: "File size exceeds the 100 MB limit."

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Python 3.10+

### 1. Install frontend dependencies

```bash
npm install
```

### 2. Set up backend environment

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
```

### 3. Run the backend

Using the helper script:

```bash
./run_backend.sh
```

Or directly:

```bash
python -m uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload
```

API documentation is available at:

```text
http://localhost:8000/docs
```

### 4. Run the frontend

```bash
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

## API Endpoints

The backend exposes these main endpoints:

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /api/health | Returns service health and model status |
| POST | /api/analyze | Main image analysis endpoint |
| POST | /api/vqa | Visual question answering |
| POST | /api/ground | Grounding-related analysis |

Example request:

```bash
curl -X POST http://localhost:8000/api/analyze \
  -F "image=@photo.jpg" \
  -F "query=What geographical features are visible in this satellite image?"
```

---

## Roadmap

Planned improvements include:

- More domain-specific remote-sensing fine-tuning
- Improved visual grounding and overlays
- Multi-sensor analysis support
- Change detection across time-series imagery
- More robust multilingual evaluation and QA flows

---

## License

This project is licensed under the terms in the repository license file.

---

## Note

This repo is a prototype / active research-style project, so local model setup and environment configuration may vary depending on hardware and available model artifacts.
