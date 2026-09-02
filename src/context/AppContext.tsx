import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, AnalysisResult, ValidationResult, ReportItem, AgentStep, ImageAsset } from '../types';
import { projectService } from '../services/projectService';
import { validationService } from '../services/validationService';
import { analysisService } from '../services/analysisService';
import { reportService } from '../services/reportService';
import { DEMO_SCENARIO_RESULTS } from '../demo/demoScenarios';

export interface MapLayerState {
  id: string;
  name: string;
  category: 'base' | 'evidence' | 't1' | 't2' | 'optical' | 'sar' | 'change' | 'grounding';
  visible: boolean;
  opacity: number;
  color?: string;
}

interface AppContextType {
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
  projects: Project[];
  currentProject: Project;
  setCurrentProject: (project: Project) => void;
  activeResult: AnalysisResult | null;
  setActiveResult: (result: AnalysisResult | null) => void;
  activeReport: ReportItem | null;
  setActiveReport: (report: ReportItem | null) => void;
  validationDrawerOpen: boolean;
  setValidationDrawerOpen: (open: boolean) => void;
  validationResult: ValidationResult;
  refreshValidation: () => void;
  demoMode: boolean;
  setDemoMode: (enabled: boolean) => void;
  isAnalyzing: boolean;
  agentSteps: AgentStep[];
  currentQuery: string;
  setCurrentQuery: (query: string) => void;
  runAnalysis: (queryText?: string) => Promise<AnalysisResult | undefined>;
  loadDemoScenario: (scenarioKey: 'scenario_single_vqa' | 'scenario_grounding' | 'scenario_bitemporal_change' | 'scenario_bitemporal_vqa' | 'scenario_optical_sar') => void;
  loadBlockedScenario: () => void;
  layers: MapLayerState[];
  toggleLayerVisibility: (layerId: string) => void;
  setLayerOpacity: (layerId: string, opacity: number) => void;
  mapCenter: [number, number];
  setMapCenter: (center: [number, number]) => void;
  mapZoom: number;
  setMapZoom: (zoom: number) => void;
  mapMode: 'natural' | 't1' | 't2' | 'swipe' | 'flicker';
  setMapMode: (mode: 'natural' | 't1' | 't2' | 'swipe' | 'flicker') => void;
  notifications: { id: string; title: string; detail: string; type: 'success' | 'warning' | 'error'; time: string }[];
  addNotification: (title: string, detail: string, type?: 'success' | 'warning' | 'error') => void;
  dismissNotification: (id: string) => void;
  generateReportForResult: (result: AnalysisResult) => ReportItem;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<string>('landing');
  const [projects] = useState<Project[]>(projectService.getAll());
  const [currentProject, setCurrentProject] = useState<Project>(projects[0]);
  const [activeResult, setActiveResult] = useState<AnalysisResult | null>(DEMO_SCENARIO_RESULTS.scenario_bitemporal_change);
  const [activeReport, setActiveReport] = useState<ReportItem | null>(null);
  const [validationDrawerOpen, setValidationDrawerOpen] = useState<boolean>(false);
  const [demoMode, setDemoMode] = useState<boolean>(true);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [agentSteps, setAgentSteps] = useState<AgentStep[]>(activeResult?.executionTrace.steps || []);
  const [currentQuery, setCurrentQuery] = useState<string>('What changed between these two dates?');

  const [mapCenter, setMapCenter] = useState<[number, number]>(currentProject.centerCoordinates);
  const [mapZoom, setMapZoom] = useState<number>(currentProject.zoomLevel);
  const [mapMode, setMapMode] = useState<'natural' | 't1' | 't2' | 'swipe' | 'flicker'>('natural');

  // Validation state
  const [validationResult, setValidationResult] = useState<ValidationResult>(() =>
    validationService.validateAssets(currentProject.images)
  );

  const refreshValidation = () => {
    const val = validationService.validateAssets(currentProject.images);
    setValidationResult(val);
  };

  // Keep validation updated when project changes
  useEffect(() => {
    setValidationResult(validationService.validateAssets(currentProject.images));
    setMapCenter(currentProject.centerCoordinates);
    setMapZoom(currentProject.zoomLevel);
  }, [currentProject]);

  // Layers state
  const [layers, setLayers] = useState<MapLayerState[]>([
    { id: 'base-imagery', name: 'High-Res True Color Satellite', category: 'base', visible: true, opacity: 1.0 },
    { id: 'evidence-layer', name: 'Spatial Evidence Highlight', category: 'evidence', visible: true, opacity: 0.9, color: '#22D3EE' },
    { id: 'change-mask', name: 'Bi-Temporal Change Mask', category: 'change', visible: true, opacity: 0.75, color: '#EF4444' },
    { id: 'grounding-box', name: 'Grounding Bounding Box', category: 'grounding', visible: true, opacity: 1.0, color: '#22D3EE' },
    { id: 'optical-layer', name: 'Optical Multispectral Band', category: 'optical', visible: true, opacity: 1.0 },
    { id: 'sar-layer', name: 'Sentinel-1 C-SAR Backscatter', category: 'sar', visible: false, opacity: 0.85, color: '#14B8A6' },
  ]);

  const toggleLayerVisibility = (layerId: string) => {
    setLayers(prev => prev.map(l => (l.id === layerId ? { ...l, visible: !l.visible } : l)));
  };

