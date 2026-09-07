import React, { useState } from 'react';
import { 
  BookOpen, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  Waves, 
  Trees, 
  Building2, 
  AlertTriangle, 
  Layers, 
  Cpu, 
  MessageSquareText, 
  ShieldCheck, 
  Milestone
} from 'lucide-react';

interface DocsUseCasesPageProps {
  onSelectUseCase?: (query: string) => void;
  onNavigateToAnalysis: () => void;
}

export const DocsUseCasesPage: React.FC<DocsUseCasesPageProps> = ({ 
  onSelectUseCase, 
  onNavigateToAnalysis 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'use-cases' | 'modalities' | 'roadmap'>('overview');

  const practicalUseCases = [
    {
      id: 'coastal',
      title: 'Coastal Analysis',
      subtitle: 'Marine Dynamics & Shoreline Inundation',
      icon: Waves,
      tag: 'OPTICAL + SWIR',
      sampleQuery: 'Where is the coastline and water boundary in this image?',
      description: 'Analyze coastal boundaries, shoreline erosion, tidal inundation extents, and water body perimeters using multi-spectral reflectance signatures.',
      applications: [
        'Water body localization and perimeter boundary extraction',
        'Identification of tidal changes and shoreline recession',
        'Wetland and coastal vegetation assessment'
      ]
    },
    {
      id: 'landuse',
      title: 'Land Use Mapping',
      subtitle: 'Agricultural Parcels & Vegetation Cover',
      icon: Trees,
      tag: 'VEGETATION INDICES',
      sampleQuery: 'Identify agricultural parcels, vegetation indices, and land cover types.',
      description: 'Segment agrarian plots, evaluate vegetation indices, and classify agricultural vs. non-vegetated terrain across seasonal imagery.',
      applications: [
        'Agricultural parcel delineation and boundary recognition',
        'Vegetation density and crop canopy inspection',
        'Land cover categorization and rural landscape monitoring'
      ]
    },
    {
      id: 'urban',
      title: 'Urban Growth & Infrastructure',
      subtitle: 'Building Footprints & Transport Networks',
      icon: Building2,
      tag: 'HIGH-RESOLUTION',
      sampleQuery: 'Detect urban expansion, building footprints, and dense infrastructure.',
      description: 'Detect urban expansion patterns, identify transportation corridors, and assess infrastructure density in metropolitan and peri-urban scenes.',
      applications: [
        'Built-up settlement localization and perimeter mapping',
        'Road and transportation network density analysis',
        'Monitoring rural-to-urban transition corridors'
      ]
    },
    {
      id: 'disaster',
      title: 'Disaster Monitoring',
      subtitle: 'Rapid Inundation & Hazard Assessment',
      icon: AlertTriangle,
      tag: 'SAR + THERMAL',
      sampleQuery: 'Identify flood inundation zones and thermal hazard hotspots.',
      description: 'Support disaster response workflows by delineating flooded zones, tracking environmental hazard extents, and identifying impacted terrain.',
      applications: [
        'Flood inundation boundary detection',
        'Surface hazard and anomaly localization',
        'Rapid post-calamity spatial impact assessment'
      ]
    }
  ];

  const workflowSteps = [
    {
      number: '1',
      title: 'Upload Geographical Imagery',
      desc: 'Users upload their own GeoTIFF, JPG, or PNG imagery up to 100 MB through an intuitive drag-and-drop interface.'
    },
    {
      number: '2',
      title: 'Natural-Language Question',
      desc: 'Users type their query in their own natural language (English, Hindi, Hinglish, or other languages) without predefined constraints.'
    },
    {
      number: '3',
      title: 'AI Model Processing',
      desc: 'Specialist remote-sensing vision-language models process visual features, spatial context, and query semantics.'
    },
    {
      number: '4',
      title: 'Grounded Answer & Confidence',
      desc: 'The system delivers a clear text answer alongside the user\'s uploaded image and an actionable confidence score.'
    }
  ];

  const analysisModalities = [
    {
      title: 'Visual Question Answering (VQA)',
      icon: MessageSquareText,
      description: 'Enables users to ask direct natural-language questions regarding features, landscape characteristics, and objects in geographical imagery.'
    },
    {
      title: 'Image Captioning & Scene Understanding',
      icon: BookOpen,
      description: 'Synthesizes concise, structured descriptions summarizing dominant terrain, hydrological features, and land use patterns.'
    },
    {
      title: 'Visual Grounding',
      icon: Compass,
      description: 'Spatial localization associating text phrases with specific geographical features and regions within the uploaded image.'
    },
    {
      title: 'Bi-Temporal Change Analysis',
      icon: Layers,
      description: 'Comparative reasoning across time to detect alterations in surface conditions, water levels, or urban footprint progression.'
    },
    {
      title: 'Optical + SAR Fusion Analysis',
      icon: Cpu,
      description: 'Combines optical multi-spectral reflectance with all-weather radar signatures to provide robust geographical interpretation.'
    },
    {
      title: 'AI & Model-Based Inference',
      icon: ShieldCheck,
      description: 'Employs deep-learning models trained and fine-tuned for Earth observation and remote-sensing tasks.'
    }
  ];

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="border-b border-sat-border pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sat-slate mb-2">
            <BookOpen className="w-4 h-4 text-sat-blue" />
            <span>Platform Guide &amp; Operational Domains</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-sat-ink tracking-tight">
            Documentation &amp; Use Cases
          </h1>
          <p className="text-xs sm:text-sm text-sat-slate mt-2 max-w-3xl leading-relaxed">
            Comprehensive overview of SatQuery AI: system architecture, supported image workflows, practical Earth observation domains, and the development roadmap.
          </p>
        </div>

        <button
          onClick={onNavigateToAnalysis}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sat-blue hover:bg-sat-blue-hover text-white text-xs font-semibold rounded shadow-subtle transition-colors self-start md:self-auto"
        >
          <span>Launch Analysis</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-sat-border mb-8 overflow-x-auto pb-1">
        {[
          { id: 'overview', label: 'Platform Overview' },
          { id: 'use-cases', label: 'Practical Use Cases' },
          { id: 'modalities', label: 'Analysis Modalities' },
          { id: 'roadmap', label: 'Development Roadmap' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-sat-card text-sat-blue border border-sat-border shadow-xs'
                : 'text-sat-slate hover:text-sat-ink'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* What is SatQuery AI */}
          <section className="bg-sat-card border border-sat-border rounded-xl p-6 sm:p-8 shadow-subtle">
            <h2 className="text-xl font-bold font-serif text-sat-ink mb-3">
              What is SatQuery AI?
            </h2>
            <p className="text-xs sm:text-sm text-sat-slate leading-relaxed mb-4">
              SatQuery AI is an intelligent geographical imagery analysis platform designed to make Earth observation data accessible through natural language. Instead of requiring complex manual photo-interpretation or bespoke GIS scripts, users can upload geographical imagery and ask direct questions in their own language to receive grounded answers with confidence metrics.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-lg bg-sat-surface border border-sat-border">
                <h3 className="text-xs font-bold text-sat-ink uppercase tracking-wider mb-2 font-mono">
                  The Problem It Solves
                </h3>
                <p className="text-xs text-sat-slate leading-relaxed">
                  Remote sensing imagery is vast, multi-spectral, and technically complex. Traditional extraction of insights requires specialized GIS expertise and lengthy manual inspection. SatQuery AI bridges this gap with natural-language interaction, allowing analysts, researchers, and field operators to interrogate imagery conversationally.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-sat-surface border border-sat-border">
                <h3 className="text-xs font-bold text-sat-ink uppercase tracking-wider mb-2 font-mono">
                  How Users Interact
                </h3>
                <p className="text-xs text-sat-slate leading-relaxed">
                  The user uploads an image file (supporting GeoTIFF, JPG, PNG up to 100 MB), enters a question in their preferred language (English, Hindi, Hinglish, etc.), and triggers analysis. The system inspects the image and returns a clear text response accompanied by the uploaded visual and a confidence score.
                </p>
              </div>
            </div>
          </section>

          {/* User Interaction Flow */}
          <section className="bg-sat-card border border-sat-border rounded-xl p-6 sm:p-8 shadow-subtle">
            <h2 className="text-xl font-bold font-serif text-sat-ink mb-6">
              User Interaction Workflow
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {workflowSteps.map((step) => (
                <div key={step.number} className="p-4 rounded-lg bg-sat-surface border border-sat-border flex flex-col justify-between">
                  <div>
                    <span className="w-7 h-7 rounded-full bg-sat-card border border-sat-border flex items-center justify-center font-mono text-xs font-bold text-sat-blue mb-3">
                      {step.number}
                    </span>
                    <h3 className="text-xs font-bold text-sat-ink mb-1.5 font-sans">
                      {step.title}
                    </h3>
                    <p className="text-xs text-sat-slate leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* SECTION 2: USE CASES */}
      {activeTab === 'use-cases' && (
        <div className="space-y-6">
          <div className="bg-sat-card border border-sat-border rounded-xl p-6 sm:p-8 shadow-subtle mb-6">
            <h2 className="text-xl font-bold font-serif text-sat-ink mb-2">
              Practical Earth Observation Use Cases
            </h2>
            <p className="text-xs sm:text-sm text-sat-slate leading-relaxed">
              SatQuery AI supports targeted operational workflows across maritime, agricultural, infrastructural, and emergency management domains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practicalUseCases.map((uc) => {
              const Icon = uc.icon;
              return (
                <div 
                  key={uc.id}
                  className="bg-sat-card border border-sat-border rounded-xl p-6 shadow-subtle flex flex-col justify-between hover:border-sat-slate/60 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5 text-sat-blue">
                        <div className="w-9 h-9 rounded-lg bg-sat-surface border border-sat-border flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-sat-ink font-sans">
                            {uc.title}
                          </h3>
                          <span className="text-[11px] font-medium text-sat-slate">
                            {uc.subtitle}
                          </span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-sat-surface border border-sat-border text-sat-slate">
                        {uc.tag}
                      </span>
                    </div>

                    <p className="text-xs text-sat-slate leading-relaxed mb-4">
                      {uc.description}
                    </p>

                    <div className="space-y-1.5 mb-5 pt-3 border-t border-sat-border/60">
                      {uc.applications.map((app, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-sat-ink">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sat-success shrink-0 mt-0.5" />
                          <span>{app}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-sat-border/60 flex items-center justify-between">
                    <span className="text-[11px] text-sat-slate truncate max-w-[240px] italic">
                      &ldquo;{uc.sampleQuery}&rdquo;
                    </span>
                    {onSelectUseCase && (
                      <button
                        onClick={() => onSelectUseCase(uc.sampleQuery)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-sat-blue hover:text-sat-blue-hover transition-colors shrink-0 ml-2"
                      >
                        <span>Analyze</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 3: CORE ANALYSIS MODALITIES */}
      {activeTab === 'modalities' && (
        <div className="space-y-6">
          <div className="bg-sat-card border border-sat-border rounded-xl p-6 sm:p-8 shadow-subtle mb-6">
            <h2 className="text-xl font-bold font-serif text-sat-ink mb-2">
              System Analysis Modalities
            </h2>
            <p className="text-xs sm:text-sm text-sat-slate leading-relaxed">
              Review the core analytical engines that power SatQuery AI's image interpretation and question answering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysisModalities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <div key={idx} className="bg-sat-card border border-sat-border rounded-xl p-6 shadow-subtle flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-sat-surface border border-sat-border flex items-center justify-center text-sat-blue mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-sat-ink font-sans mb-2">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-sat-slate leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 4: DEVELOPMENT ROADMAP (No Dates, Stage-Based) */}
      {activeTab === 'roadmap' && (
        <div className="space-y-8">
          <div className="bg-sat-card border border-sat-border rounded-xl p-6 sm:p-8 shadow-subtle">
            <div className="flex items-center gap-2 mb-2">
              <Milestone className="w-5 h-5 text-sat-blue" />
              <h2 className="text-xl font-bold font-serif text-sat-ink">
                Development Roadmap
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-sat-slate leading-relaxed">
              Our structured roadmap outlining what we are developing now, what we will develop next, and our future evolution roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Stage 1: Current Stage */}
            <div className="bg-sat-card border-2 border-sat-blue/60 rounded-xl p-6 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                    Current Stage
                  </span>
                  <span className="w-2 h-2 rounded-full bg-sat-success animate-pulse"></span>
                </div>
                <h3 className="text-base font-bold text-sat-ink font-sans mb-1">
                  Foundation &amp; Prototype
                </h3>
                <p className="text-xs text-sat-slate mb-4">
                  Currently developing and stabilizing the core application baseline:
                </p>

                <ul className="space-y-2.5 text-xs text-sat-ink">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sat-success shrink-0 mt-0.5" />
                    <span>Current prototype frontend and responsive interface</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sat-success shrink-0 mt-0.5" />
                    <span>Current backend foundation and API routing structure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sat-success shrink-0 mt-0.5" />
                    <span>Current image upload workflow supporting files up to 100 MB</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sat-success shrink-0 mt-0.5" />
                    <span>Current natural-language question submission in user's own language</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sat-success shrink-0 mt-0.5" />
                    <span>Current model integration and basic geographical analysis functionality</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-sat-border text-[11px] font-mono text-sat-slate">
                Status: In active development
              </div>
            </div>

            {/* Stage 2: Next Stage */}
            <div className="bg-sat-card border border-sat-border rounded-xl p-6 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded bg-sat-surface border border-sat-border text-[10px] font-mono font-bold uppercase tracking-wider text-sat-slate">
                    Next Stage
                  </span>
                  <span className="w-2 h-2 rounded-full bg-sat-blue"></span>
                </div>
                <h3 className="text-base font-bold text-sat-ink font-sans mb-1">
                  Model Refinement &amp; Fine-Tuning
                </h3>
                <p className="text-xs text-sat-slate mb-4">
                  Next, we will focus on deepening analytical precision across remote-sensing modalities:
                </p>

                <ul className="space-y-2.5 text-xs text-sat-ink">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sat-blue shrink-0 mt-1.5"></span>
                    <span>Next, we will improve model fine-tuning with domain-specific datasets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sat-blue shrink-0 mt-1.5"></span>
                    <span>Next, we will improve remote-sensing context and semantic understanding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sat-blue shrink-0 mt-1.5"></span>
                    <span>Next, we will enhance Visual Question Answering (VQA) accuracy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sat-blue shrink-0 mt-1.5"></span>
                    <span>Next, we will improve scene captioning and visual grounding localization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sat-blue shrink-0 mt-1.5"></span>
                    <span>Next, we will improve bi-temporal change analysis and Optical + SAR fusion</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-sat-border text-[11px] font-mono text-sat-slate">
                Focus: Model enhancement
              </div>
            </div>

            {/* Stage 3: Future Stage */}
            <div className="bg-sat-card border border-sat-border rounded-xl p-6 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded bg-sat-surface border border-sat-border text-[10px] font-mono font-bold uppercase tracking-wider text-sat-slate">
                    Future Stage
                  </span>
                  <span className="w-2 h-2 rounded-full bg-sat-slate/60"></span>
                </div>
                <h3 className="text-base font-bold text-sat-ink font-sans mb-1">
                  Scale &amp; Geospatial Ecosystem
                </h3>
                <p className="text-xs text-sat-slate mb-4">
                  After that, we will scale system capabilities for enterprise and mission deployment:
                </p>

                <ul className="space-y-2.5 text-xs text-sat-ink">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sat-slate/70 shrink-0 mt-1.5"></span>
                    <span>After that, we will implement advanced agentic model routing and multi-tool orchestration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sat-slate/70 shrink-0 mt-1.5"></span>
                    <span>Future improvements will deliver more robust geospatial processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sat-slate/70 shrink-0 mt-1.5"></span>
                    <span>Future improvements will expand satellite and remote-sensing data format support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sat-slate/70 shrink-0 mt-1.5"></span>
                    <span>After that, we will integrate automated benchmark evaluation pipelines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sat-slate/70 shrink-0 mt-1.5"></span>
                    <span>Future improvements will optimize high-throughput deployment and scalability</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-sat-border text-[11px] font-mono text-sat-slate">
                Horizon: Enterprise &amp; Scalability
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Bottom CTA Banner */}
      <div className="mt-12 bg-sat-card border border-sat-border rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-subtle">
        <div>
          <h3 className="text-base font-bold font-serif text-sat-ink">
            Ready to test geographical image analysis?
          </h3>
          <p className="text-xs text-sat-slate mt-1">
            Upload your own imagery up to 100 MB and ask questions in your own language.
          </p>
        </div>

        <button
          onClick={onNavigateToAnalysis}
          className="inline-flex items-center gap-2 px-6 py-3 bg-sat-blue hover:bg-sat-blue-hover text-white text-xs font-semibold rounded shadow-subtle transition-colors whitespace-nowrap"
        >
          <span>Open Analysis Workspace</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
