# SatQuery
### *Earth Observation Intelligence*

SatQuery is an agentic remote-sensing platform developed for the SIH 2026 demonstration. It transforms natural-language queries into evidence-grounded insights from satellite imagery using specialized remote-sensing models, GeoAI tools, and multi-sensor orchestration.

---

## Key Features

1. **Natural-Language Geospatial Querying**: Ask questions in plain English (e.g., *"Where is the water body in this image?"*, *"Describe this image"*, *"Find built-up area"*).
2. **Visual Grounding**: Automatic localization and vector polygon highlighting of spatial targets over multi-spectral satellite granules.
3. **Multi-Spectral VQA**: Factual scene interpretation across optical (Sentinel-2, Landsat, Cartosat-3) and SAR data.
4. **Observable Agent Execution Pipeline**: Real-time tracking of image validation, intent classification, specialist model dispatch, tensor inference, and vector generation without black-box hallucination.
5. **Interactive Evidence Viewer**: Side-by-side comparison, opacity slider, split-screen wipe, and geospatial coordinate inspection (EPSG:4326/32643).
6. **FastAPI-Ready Client Architecture**: Clean separation between React presentation components and the centralized API client (`src/services/api.ts`).

---

## Design System

Designed specifically to reflect a serious **Government Research & Earth Observation Mission** portal:
- **Background**: Warm Off-White / Ivory (`#F5F5F1`)
- **Primary Text**: Deep Navy / Ink (`#17212B`)
- **Primary Accent**: Muted Space Blue (`#315A73`)
- **Slate Gray**: `#66737D`
- **Border**: Light Boundary Gray (`#D8DCD9`)
- **Status Indicators**: Restrained green, amber, and red indicators without neon, cyberpunk, or excessive glow.

---

## Getting Started

### Prerequisites
- Node.js >= 18.0
- npm >= 9.0

### Installation
```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
npm run build
```

---

## FastAPI Backend Integration

The frontend includes a centralized API client located in [`src/services/api.ts`](./src/services/api.ts).

### Endpoints:
- `POST /api/analyze` — Primary agentic pipeline orchestrator
- `POST /api/ground` — Specialized visual grounding inference
- `POST /api/vqa` — Visual Question Answering inference
- `GET /api/health` — Cluster telemetry and loaded model weights

To connect a live FastAPI server, set the environment variable:
```env
VITE_API_BASE_URL=http://localhost:8000
```
