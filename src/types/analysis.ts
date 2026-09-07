export type TaskType = 
  | 'Visual Grounding'
  | 'Visual Question Answering'
  | 'Scene Description'
  | 'NDVI Spectral Analysis'
  | 'Land Cover Classification';

export interface ExecutionStep {
  id: string;
  stepNumber: number;
  label: string;
  detail: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  timestamp?: string;
  durationMs?: number;
}

export interface VisualEvidence {
  inputImageUrl: string;
  detectedRegionUrl: string;
  detectedObject: string;
  approximateRegion: string;
  detectedArea?: string; // e.g. "2.34 km²"
  coordinates?: {
    lat: number;
    lng: number;
    formatted: string;
  };
  maskOverlaySvg?: string;
  boundingBox?: [number, number, number, number]; // [ymin, xmin, ymax, xmax]
}

export interface GeospatialMetadata {
  sensor: string;
  platform?: string;
  acquisitionDate?: string;
  resolutionGsd: string;
  bandsUsed: string[];
  projection: string;
  cloudCoverPercentage?: number;
  dimensions?: {
    width: number;
    height: number;
  };
}

export interface AnalysisRequest {
  image?: File | null;
  imageUrl?: string;
  imageName?: string;
  query: string;
  mode?: 'single' | 'compare';
}

export interface AnalysisResponse {
  taskId: string;
  answer: string;
  task: TaskType | string;
  model: string;
  status: 'completed' | 'failed';
  confidence?: number; // e.g. 0.91 or 91%
  detectedArea?: string;
  coordinates?: {
    lat: number;
    lng: number;
    formatted: string;
  };
  visualEvidence?: VisualEvidence;
  executionTrace: ExecutionStep[];
  metadata?: GeospatialMetadata;
  insights?: string[];
  rawBackendPayload?: Record<string, unknown>;
}

export interface HealthStatus {
  status: 'operational' | 'degraded' | 'offline';
  timestamp: string;
  backendUrl: string;
  modelsLoaded: string[];
  version: string;
}

export interface PresetSample {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  fileSize: string;
  recommendedQueries: string[];
  description: string;
}
