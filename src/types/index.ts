// SATQUERY AI: Domain Type Definitions
// Problem Statement ID: SIH26167 | ISRO / Department of Space

export type ModalityType = 'optical' | 'sar' | 'change_mask' | 'fusion' | 'multispectral';
export type TemporalType = 't1' | 't2' | 'single' | 'series';

export interface ImageMetadata {
  format: string;             // e.g. "GeoTIFF", "Cloud-Optimized GeoTIFF (COG)"
  crs: string;                // e.g. "EPSG:32643 (WGS 84 / UTM Zone 43N)"
  crsStatus: 'valid' | 'missing' | 'uncertain';
  dimensions: { width: number; height: number };
  resolution: string;         // e.g. "10m GSD (Sentinel-2)" or "3m (PlanetScope)"
  pixelSizeMeters: number;    // e.g. 10.0
  bands: string[];            // e.g. ["B02-Blue", "B03-Green", "B04-Red", "B08-NIR"]
  sensor: string;             // e.g. "Sentinel-2 MSI", "Sentinel-1 C-SAR", "Resourcesat-2 LISS-IV"
  acquisitionDate: string;    // e.g. "2024-03-15T05:42:10Z"
  bbox: [number, number, number, number]; // [minLon, minLat, maxLon, maxLat]
  center: [number, number];   // [lat, lon]
  fileSize: string;           // e.g. "48.2 MB"
  radiometricBits: number;    // e.g. 12 or 16
  cloudCoverPercentage?: number;
  polarization?: string;      // For SAR: "VV + VH"
  orbitDirection?: 'Ascending' | 'Descending';
}

export interface ImageAsset {
  id: string;
  name: string;
  url: string;
  thumbnailUrl?: string;
  modality: ModalityType;
  temporalType: TemporalType;
  metadata: ImageMetadata;
  uploadedAt: string;
}

export interface ValidationCheck {
  id: string;
  category: 'file' | 'georeferencing' | 'sensor' | 'compatibility';
  name: string;
  status: 'passed' | 'warning' | 'failed';
  detail: string;
  recommendation?: string;
}

export interface ValidationResult {
  status: 'READY' | 'WARNING' | 'ANALYSIS BLOCKED';
  summary: string;
  refusalReason?: string;
  checks: ValidationCheck[];
  timestamp: string;
}

export type AnalysisMode =
  | 'SINGLE_VQA'
  | 'SINGLE_CAPTION'
  | 'SINGLE_GROUNDING'
  | 'BITEMPORAL_CHANGE'
  | 'BITEMPORAL_VQA'
  | 'OPTICAL_SAR_FUSION';

export interface AgentStep {
  id: string;
  phase: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending' | 'failed';
  latencyMs: number;
  toolUsed?: string;
  inputContract?: Record<string, any>;
  outputContract?: Record<string, any>;
  timestamp: string;
}

export interface AgentTrace {
  id: string;
  query: string;
  detectedMode: AnalysisMode;
  modeLabel: string;
  confidenceScore?: number;
  steps: AgentStep[];
  totalDurationMs: number;
  specialistModelsUsed: string[];
  completedAt: string;
}

export interface GroundingRegion {
  id: string;
  label: string;
  confidence: number;
  bbox: [number, number, number, number]; // [minLon, minLat, maxLon, maxLat]
  geoJsonGeometry?: any;
  color: string;
  areaHa?: number;
}

export interface ChangeStatistics {
  changedAreaKm2: number;
  percentageChange: number;
  baselineBuiltUpKm2?: number;
  currentBuiltUpKm2?: number;
  detectedRegionsCount: number;
  confidenceMetric: string;
  calculationMethod: string;
}

export interface EvidenceItem {
  id: string;
  title: string;
  type: 'change_map' | 'grounding_box' | 'segmentation_mask' | 'optical_sar_overlay' | 'spectral_profile';
  description: string;
  layerId: string;
  centerCoords: [number, number]; // [lat, lon]
  targetZoom: number;
  activeByDefault: boolean;
  colorCode: string;
}

export type ConfidenceTier = 'HIGH' | 'MEDIUM' | 'LOW' | 'UNCERTAIN';

export interface ConfidenceAssessment {
  score?: number; // e.g. 0.89 -> 89% (omitted if backend does not supply)
  tier: ConfidenceTier;
  explanation: string;
  basis: string; // e.g. "Consensus between Change-Net and Siamese VLM embeddings"
}

export interface AnalysisResult {
  id: string;
  projectId: string;
  query: string;
  analysisMode: AnalysisMode;
  modeLabel: string;
  answer: string;
  evidenceSummary: string;
  confidence: ConfidenceAssessment;
  statistics?: ChangeStatistics;
  evidenceItems: EvidenceItem[];
  groundingRegions?: GroundingRegion[];
  executionTrace: AgentTrace;
  sourceImages: {
    t1?: ImageAsset;
    t2?: ImageAsset;
    optical?: ImageAsset;
    sar?: ImageAsset;
    single?: ImageAsset;
  };
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  theme: 'Urban' | 'Agriculture' | 'Water' | 'Disaster' | 'Coastal' | 'Defense';
  regionName: string;
  centerCoordinates: [number, number]; // [lat, lon]
  zoomLevel: number;
  defaultMode: AnalysisMode;
  images: ImageAsset[];
  validation: ValidationResult;
  recentAnalyses: AnalysisResult[];
  createdAt: string;
}

export interface SpecialistModel {
  id: string;
  name: string;
  task: string;
  description: string;
  version: string;
  status: 'ready' | 'loading' | 'offline';
  inputType: string;
  outputType: string;
  backbone: string;
  trainingDatasets: string[];
  latencyP95: string;
  isDomainAdapted: boolean;
}

export interface BenchmarkDataset {
  id: string;
  name: string;
  task: string;
  description: string;
  metrics: {
    name: string;
    score: string;
    baseline?: string;
  }[];
  evaluationStatus: 'Evaluated' | 'Evaluation Pending' | 'In Progress';
  source: string;
}

export interface ReportItem {
  id: string;
  reportNumber: string;
  projectId: string;
  projectName: string;
  title: string;
  query: string;
  analysisMode: string;
  generatedDate: string;
  analyst: string;
  organization: string;
  status: 'Final' | 'Draft';
  resultId: string;
}
