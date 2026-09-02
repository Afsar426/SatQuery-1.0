import { BenchmarkDataset } from '../types';
import { BENCHMARK_DATASETS } from '../demo/demoScenarios';

class EvaluationService {
  private benchmarks: BenchmarkDataset[] = [...BENCHMARK_DATASETS];

  public getAll(): BenchmarkDataset[] {
    return [...this.benchmarks];
  }
}

export const evaluationService = new EvaluationService();
