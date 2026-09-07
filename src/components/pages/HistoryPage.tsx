import React, { useState } from 'react';
import { Clock, Search, RotateCcw, CheckCircle2, ArrowRight, Filter, Database, Activity, Sparkles } from 'lucide-react';

interface HistoryItem {
  id: string;
  query: string;
  timestamp: string;
  task: 'Visual Grounding' | 'Visual Question Answering';
  model: string;
  status: 'Completed' | 'Processing' | 'Failed';
  granule: string;
  confidence: number;
  detectedArea?: string;
}

interface HistoryPageProps {
  onSelectQuery: (query: string) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onSelectQuery }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'grounding' | 'vqa'>('all');

  const historyItems: HistoryItem[] = [
    {
      id: 'Q-9812',
      query: 'Where is the water body in this image?',
      timestamp: 'Today, 10:24 AM',
      task: 'Visual Grounding',
      model: 'RS-Grounding-v2.1',
      status: 'Completed',
      granule: 'geographical_scene_01.jpg',
      confidence: 0.94,
      detectedArea: '2.34 km²'
    },
    {
      id: 'Q-9811',
      query: 'Describe this image',
      timestamp: 'Today, 09:48 AM',
      task: 'Visual Question Answering',
      model: 'RS-VLM-v1.8',
      status: 'Completed',
      granule: 'landsat9_urban.jpg',
      confidence: 0.91
    },
    {
      id: 'Q-9809',
      query: 'Find built-up area and dense infrastructure',
      timestamp: 'Yesterday, 04:15 PM',
      task: 'Visual Grounding',
      model: 'RS-Urban-v1.4',
      status: 'Completed',
      granule: 'cartosat3_metro.jpg',
      confidence: 0.89,
      detectedArea: '14.8 km²'
    },
    {
      id: 'Q-9804',
      query: 'Calculate vegetation indices and crop health in this agricultural tract',
      timestamp: 'Yesterday, 01:30 PM',
      task: 'Visual Grounding',
      model: 'RS-Vegetation-v2.0',
      status: 'Completed',
      granule: 'sentinel2_agriculture.jpg',
      confidence: 0.96,
      detectedArea: '8.12 km²'
    },
    {
      id: 'Q-9799',
      query: 'Identify flood inundation zones and waterlogging',
      timestamp: '2 days ago, 11:10 AM',
      task: 'Visual Grounding',
      model: 'RS-SAR-Flood-v1.2',
      status: 'Completed',
      granule: 'risat1_flood.jpg',
      confidence: 0.95,
      detectedArea: '31.5 km²'
    },
    {
      id: 'Q-9792',
      query: 'What is the dominant land cover class across this region?',
      timestamp: '3 days ago, 03:22 PM',
      task: 'Visual Question Answering',
      model: 'RS-VLM-v1.8',
      status: 'Completed',
      granule: 'landsat8_coastal.jpg',
      confidence: 0.92
    }
  ];

  const filteredItems = historyItems.filter((item) => {
    const matchesSearch = item.query.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.model.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (selectedFilter === 'grounding') return item.task === 'Visual Grounding';
    if (selectedFilter === 'vqa') return item.task === 'Visual Question Answering';
    return true;
  });

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="border-b border-sat-border pb-6 mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sat-slate mb-2">
          <Clock className="w-4 h-4 text-sat-blue" />
          <span>Session Audit &amp; Analysis History</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-sat-ink tracking-tight">
          Analysis History
        </h1>
        <p className="text-sm text-sat-slate mt-2 max-w-3xl leading-relaxed">
          Review previous satellite imagery queries, task classifications, model predictions, and spatial evidence. Click any entry to reload and re-evaluate in the Analysis workspace.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-sat-card border border-sat-border rounded-xl p-4 shadow-subtle">
          <div className="flex items-center justify-between text-sat-slate mb-1">
            <span className="text-xs font-medium">Total Queries</span>
            <Database className="w-4 h-4 text-sat-blue" />
          </div>
          <span className="text-2xl font-bold font-mono text-sat-ink">1,284</span>
          <span className="text-[10px] text-sat-slate block mt-1">Across 18 satellite granules</span>
        </div>

        <div className="bg-sat-card border border-sat-border rounded-xl p-4 shadow-subtle">
          <div className="flex items-center justify-between text-sat-slate mb-1">
            <span className="text-xs font-medium">Avg Inference Time</span>
            <Activity className="w-4 h-4 text-sat-success" />
          </div>
          <span className="text-2xl font-bold font-mono text-sat-ink">1.42s</span>
          <span className="text-[10px] text-sat-slate block mt-1">Specialist model dispatch</span>
        </div>

        <div className="bg-sat-card border border-sat-border rounded-xl p-4 shadow-subtle">
          <div className="flex items-center justify-between text-sat-slate mb-1">
            <span className="text-xs font-medium">Mean Confidence</span>
            <Sparkles className="w-4 h-4 text-sat-blue" />
          </div>
          <span className="text-2xl font-bold font-mono text-sat-ink">93.8%</span>
          <span className="text-[10px] text-sat-slate block mt-1">Grounding &amp; VQA ensemble</span>
        </div>

        <div className="bg-sat-card border border-sat-border rounded-xl p-4 shadow-subtle">
          <div className="flex items-center justify-between text-sat-slate mb-1">
            <span className="text-xs font-medium">Active Specialist Models</span>
            <CheckCircle2 className="w-4 h-4 text-sat-success" />
          </div>
          <span className="text-2xl font-bold font-mono text-sat-ink">4 Online</span>
          <span className="text-[10px] text-sat-slate block mt-1">Zero inference failures</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-sat-slate absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search query, ID, or model..."
            className="w-full pl-9 pr-4 py-2 bg-sat-card border border-sat-border rounded-lg text-xs text-sat-ink placeholder-sat-slate/70 focus:outline-none focus:border-sat-blue focus:ring-1 focus:ring-sat-blue"
          />
        </div>

        {/* Task Filter Pills */}
        <div className="flex items-center gap-1.5 bg-sat-surface p-1 rounded-lg border border-sat-border self-start sm:self-auto text-xs">
          <Filter className="w-3.5 h-3.5 text-sat-slate ml-2 mr-1" />
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${
              selectedFilter === 'all'
                ? 'bg-sat-card text-sat-ink shadow-xs font-semibold'
                : 'text-sat-slate hover:text-sat-ink'
            }`}
          >
            All Queries ({historyItems.length})
          </button>
          <button
            onClick={() => setSelectedFilter('grounding')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${
              selectedFilter === 'grounding'
                ? 'bg-sat-card text-sat-ink shadow-xs font-semibold'
                : 'text-sat-slate hover:text-sat-ink'
            }`}
          >
            Visual Grounding
          </button>
          <button
            onClick={() => setSelectedFilter('vqa')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${
              selectedFilter === 'vqa'
                ? 'bg-sat-card text-sat-ink shadow-xs font-semibold'
                : 'text-sat-slate hover:text-sat-ink'
            }`}
          >
            VQA
          </button>
        </div>

      </div>

      {/* History List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center bg-sat-card border border-sat-border rounded-xl">
            <Clock className="w-8 h-8 text-sat-slate mx-auto mb-2 opacity-50" />
            <h3 className="text-sm font-semibold text-sat-ink">No historical queries match your filter</h3>
            <p className="text-xs text-sat-slate mt-1">Try clearing your search term or selecting another category.</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-sat-card border border-sat-border rounded-xl p-5 hover:border-sat-slate/70 hover:shadow-card transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                  <span className="font-mono text-xs font-bold text-sat-blue bg-sat-surface px-2 py-0.5 rounded border border-sat-border">
                    {item.id}
                  </span>
                  <span className="text-xs font-mono font-medium text-sat-slate">
                    {item.task}
                  </span>
                  <span className="text-sat-border">•</span>
                  <span className="text-xs font-mono text-sat-slate">
                    {item.model}
                  </span>
                  <span className="text-sat-border">•</span>
                  <span className="text-[11px] text-sat-slate font-mono">
                    {item.timestamp}
                  </span>
                  <span className="text-[10px] font-mono text-sat-success bg-sat-success-light px-2 py-0.5 rounded-full font-semibold">
                    {item.status}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-sat-ink group-hover:text-sat-blue transition-colors">
                  &ldquo;{item.query}&rdquo;
                </h3>

                <div className="flex items-center gap-4 mt-2 text-xs text-sat-slate font-mono">
                  <span>Granule: <strong className="text-sat-ink">{item.granule}</strong></span>
                  <span>Confidence: <strong className="text-sat-ink">{Math.round(item.confidence * 100)}%</strong></span>
                  {item.detectedArea && (
                    <span>Area: <strong className="text-sat-ink">{item.detectedArea}</strong></span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectQuery(item.query)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-sat-surface hover:bg-sat-blue hover:text-white border border-sat-border rounded-lg text-xs font-semibold text-sat-ink transition-all shrink-0 shadow-xs group/btn"
              >
                <RotateCcw className="w-3.5 h-3.5 transition-transform group-hover/btn:-rotate-45" />
                <span>Re-run in Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
