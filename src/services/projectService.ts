import { Project, ImageAsset } from '../types';
import { DEMO_PROJECTS } from '../demo/demoScenarios';

class ProjectService {
  private projects: Project[] = [...DEMO_PROJECTS];

  public getAll(): Project[] {
    return [...this.projects];
  }

  public getById(id: string): Project | undefined {
    return this.projects.find(p => p.id === id);
  }

  public create(projectData: Omit<Project, 'id' | 'createdAt' | 'recentAnalyses' | 'validation'>): Project {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString(),
      recentAnalyses: [],
      validation: {
        status: 'READY',
        summary: 'Project initialized with clean geospatial metadata checks.',
        checks: [
          { id: 'c-init', category: 'file', name: 'Project Geodatabase', status: 'passed', detail: 'Initialized repository bounds.' }
        ],
        timestamp: new Date().toISOString(),
      }
    };
    this.projects.unshift(newProject);
    return newProject;
  }

  public addImageToProject(projectId: string, image: ImageAsset): Project | undefined {
    const project = this.getById(projectId);
    if (!project) return undefined;
    project.images.push(image);
    return project;
  }
}

export const projectService = new ProjectService();
