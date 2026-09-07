import { 
  AnalysisRequest, 
  AnalysisResponse, 
  HealthStatus 
} from '../types/analysis';

// Configuration for future FastAPI backend
const envBaseUrl = (import.meta as unknown as { env?: { VITE_API_BASE_URL?: string } }).env?.VITE_API_BASE_URL;
const API_BASE_URL = envBaseUrl || 'http://localhost:8000';

// Central API Service Client
class SatQueryApiService {
  private baseUrl: string;
  private forceMock: boolean;

  constructor() {
    this.baseUrl = API_BASE_URL;
    // Strict requirement: NO MOCK AI. Connects directly to FastAPI backend.
    this.forceMock = false;
  }

  public setMockMode(enabled: boolean) {
    this.forceMock = enabled;
  }

  public getMockMode(): boolean {
    return this.forceMock;
  }

  /**
   * Healthcheck endpoint: GET /api/health
   */
  public async checkHealth(): Promise<HealthStatus> {
    try {
      const response = await fetch(`${this.baseUrl}/api/health`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Health check returned status ${response.status}`);
      }

      return await response.json();
    } catch (err: any) {
      throw new Error(err.message || 'Cannot connect to SatQuery AI backend');
    }
  }

  /**
   * Primary unified analysis endpoint: POST /api/analyze
   */
  public async analyze(request: AnalysisRequest): Promise<AnalysisResponse> {
    const formData = new FormData();
    if (request.image) {
      formData.append('image', request.image);
    }
    if (request.imageUrl) {
      formData.append('image_url', request.imageUrl);
    }
    formData.append('query', request.query);
    if (request.mode) {
      formData.append('mode', request.mode);
    }

    try {
      // NOTE: Browser automatically computes multipart/form-data boundary with FormData
      const response = await fetch(`${this.baseUrl}/api/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = `Backend error (${response.status})`;
        try {
          const errorJson = await response.json();
          if (errorJson.detail) {
            errorMessage = errorJson.detail;
          }
        } catch {
          const text = await response.text();
          if (text) errorMessage = text;
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error: any) {
      // If error already has a descriptive message from server, throw it directly
      if (error instanceof Error && error.message.includes('File size exceeds')) {
        throw error;
      }
      if (error instanceof Error && error.message.includes('Model is not loaded')) {
        throw error;
      }
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error(`Cannot connect to SatQuery AI backend at ${this.baseUrl}. Please start the backend with ./run_backend.sh`);
      }
      throw error;
    }
  }

  /**
   * Specialized Visual Question Answering: POST /api/vqa
   */
  public async vqa(request: AnalysisRequest): Promise<AnalysisResponse> {
    const formData = new FormData();
    if (request.image) formData.append('image', request.image);
    formData.append('query', request.query);

    const response = await fetch(`${this.baseUrl}/api/vqa`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ detail: response.statusText }));
      throw new Error(err.detail || `VQA API failed with status ${response.status}`);
    }

    return await response.json();
  }

  /**
   * Specialized Visual Grounding: POST /api/ground
   */
  public async ground(request: AnalysisRequest): Promise<AnalysisResponse> {
    const formData = new FormData();
    if (request.image) formData.append('image', request.image);
    formData.append('query', request.query);

    const response = await fetch(`${this.baseUrl}/api/ground`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ detail: response.statusText }));
      throw new Error(err.detail || `Grounding API failed with status ${response.status}`);
    }

    return await response.json();
  }
}

// Export singleton instance
export const api = new SatQueryApiService();
export default api;
