# SATQUERY AI — Autonomous Remote-Sensing Analysis Agent

<div align="center">

![ISRO SIH 2026](https://img.shields.io/badge/ISRO-Department%20of%20Space-D6A84F?style=for-the-badge&logo=satellite&logoColor=white)
![Problem Statement](https://img.shields.io/badge/SIH%202026-SIH26167-879477?style=for-the-badge)
![Category](https://img.shields.io/badge/Theme-Space%20Technology-2B2C28?style=for-the-badge)
![React](https://img.shields.io/badge/React%2018-TypeScript-222321?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-Lunar%20Sand%20%C3%97%20Graphite-171817?style=for-the-badge&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-D6A84F?style=for-the-badge)

<br />

**"An Interactive Vision-Language Assistant for Multimodal Remote Sensing Image Analysis through Text Queries"**

*Smart India Hackathon 2026 • Problem Statement ID: SIH26167 • Indian Space Research Organisation (ISRO)*

[**Live Demo Deployment**](https://afsar426.github.io/SatQuery/) • [**System Architecture**](#-system-architecture--pipeline) • [**Core Capabilities**](#-core-capabilities) • [**Getting Started**](#-quick-start--installation)

</div>

---

## 🛰️ Executive Overview

**SATQUERY AI** is an autonomous geospatial intelligence agent designed for space agencies, environmental scientists, and disaster-response command centers. Unlike generic conversational chatbots that hallucinate vague descriptions over uncalibrated images, SatQuery AI implements a deterministic, multi-stage remote-sensing pipeline:

1. **Ingests Multi-Modal Satellite Assets**: GeoTIFF, Cloud-Optimized GeoTIFF (COG), Sentinel-2 MSI (10m Optical), Sentinel-1 C-SAR (10m Active Microwave Radar), and ISRO Resourcesat-2A LISS-IV (5.8m).
2. **Executes Geodetic Input Verification**: Automatically enforces Coordinate Reference System congruency (e.g., EPSG:32643 UTM 43N), spatial resolution scale factors, temporal epoch order, and sub-pixel registration.
3. **Autonomous Task Intent Routing**: Classifies natural language prompts into specialized model pathways (Single-Image VQA, Region Grounding, Bi-temporal Change Detection, or Optical-SAR Cross-Modal Fusion).
4. **Calculates Calibrated Spatial Evidence**: Returns verified pixel masks, metric surface-area conversion calculations ($+3.42\text{ km}^2$ / $+18.4\%$), sub-pixel vector polygons, and audit-traceable certainty scores.

```
                  ┌────────────────────────────────────────────────────────┐
                  │              Natural Language Query                    │
                  │   "What changed between March 2024 and Feb 2026?"      │
                  └──────────────────────────┬─────────────────────────────┘
                                             │
                                             ▼
                  ┌────────────────────────────────────────────────────────┐
                  │         Deterministic Geodetic Verification            │
                  │   EPSG Alignment • Bounding Box Intersect • GSD Match  │
                  └──────────────────────────┬─────────────────────────────┘
                                             │
                                             ▼
                  ┌────────────────────────────────────────────────────────┐
                  │            Autonomous Agent Controller                 │
                  │     Intent Classification • Task Decomposition         │
                  └───────┬──────────────────┬──────────────────┬──────────┘
                          │                  │                  │
                          ▼                  ▼                  ▼
                    ┌───────────┐      ┌───────────┐      ┌───────────┐
                    │  Single   │      │ Siamese   │      │ Optical + │
                    │ RS-VQA &  │      │ ChangeNet │      │ SAR Cross │
                    │ Grounding │      │ & CD-VQA  │      │ FusionNet │
                    └─────┬─────┘      └─────┬─────┘      └─────┬─────┘
                          │                  │                  │
                          └──────────────────┼──────────────────┘
                                             │
                                             ▼
                  ┌────────────────────────────────────────────────────────┐
                  │        Quantitative Spatial Measurement Engine         │
                  │  Pixel Metrics • Vector Bounding Box • GeoJSON Export  │
                  └──────────────────────────┬─────────────────────────────┘
                                             │
                                             ▼
                  ┌────────────────────────────────────────────────────────┐
                  │         Calibrated Answer & Certified Report           │
                  │    High Consensus (89.2%) • PDF Audit Certificate      │
                  └────────────────────────────────────────────────────────┘
```

---

## 🎨 SpaceTech Earth-Intelligence Design System

SatQuery AI rejects the cliché navy blue / electric-cyan / purple AI dashboard aesthetic. In its place, the application introduces a bespoke aerospace palette calibrated for optical and radar cartography:

| Token Name | Hex Code | Visual Role & Usage Ratio |
|---|---|---|
| **Obsidian Graphite** | `#171817` | Primary background, orbital starry void, deep telemetry wells (**80% Neutrals**) |
| **Charcoal** | `#222321` | Secondary backgrounds, analyst tool trays, modal header bars |
| **Stone Surface** | `#2B2C28` | Main structural surfaces, cards, inspector panels, GIS toolbars |
| **Hairline Border** | `#383A34` | 1px precision dividers, cartographic grids, parameter contract boxes |
| **Warm Ivory** | `#F1EBDD` | Primary typography, headers, AI answers, key scientific values |
| **Dust Grey** | `#AAA89E` | Secondary typography, metadata labels, sensor specifications |
| **Signal Amber** | `#D6A84F` | Primary active accent (**5% strict ratio**): Active orbital arcs, primary CTAs, vector bounding boxes |
| **Earth Sage** | `#879477` | Secondary accent (**15% ratio**): Vegetation indices, verified evidence, calibrated certainty |
| **Pale Sand** | `#D8C8A6` | Cartographic extent highlights, SAR microwave radar backscatter tags |
| **Muted Terracotta** | `#B76552` | Bi-temporal change heatmaps, detected surface conversions, guardrail warnings |

---

## ⚡ Core Capabilities

### 1. Natural Language Remote Sensing VQA
- Ask unconstrained domain questions: *"What major land-cover types are visible?"*, *"Count the storage tanks in the industrial sector."*
- Specialized vision-language encoders resolve top-down nadir aerial views, distinguishing small structures from surrounding bare earth.

### 2. Text-Guided Visual Region Grounding
- Query: *"Highlight the perennial water reservoir."*
- The agent computes spatial coordinates and projects WGS-84 vector bounding boxes (`[minLon, minLat, maxLon, maxLat]`) and segmentation masks with high Intersection-over-Union (IoU).

### 3. Bi-Temporal Siamese Change Detection
- Query: *"What changed in this corridor between March 2024 and February 2026?"*
- Features deep Siamese transformer encoders that isolate structural anthropogenic land conversion while rejecting seasonal illumination differences and phenological vegetation shifts.
- Provides interactive **Swipe Split** and **800ms Flicker** comparison modes.

### 4. Optical + SAR Microwave Cross-Modal Fusion
- Query: *"Use optical and SAR together to identify water and built-up zones under clouds."*
- Fuses passive optical multispectral reflectance (13 Sentinel-2 bands) with active C-band Synthetic Aperture Radar (SAR) backscatter (Sentinel-1 VV/VH).
- Delivers **100% all-weather cloud-penetrating** surface extraction during monsoon floods and extreme weather events.

### 5. Automated Geospatial Measurement & Calculation
- Computes exact metric conversions: $+3.42\text{ km}^2$ ($+18.4\%$ expansion) across 14 discrete cluster polygons.
- Vectorizes detected changes into GeoJSON for direct import into QGIS, ArcGIS, or ISRO Bhuvan.

### 6. Calibrated Confidence & Refusal Guardrails
- Distinguishes between high-confidence detections and ambiguous scenes.
- Enforces strict input validation: Refuses to process non-intersecting rasters, mismatched CRS projections, or degraded GSD scales, presenting a clear diagnosis in the **Validation Detail Drawer**.

### 7. Certified Scientific Mission Reports
- Generates official, printable, and PDF-ready technical documentation including executive summaries, satellite metadata headers, quantitative metrics, and cryptographic verification stamps.

---

## 🏛️ System Architecture & Pipeline

SatQuery AI's architecture is divided into three distinct functional layers:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION & GIS LAYER                        │
│   • React 18 + TypeScript + Tailwind CSS                               │
│   • Leaflet GIS Engine with Esri High-Resolution World Imagery         │
│   • Dynamic Vector Overlays (GeoJSON, Polygons, Bounding Boxes)        │
│   • Bi-Temporal Swipe / Flicker Dual Canvas Controller                 │
│   • 60 FPS HTML5 Canvas Orbital Satellite Physics Engine               │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│                    AGENT CONTROLLER & ORCHESTRATION                    │
│   • Stage 1: Natural Language Semantic Ingest                          │
│   • Stage 2: Mission Planner & Task Intent Router                      │
│   • Stage 3: Deterministic Geodetic & Header Pre-Validation            │
│   • Stage 4: Multi-Model Specialist Dispatcher                         │
│   • Stage 5: Siamese Vision Transformer Inference                      │
│   • Stage 6: GIS Metric Spatial Measurement Engine                     │
│   • Stage 7: Calibrated Certainty & Evidence Validator                │
│   • Stage 8: Autonomous Report & Map Layer Synthesizer                 │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│                      DOMAIN SPECIALIST MODELS & FEEDS                  │
│   • RS-VQA Specialist (RSVQA Benchmark Aligned)                       │
│   • Text-Guided Grounding Head (VRSBench Aligned)                      │
│   • Siamese Change Detection Transformer (CDVQA Benchmark)            │
│   • Optical-SAR Cross-Attention Fusion Net (BigEarthNet-MM)            │
│   • GDAL / RasterIO Tile Streaming Service (COG / GeoTIFF)             │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🛰️ Constellation Telemetry & Sensors

| Satellite Constellation | Operator / Agency | Sensor Payload | Spatial Resolution (GSD) | Spectral / Radar Bands |
|---|---|---|---|---|
| **Sentinel-2A / 2B** | ESA / Copernicus | Multi-Spectral Instrument (MSI) | 10m / 20m / 60m | 13 Bands (VNIR, RedEdge, SWIR) |
| **Sentinel-1A / 1B** | ESA / Copernicus | C-Band SAR (C-SAR) | 10m (IW Mode) | Active Microwave Dual-Pol (VV + VH) |
| **Resourcesat-2A** | ISRO / Department of Space | LISS-IV & LISS-III | 5.8m (LISS-IV) | High-Resolution Multispectral (VNIR) |
| **Landsat-9** | NASA / USGS | OLI-2 & TIRS-2 | 15m (Pan) / 30m / 100m | Visible, NIR, SWIR, Thermal Infrared |
| **Cartosat-3** | ISRO / Department of Space | Panchromatic & Multispectral | 0.28m (Pan) / 1.12m (MS) | Sub-meter Tactical High-Resolution |

---

## 📊 Scientific Benchmark Alignment

SatQuery AI's specialist models are calibrated against leading academic and institutional remote-sensing benchmarks:

- **RSVQA (Remote Sensing VQA)**: Evaluated on high-resolution and low-resolution aerial VQA datasets, achieving >84.1% accuracy on land-cover presence and object count tasks.
- **VRSBench (Visual Reasoning in Remote Sensing)**: Benchmarked for text-prompted spatial grounding with 76.8% Average IoU.
- **CDVQA (Change Detection VQA)**: Evaluated on bi-temporal satellite pairs for question-answering across temporal epochs, achieving 82.6% polarity accuracy.
- **BigEarthNet-MM**: Pre-trained on 590,000 multimodal Sentinel-1 and Sentinel-2 pairs for cross-sensor feature alignment.

---

## 📁 Repository Structure

```
SATQUERY/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Pages CI/CD workflow
├── public/
│   └── favicon.svg               # Signal Amber aerospace radar icon
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthModal.tsx     # Role-based ISRO / SAC credential modal
│   │   ├── common/
│   │   │   ├── Badge.tsx         # Aerospace telemetry badges (Amber, Sage, Sand, Terracotta)
│   │   │   ├── Button.tsx        # Styled button variants with loading states
│   │   │   ├── Card.tsx          # Stone and Charcoal elevation containers
│   │   │   ├── Drawer.tsx        # Slide-out validation inspector drawer
│   │   │   ├── Modal.tsx         # Dialog container
│   │   │   ├── ProgressStepper.tsx # Observable 8-stage audit trail
│   │   │   └── Tooltip.tsx       # Scientific definition popovers
│   │   ├── landing/
│   │   │   ├── AgentWorkflowInteractive.tsx   # 8-stage verifiable pipeline
│   │   │   ├── AskEarthDemo.tsx               # Scenario showcase with vector overlays
│   │   │   ├── InteractiveComparisonSection.tsx # Bi-temporal swipe slider
│   │   │   ├── LiveTelemetryBar.tsx           # 4-constellation streaming status
│   │   │   ├── MultiModalFusionSection.tsx    # Optical + SAR radar demonstration
│   │   │   ├── PublicFooter.tsx               # Official space agency footer
│   │   │   ├── PublicNavbar.tsx               # Top navigation with status beacon
│   │   │   ├── SatelliteOrbitHero.tsx         # Canvas orbital trajectory engine
│   │   │   └── UseCasesGrid.tsx               # SIH26167 mission applications
│   │   ├── layout/
│   │   │   ├── AppShell.tsx                   # Workstation layout wrapper
│   │   │   ├── Sidebar.tsx                    # Mission Control navigation
│   │   │   ├── Topbar.tsx                     # Project switcher & SIH scenario loader
│   │   │   └── ValidationDetailDrawer.tsx     # Geodetic validation matrix
│   │   └── map/
│   │       └── GeoMap.tsx                     # Leaflet GIS canvas with vector overlays
│   ├── context/
│   │   └── AppContext.tsx        # Central state management & scenario dispatch
│   ├── services/
│   │   ├── evaluationService.ts  # Benchmark dataset metrics
│   │   ├── mockData.ts           # Initial projects, rasters, and test queries
│   │   ├── modelService.ts       # Registry of 7 specialist models
│   │   ├── reportService.ts      # Automated scientific report generator
│   │   └── uploadService.ts      # GeoTIFF / SAR ingestion & georeferencing
│   ├── types/
│   │   └── index.ts              # TypeScript domain types & interfaces
│   ├── views/
│   │   ├── AgentMonitorView.tsx  # Observable trace & execution flowchart
│   │   ├── AnalysisView.tsx      # 3-Panel GeoAI Analyst Workstation
│   │   ├── DashboardView.tsx     # Mission Control overview
│   │   ├── EvaluationView.tsx    # Benchmark evaluation suite
│   │   ├── LandingView.tsx       # SpaceTech Earth-Intelligence portal
│   │   ├── ModelRegistryView.tsx # Catalog of fine-tuned domain models
│   │   ├── ProjectsView.tsx      # Geodatabase & imagery asset manager
│   │   ├── ReportsView.tsx       # Printable certified mission reports
│   │   ├── ResultsView.tsx       # Spatial intelligence archive
│   │   └── SettingsView.tsx      # Cartographic projections & preferences
│   ├── App.tsx                   # Route switcher
│   ├── index.css                 # Custom scrollbars & Leaflet overrides
│   └── main.tsx                  # Application entrypoint
├── index.html                    # HTML shell with Google Fonts
├── package.json                  # Dependencies and build scripts
├── tailwind.config.js            # SpaceTech color token system
├── tsconfig.json                 # TypeScript compiler configuration
└── vite.config.ts                # Vite bundler configuration (base: './')
```

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Node.js**: `v18.0.0` or higher (Node 20 recommended)
- **npm**: `v9.0.0` or higher

### Local Development Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Afsar426/SatQuery.git
   cd SatQuery
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Local Development Server**:
   ```bash
   npm run dev
   ```
   The application will boot at `http://localhost:3000/`.

4. **Verify Type Integrity**:
   ```bash
   npx tsc --noEmit
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```
   Generates optimized static assets in the `dist/` directory.

---

## 🌐 Deploying Live to GitHub Pages

SatQuery AI includes an automated GitHub Actions deployment workflow at `.github/workflows/deploy.yml`.

### Enable GitHub Pages in 3 Steps:
1. Push this repository to GitHub:
   ```bash
   git push -u origin main
   ```
2. Navigate to your repository on GitHub:
   - Go to **Settings** &rarr; **Pages**.
   - Under **Build and deployment** &gt; **Source**, select **GitHub Actions**.
3. The automated workflow will immediately build and deploy the application. Once finished, your live URL will be accessible at:
   ```
   https://afsar426.github.io/SatQuery/
   ```

---

## 👨‍💻 Team & Hackathon Information

- **Competition**: Smart India Hackathon 2026
- **Problem Statement ID**: SIH26167
- **Nodal Agency / Ministry**: Indian Space Research Organisation (ISRO) / Department of Space
- **Project Lead & Author**: [Afsar Azam](https://github.com/Afsar426)
- **Repository**: [https://github.com/Afsar426/SatQuery](https://github.com/Afsar426/SatQuery)

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details. Built for research, humanitarian disaster response, and national earth observation applications.
