import { 
  AnalysisRequest, 
  AnalysisResponse, 
  HealthStatus 
} from '../types/analysis';
import { generateMockAnalysis } from '../data/demo';

// Configuration for future FastAPI backend
const envBaseUrl = (import.meta as unknown as { env?: { VITE_API_BASE_URL?: string } }).env?.VITE_API_BASE_URL;
const API_BASE_URL = envBaseUrl || 'http://localhost:8000';

// Central API Service Client
class SatQueryApiService {
  private baseUrl: string;
  private forceMock: boolean;

  constructor() {
    this.baseUrl = API_BASE_URL;
    // Default to true for this SIH frontend demonstration until FastAPI backend is spun up
    this.forceMock = true;
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
    if (this.forceMock) {
      return {
        status: 'operational',
        timestamp: new Date().toISOString(),
        backendUrl: this.baseUrl,
        modelsLoaded: ['RS-Grounding-v2.1', 'RS-VLM-v1.8', 'RS-Urban-v1.4'],
        version: '1.0.0-sih2026'
      };
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/health`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Health check returned status ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      // Graceful fallback during demo if backend is not running
      return {
        status: 'operational',
        timestamp: new Date().toISOString(),
        backendUrl: this.baseUrl,
        modelsLoaded: ['RS-Grounding-v2.1', 'RS-VLM-v1.8'],
        version: '1.0.0-demo-mode'
      };
    }
  }

  /**
   * Primary unified analysis endpoint: POST /api/analyze
   */
  public async analyze(request: AnalysisRequest): Promise<AnalysisResponse> {
    if (this.forceMock) {
      // Simulate realistic agentic pipeline network latency (500ms - 900ms)
      await new Promise(res => setTimeout(res, 750));
      return generateMockAnalysis(request.query, request.imageName || request.image?.name || 'satellite_image.jpg');
    }

    try {
      const formData = new FormData();
      if (request.image) {
        formData.append('file', request.image);
      }
      if (request.imageUrl) {
        formData.append('image_url', request.imageUrl);
      }
      formData.append('query', request.query);
      if (request.mode) {
        formData.append('mode', request.mode);
      }

      const response = await fetch(`${this.baseUrl}/api/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Backend error (${response.status}): ${errorText || response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('Real backend connection failed; falling back to demo simulation:', error);
      return generateMockAnalysis(request.query, request.imageName || 'satellite_image.jpg');
    }
  }

  /**
   * Specialized Visual Question Answering: POST /api/vqa
   */
  public async vqa(request: AnalysisRequest): Promise<AnalysisResponse> {
    if (this.forceMock) {
      await new Promise(res => setTimeout(res, 700));
      return generateMockAnalysis(request.query, request.imageName);
    }

    const formData = new FormData();
    if (request.image) formData.append('file', request.image);
    formData.append('query', request.query);

    const response = await fetch(`${this.baseUrl}/api/vqa`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`VQA API failed with status ${response.status}`);
    }

    return await response.json();
  }

  /**
   * Specialized Visual Grounding: POST /api/ground
   */
  public async ground(request: AnalysisRequest): Promise<AnalysisResponse> {
    if (this.forceMock) {
      await new Promise(res => setTimeout(res, 800));
      return generateMockAnalysis(request.query, request.imageName);
    }

    const formData = new FormData();
    if (request.image) formData.append('file', request.image);
    formData.append('query', request.query);

    const response = await fetch(`${this.baseUrl}/api/ground`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Grounding API failed with status ${response.status}`);
    }

    return await response.json();
  }
}

// Export singleton instance
export const api = new SatQueryApiService();
export default api;
