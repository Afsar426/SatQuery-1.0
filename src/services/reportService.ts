import { ReportItem, AnalysisResult, Project } from '../types';
import { DEMO_REPORTS } from '../demo/demoScenarios';

class ReportService {
  private reports: ReportItem[] = [...DEMO_REPORTS];

  public getAll(): ReportItem[] {
    return [...this.reports];
  }

  public getById(id: string): ReportItem | undefined {
    return this.reports.find(r => r.id === id);
  }

  public createFromAnalysis(project: Project, result: AnalysisResult): ReportItem {
    const reportNum = `SQ-2026-${result.analysisMode.slice(0, 3)}-${String(this.reports.length + 1).padStart(3, '0')}`;
    const newReport: ReportItem = {
      id: `rep-${Date.now()}`,
      reportNumber: reportNum,
      projectId: project.id,
      projectName: project.name,
      title: `Autonomous Remote-Sensing Analysis Report: ${result.modeLabel}`,
      query: result.query,
      analysisMode: result.modeLabel,
      generatedDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      analyst: 'SatQuery AI Agent Controller (Auto-Certified)',
      organization: 'Department of Space / ISRO (SIH 2026)',
      status: 'Final',
      resultId: result.id,
    };
    this.reports.unshift(newReport);
    return newReport;
  }
}

export const reportService = new ReportService();
