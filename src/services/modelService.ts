import { SpecialistModel } from '../types';
import { SPECIALIST_MODELS } from '../demo/demoScenarios';

class ModelService {
  private models: SpecialistModel[] = [...SPECIALIST_MODELS];

  public getAll(): SpecialistModel[] {
    return [...this.models];
  }

  public getById(id: string): SpecialistModel | undefined {
    return this.models.find(m => m.id === id);
  }
}

export const modelService = new ModelService();
