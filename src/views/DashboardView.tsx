import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import {
  Satellite,
  ArrowRight,
  Sparkles,
  GitCompare,
  Radar,
  ScanSearch,
  Activity,
  CheckCircle2,
  Database,
  Cpu,
  Layers,
  Clock,
  Play,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { setCurrentRoute, loadDemoScenario, projects, setCurrentProject } = useApp();

  const workflowSteps = [
    { num: '01', title: 'Multimodal Satellite Data', desc: 'GeoTIFF, Sentinel-1/2, Optical & SAR' },
    { num: '02', title: 'Natural Language Query', desc: '"What changed between these two dates?"' },
    { num: '03', title: 'Agentic Controller', desc: 'Auto-determines domain analysis task' },
    { num: '04', title: 'Specialist Model Routing', desc: 'RS-VQA, Change-Net, Fusion-Net' },
    { num: '05', title: 'Spatial Evidence & Map', desc: 'Grounding boxes, change masks' },
    { num: '06', title: 'Calibrated Answer & Report', desc: 'Natural language answer with metrics' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-7 pb-16">
      {/* Hero Section - SpaceTech Earth Intelligence */}
      <div className="relative overflow-hidden rounded-panel bg-[#222321] border border-[#383A34] p-8 md:p-10 shadow-panel">
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#D6A84F] bg-[#D6A84F]/10 border border-[#D6A84F]/30 px-2.5 py-0.5 rounded-sm flex items-center gap-1.5 font-semibold">
              <Satellite className="w-3.5 h-3.5 text-[#D6A84F]" /> ISRO &bull; SIH 2026 (SIH26167)
            </span>
            <span className="text-[11px] font-mono text-[#AAA89E]">
              Department of Space &bull; National Space Technology Theme
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-[#F1EBDD] tracking-tight leading-tight">
            SATQUERY <span className="text-[#D6A84F]">AI</span>
          </h1>
          <p className="text-xs md:text-sm font-semibold text-[#879477] uppercase tracking-widest mt-1 font-mono">
            Autonomous Remote-Sensing Analysis Agent
          </p>

          <p className="text-[#AAA89E] text-sm mt-3.5 leading-relaxed font-normal max-w-2xl">
            An Interactive Vision-Language Assistant for Multimodal Remote Sensing Image Analysis through Text Queries.
            Ingests multi-sensor satellite imagery (GeoTIFF, COG, SAR), performs deterministic geodetic validation,
            routes to specialist models, and projects grounded spatial evidence on high-resolution Earth observation maps.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Button
              variant="primary"
              size="md"
              icon={<Sparkles className="w-4 h-4" />}
              onClick={() => setCurrentRoute('analysis')}
            >
              + New Analysis
            </Button>

            <Button
              variant="secondary"
              size="md"
              icon={<Play className="w-4 h-4 text-[#D6A84F]" />}
              onClick={() => {
                loadDemoScenario('scenario_bitemporal_change');
                setCurrentRoute('analysis');
              }}
            >
              Launch SIH 2026 Evaluation Demo
            </Button>

            <Button
              variant="ghost"
              size="md"
              onClick={() => setCurrentRoute('projects')}
            >
              Inspect Geodatabases ({projects.length})
            </Button>
          </div>
        </div>
      </div>

      {/* 3 Core Capability Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Single Image Card */}
        <Card
          className="p-5 cursor-pointer hover:border-[#D6A84F]/50 transition-colors group bg-[#2B2C28] border-[#383A34]"
          onClick={() => {
            loadDemoScenario('scenario_single_vqa');
            setCurrentRoute('analysis');
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-sm bg-[#222321] border border-[#383A34] flex items-center justify-center text-[#D6A84F]">
              <ScanSearch className="w-4 h-4" />
            </div>
            <Badge variant="amber">Single Image</Badge>
          </div>

          <h3 className="text-sm font-bold text-[#F1EBDD] mb-1">Single-Image Spatial Reasoning</h3>
          <p className="text-xs text-[#AAA89E] leading-relaxed mb-3">
            Visual Question Answering, dense scene captioning, and text-guided spatial localization of water bodies, vegetation, and infrastructure.
          </p>

          <div className="space-y-1 pt-2.5 border-t border-[#383A34] text-xs font-mono text-[#AAA89E]">
            <div className="flex items-center gap-1.5 text-[#AAA89E]">
              <span className="text-[#D6A84F]">&bull;</span> RS-VQA (Counts, Presence, Land-cover)
            </div>
            <div className="flex items-center gap-1.5 text-[#AAA89E]">
              <span className="text-[#D6A84F]">&bull;</span> Dense Scene Captioning
            </div>
            <div className="flex items-center gap-1.5 text-[#AAA89E]">
              <span className="text-[#D6A84F]">&bull;</span> Grounding Bounding Boxes &amp; Masks
            </div>
          </div>
        </Card>

        {/* Bi-Temporal Card */}
        <Card
          className="p-5 cursor-pointer hover:border-[#B76552]/50 transition-colors group bg-[#2B2C28] border-[#383A34]"
          onClick={() => {
            loadDemoScenario('scenario_bitemporal_change');
            setCurrentRoute('analysis');
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-sm bg-[#222321] border border-[#383A34] flex items-center justify-center text-[#B76552]">
              <GitCompare className="w-4 h-4" />
            </div>
            <Badge variant="terracotta">Bi-Temporal</Badge>
          </div>

          <h3 className="text-sm font-bold text-[#F1EBDD] mb-1">Bi-Temporal Change Analysis</h3>
          <p className="text-xs text-[#AAA89E] leading-relaxed mb-3">
            Siamese feature differencing across two observation epochs. Quantifies land conversion, generates change heatmaps, and answers Change-VQA.
          </p>

          <div className="space-y-1 pt-2.5 border-t border-[#383A34] text-xs font-mono text-[#AAA89E]">
            <div className="flex items-center gap-1.5 text-[#AAA89E]">
              <span className="text-[#B76552]">&bull;</span> Pixel-Level Change Detection Masks
            </div>
            <div className="flex items-center gap-1.5 text-[#AAA89E]">
              <span className="text-[#B76552]">&bull;</span> Change-VQA ("Has built-up increased?")
            </div>
            <div className="flex items-center gap-1.5 text-[#AAA89E]">
              <span className="text-[#B76552]">&bull;</span> Interactive Swipe &amp; Flicker Viewer
            </div>
          </div>
        </Card>

        {/* Optical + SAR Card */}
        <Card
          className="p-5 cursor-pointer hover:border-[#879477]/50 transition-colors group bg-[#2B2C28] border-[#383A34]"
          onClick={() => {
            loadDemoScenario('scenario_optical_sar');
            setCurrentRoute('analysis');
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-sm bg-[#222321] border border-[#383A34] flex items-center justify-center text-[#879477]">
              <Radar className="w-4 h-4" />
            </div>
            <Badge variant="sage">Optical + SAR</Badge>
          </div>

          <h3 className="text-sm font-bold text-[#F1EBDD] mb-1">Cross-Modal Dual Sensing</h3>
          <p className="text-xs text-[#AAA89E] leading-relaxed mb-3">
            Joint analysis fusing optical multispectral reflectance with cloud-penetrating Sentinel-1 SAR microwave radar backscatter.
          </p>

          <div className="space-y-1 pt-2.5 border-t border-[#383A34] text-xs font-mono text-[#AAA89E]">
            <div className="flex items-center gap-1.5 text-[#AAA89E]">
              <span className="text-[#879477]">&bull;</span> All-Weather Cloud Penetration
            </div>
            <div className="flex items-center gap-1.5 text-[#AAA89E]">
              <span className="text-[#879477]">&bull;</span> SAR Polarimetric VV/VH Ratio
            </div>
            <div className="flex items-center gap-1.5 text-[#AAA89E]">
              <span className="text-[#879477]">&bull;</span> Flood Inundation &amp; Embankment Delineation
            </div>
          </div>
        </Card>
      </div>

      {/* Autonomous Agent Workflow Pipeline Diagram */}
      <Card className="p-5 bg-[#2B2C28] border-[#383A34]">
        <div className="flex items-center justify-between mb-4 border-b border-[#383A34] pb-2.5">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#D6A84F] flex items-center gap-2 font-mono">
              <Activity className="w-3.5 h-3.5" /> Autonomous Agent Workflow Architecture
            </h2>
            <p className="text-xs text-[#AAA89E] mt-0.5">
              Deterministic geodetic verification coupled with dynamic vision-language model orchestration.
            </p>
          </div>
          <span className="text-[10px] font-mono text-[#879477] bg-[#879477]/15 px-2 py-0.5 rounded-sm border border-[#879477]/30">
            6-Stage Pipeline
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-2.5">
          {workflowSteps.map((s, idx) => (
            <div
              key={s.num}
              className="p-3 bg-[#222321] border border-[#383A34] rounded-sm space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-[#D6A84F]">{s.num}</span>
                {idx < workflowSteps.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-[#78766D] hidden md:block" />
                )}
              </div>
              <div className="text-xs font-semibold text-[#F1EBDD] leading-tight">{s.title}</div>
              <div className="text-[10px] text-[#AAA89E] leading-relaxed font-mono">{s.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Analyses & System Telemetry Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Analyses (2 Cols) */}
        <Card className="lg:col-span-2 p-5 bg-[#2B2C28] border-[#383A34]">
          <div className="flex items-center justify-between mb-3 border-b border-[#383A34] pb-2.5">
            <h3 className="text-xs font-bold text-[#F1EBDD] flex items-center gap-2 uppercase tracking-wider font-mono">
              <Clock className="w-3.5 h-3.5 text-[#D6A84F]" /> Recent Mission Analyses
            </h3>
            <button
              onClick={() => setCurrentRoute('results')}
              className="text-xs text-[#D6A84F] hover:underline flex items-center gap-1 font-mono"
            >
              Archive History <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            {projects.map(proj => (
              <div
                key={proj.id}
                onClick={() => {
                  setCurrentProject(proj);
                  setCurrentRoute('analysis');
                }}
                className="p-3 bg-[#222321] border border-[#383A34] hover:border-[#D6A84F]/40 rounded-sm flex items-center justify-between gap-4 cursor-pointer transition-colors"
              >
                <div>
                  <div className="font-semibold text-xs text-[#F1EBDD] flex items-center gap-2">
                    <span>{proj.name}</span>
                    <Badge variant="amber" size="sm">{proj.theme}</Badge>
                  </div>
                  <div className="text-[11px] text-[#AAA89E] mt-0.5 truncate max-w-md">
                    {proj.description}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <div>
                    <div className="text-[9px] font-mono text-[#AAA89E]">Workflow</div>
                    <div className="text-[10px] font-mono text-[#D6A84F]">{proj.defaultMode}</div>
                  </div>
                  <Badge variant="sage" size="sm">VALIDATED</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* System Health Status (1 Col) */}
        <Card className="p-5 bg-[#2B2C28] border-[#383A34]">
          <div className="flex items-center justify-between mb-3 border-b border-[#383A34] pb-2.5">
            <h3 className="text-xs font-bold text-[#F1EBDD] flex items-center gap-2 uppercase tracking-wider font-mono">
              <Activity className="w-3.5 h-3.5 text-[#879477]" /> Telemetry &amp; Node Status
            </h3>
            <Badge variant="sage" size="sm">100% ONLINE</Badge>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 bg-[#222321] rounded-sm border border-[#383A34]">
              <div className="flex items-center gap-2 text-[#AAA89E]">
                <Cpu className="w-3.5 h-3.5 text-[#D6A84F]" />
                <span>AI Agent Controller</span>
              </div>
              <span className="font-mono text-[10px] text-[#879477] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Ready
              </span>
            </div>

            <div className="flex items-center justify-between p-2 bg-[#222321] rounded-sm border border-[#383A34]">
              <div className="flex items-center gap-2 text-[#AAA89E]">
                <Layers className="w-3.5 h-3.5 text-[#879477]" />
                <span>Esri Satellite WMTS</span>
              </div>
              <span className="font-mono text-[10px] text-[#879477] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 10m GSD
              </span>
            </div>

            <div className="flex items-center justify-between p-2 bg-[#222321] rounded-sm border border-[#383A34]">
              <div className="flex items-center gap-2 text-[#AAA89E]">
                <Database className="w-3.5 h-3.5 text-[#D6A84F]" />
                <span>Geospatial Vector DB</span>
              </div>
              <span className="font-mono text-[10px] text-[#879477] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Synced
              </span>
            </div>

            <div className="flex items-center justify-between p-2 bg-[#222321] rounded-sm border border-[#383A34]">
              <div className="flex items-center gap-2 text-[#AAA89E]">
                <Satellite className="w-3.5 h-3.5 text-[#D6A84F]" />
                <span>7 Specialist RS Models</span>
              </div>
              <span className="font-mono text-[10px] text-[#879477] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Warm
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