  const setLayerOpacity = (layerId: string, opacity: number) => {
    setLayers(prev => prev.map(l => (l.id === layerId ? { ...l, opacity } : l)));
  };

  // Notifications
  const [notifications, setNotifications] = useState<{ id: string; title: string; detail: string; type: 'success' | 'warning' | 'error'; time: string }[]>([
    { id: 'notif-1', title: 'AI Engine Ready', detail: 'Autonomous controller and 7 specialist RS models online.', type: 'success', time: 'Just now' },
    { id: 'notif-2', title: 'Project Loaded', detail: 'Urban Expansion - Bengaluru Corridor initialized.', type: 'success', time: '2m ago' },
  ]);

  const addNotification = (title: string, detail: string, type: 'success' | 'warning' | 'error' = 'success') => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      title,
      detail,
      type,
      time: 'Just now',
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 9)]);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Analysis dispatch
  const runAnalysis = async (queryText?: string): Promise<AnalysisResult | undefined> => {
    const q = queryText || currentQuery;
    setIsAnalyzing(true);
    setAgentSteps([]);

    try {
      const result = await analysisService.executeAnalysis(
        currentProject.id,
        currentProject.images,
        q,
        (newStep: AgentStep) => {
          setAgentSteps(prev => [...prev.filter(s => s.id !== newStep.id), newStep]);
        }
      );

      setActiveResult(result);
      setIsAnalyzing(false);
      addNotification('Analysis Completed', `Result ready for "${q}". Mode: ${result.modeLabel}`, 'success');

      // If grounding or evidence contains coordinates, focus map
      if (result.evidenceItems.length > 0) {
        setMapCenter(result.evidenceItems[0].centerCoords);
        setMapZoom(result.evidenceItems[0].targetZoom);
      }

      return result;
    } catch (err: any) {
      setIsAnalyzing(false);
      addNotification('Analysis Blocked', err.message || 'Workflow could not continue.', 'error');
      return undefined;
    }
  };

  // Demo Scenarios Loader
  const loadDemoScenario = (scenarioKey: keyof typeof DEMO_SCENARIO_RESULTS) => {
    const res = DEMO_SCENARIO_RESULTS[scenarioKey];
    if (!res) return;

    // Switch project matching scenario
    const proj = projects.find(p => p.id === res.projectId) || projects[0];
    setCurrentProject(proj);
    setCurrentQuery(res.query);
    setActiveResult(res);
    setAgentSteps(res.executionTrace.steps);
    if (res.evidenceItems[0]) {
      setMapCenter(res.evidenceItems[0].centerCoords);
      setMapZoom(res.evidenceItems[0].targetZoom);
    }
    if (scenarioKey === 'scenario_bitemporal_change') {
      setMapMode('swipe');
    } else {
      setMapMode('natural');
    }
    addNotification('Demo Scenario Loaded', `Loaded ${res.modeLabel}`, 'success');
  };

  // Guardrail refusal test scenario
  const loadBlockedScenario = () => {
    // Construct intentionally non-overlapping pair: Bengaluru and Assam
    const incompatibleImages: ImageAsset[] = [
      currentProject.images[0],
      {
        id: 'img-incompatible',
        name: 'Guwahati_Brahmaputra_Out_Of_Bounds.tif',
        url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
        modality: 'optical',
        temporalType: 't2',
        uploadedAt: new Date().toISOString(),
        metadata: {
          format: 'GeoTIFF',
          crs: 'EPSG:32646 (WGS 84 / UTM Zone 46N)',
          crsStatus: 'valid',
          dimensions: { width: 3800, height: 3800 },
          resolution: '10.0m GSD',
          pixelSizeMeters: 10.0,
          bands: ['Red', 'Green', 'Blue', 'NIR'],
          sensor: 'Sentinel-2 MSI',
          acquisitionDate: '2026-02-18T04:12:00Z',
          bbox: [91.70, 26.10, 91.85, 26.25], // Guwahati (non-overlapping with Bengaluru [77.58, 13.08])
          center: [26.18, 91.75],
          fileSize: '51.2 MB',
          radiometricBits: 12,
        },
      },
    ];

    const tempProject: Project = {
      ...currentProject,
      name: 'Intentional Incompatible Extents Test',
      images: incompatibleImages,
    };

    setCurrentProject(tempProject);
    setValidationDrawerOpen(true);
    addNotification('Validation Guardrail Activated', 'Non-overlapping image extents detected. Workflow refused.', 'error');
  };

  const generateReportForResult = (result: AnalysisResult): ReportItem => {
    const rep = reportService.createFromAnalysis(currentProject, result);
    setActiveReport(rep);
    addNotification('Report Generated', `Report #${rep.reportNumber} created successfully.`, 'success');
    return rep;
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        projects,
        currentProject,
        setCurrentProject,
        activeResult,
        setActiveResult,
        activeReport,
        setActiveReport,
        validationDrawerOpen,
        setValidationDrawerOpen,
        validationResult,
        refreshValidation,
        demoMode,
        setDemoMode,
        isAnalyzing,
        agentSteps,
        currentQuery,
        setCurrentQuery,
        runAnalysis,
        loadDemoScenario,
        loadBlockedScenario,
        layers,
        toggleLayerVisibility,
        setLayerOpacity,
        mapCenter,
        setMapCenter,
        mapZoom,
        setMapZoom,
        mapMode,
        setMapMode,
        notifications,
        addNotification,
        dismissNotification,
        generateReportForResult,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
