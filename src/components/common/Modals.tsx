import React from 'react';
import { X, Clock, BookOpen, Code, Database } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuery?: (query: string) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, onSelectQuery }) => {
  if (!isOpen) return null;

  const pastQueries = [
    {
      id: 'Q-9812',
      query: 'Where is the water body in this image?',
      timestamp: 'Today, 10:24 AM',
      task: 'Visual Grounding',
      model: 'RS-Grounding-v2.1',
      status: 'Completed'
    },
    {
      id: 'Q-9811',
      query: 'Describe this image',
      timestamp: 'Today, 09:48 AM',
      task: 'Visual Question Answering',
      model: 'RS-VLM-v1.8',
      status: 'Completed'
    },
    {
      id: 'Q-9809',
      query: 'Find built-up area',
      timestamp: 'Yesterday, 04:15 PM',
      task: 'Visual Grounding',
      model: 'RS-Urban-v1.4',
      status: 'Completed'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-sat-card border border-sat-border rounded-xl w-full max-w-xl p-6 shadow-card">
        <div className="flex items-center justify-between border-b border-sat-border pb-3 mb-4">
          <div className="flex items-center gap-2 text-sat-ink">
            <Clock className="w-5 h-5 text-sat-blue" />
            <h3 className="text-base font-bold font-sans">Analysis Session History</h3>
          </div>
          <button onClick={onClose} className="text-sat-slate hover:text-sat-ink p-1 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-sat-slate mb-4">
          Session logs for verified queries executed on this node. Click any previous query to reload.
        </p>

        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {pastQueries.map((item) => (
            <div 
              key={item.id}
              onClick={() => {
                onSelectQuery?.(item.query);
                onClose();
              }}
              className="p-3 bg-sat-surface hover:bg-sat-surface/80 border border-sat-border rounded-lg cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-sat-ink">{item.query}</span>
                <span className="text-[10px] font-mono text-sat-success bg-sat-success-light px-1.5 py-0.5 rounded">
                  {item.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-sat-slate font-mono">
                <span>{item.task} • {item.model}</span>
                <span>{item.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-sat-surface border border-sat-border rounded text-sat-ink hover:bg-sat-border/50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<DocsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-sat-card border border-sat-border rounded-xl w-full max-w-2xl p-6 sm:p-8 shadow-card max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-sat-border pb-3 mb-4">
          <div className="flex items-center gap-2 text-sat-ink">
            <BookOpen className="w-5 h-5 text-sat-blue" />
            <h3 className="text-lg font-bold font-serif">SatQuery Documentation &amp; API Reference</h3>
          </div>
          <button onClick={onClose} className="text-sat-slate hover:text-sat-ink p-1 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6 text-xs text-sat-ink">
          <div>
            <h4 className="font-bold text-sm text-sat-ink mb-1">Overview</h4>
            <p className="text-sat-slate leading-relaxed">
              SatQuery is an agentic remote-sensing intelligence platform designed for Earth Observation analysis. It translates natural language spatial questions into structured GeoAI tool pipelines and returns evidence-grounded polygon masks and reports.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm text-sat-ink mb-2 flex items-center gap-2">
              <Code className="w-4 h-4 text-sat-blue" />
              FastAPI Endpoint Specifications
            </h4>
            <div className="space-y-2 font-mono text-[11px] bg-sat-surface p-3 rounded-lg border border-sat-border">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded font-bold">POST</span>
                <span className="text-sat-ink font-semibold">/api/analyze</span>
                <span className="text-sat-slate">— Unified Agent analysis endpoint</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded font-bold">POST</span>
                <span className="text-sat-ink font-semibold">/api/ground</span>
                <span className="text-sat-slate">— Visual Grounding bounding &amp; mask extraction</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded font-bold">POST</span>
                <span className="text-sat-ink font-semibold">/api/vqa</span>
                <span className="text-sat-slate">— Multi-spectral Visual Question Answering</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 bg-green-100 text-green-800 rounded font-bold">GET</span>
                <span className="text-sat-ink font-semibold">/api/health</span>
                <span className="text-sat-slate">— Node telemetry &amp; model weights status</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm text-sat-ink mb-2 flex items-center gap-2">
              <Database className="w-4 h-4 text-sat-blue" />
              Supported Constellations
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sat-slate">
              <li><strong className="text-sat-ink">Sentinel-2 (MSI):</strong> Multi-spectral 10m bands (B2, B3, B4, B8, B11)</li>
              <li><strong className="text-sat-ink">Landsat 8/9 (OLI-2/TIRS-2):</strong> 30m multispectral + 15m panchromatic</li>
              <li><strong className="text-sat-ink">Cartosat-3:</strong> Sub-meter panchromatic (0.28m) &amp; 1.12m multi-spectral</li>
              <li><strong className="text-sat-ink">RISAT-1 / EOS-04:</strong> C-band Synthetic Aperture Radar (SAR)</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-sat-border flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-sat-blue text-white rounded hover:bg-sat-blue-hover transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
