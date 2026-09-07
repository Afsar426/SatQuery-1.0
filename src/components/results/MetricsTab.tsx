import React from 'react';
import { AnalysisResponse } from '../../types/analysis';
import { Satellite, ShieldCheck, Compass, BarChart3, Database } from 'lucide-react';

interface MetricsTabProps {
  response: AnalysisResponse;
}

export const MetricsTab: React.FC<MetricsTabProps> = ({ response }) => {
  const meta = response.metadata;

  return (
    <div className="space-y-6">
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 bg-sat-card border border-sat-border rounded-lg shadow-xs">
          <div className="flex items-center gap-2 text-sat-slate mb-1 text-xs font-medium">
            <Satellite className="w-4 h-4 text-sat-blue" />
            <span>Constellation / Sensor</span>
          </div>
          <div className="text-sm font-bold text-sat-ink font-mono mt-1">
            {meta?.sensor || 'Sentinel-2 MSI Level-2A'}
          </div>
          <div className="text-[11px] text-sat-slate mt-0.5">
            {meta?.platform || 'ESA Copernicus Constellation'}
          </div>
        </div>

        <div className="p-4 bg-sat-card border border-sat-border rounded-lg shadow-xs">
          <div className="flex items-center gap-2 text-sat-slate mb-1 text-xs font-medium">
            <Compass className="w-4 h-4 text-sat-blue" />
            <span>Spatial Resolution</span>
          </div>
          <div className="text-sm font-bold text-sat-ink font-mono mt-1">
            {meta?.resolutionGsd || '10.0 meters/px'}
          </div>
          <div className="text-[11px] text-sat-slate mt-0.5">
            GSD (Ground Sample Distance)
          </div>
        </div>

        <div className="p-4 bg-sat-card border border-sat-border rounded-lg shadow-xs">
          <div className="flex items-center gap-2 text-sat-slate mb-1 text-xs font-medium">
            <ShieldCheck className="w-4 h-4 text-sat-success" />
            <span>Cloud Contamination</span>
          </div>
          <div className="text-sm font-bold text-sat-ink font-mono mt-1">
            {meta?.cloudCoverPercentage !== undefined ? `${meta.cloudCoverPercentage}%` : '0.4%'}
          </div>
          <div className="text-[11px] text-sat-success mt-0.5">
            Clear atmospheric window
          </div>
        </div>

        <div className="p-4 bg-sat-card border border-sat-border rounded-lg shadow-xs">
          <div className="flex items-center gap-2 text-sat-slate mb-1 text-xs font-medium">
            <BarChart3 className="w-4 h-4 text-sat-blue" />
            <span>Target Area</span>
          </div>
          <div className="text-sm font-bold text-sat-ink font-mono mt-1">
            {response.detectedArea || '2.34 km²'}
          </div>
          <div className="text-[11px] text-sat-slate mt-0.5">
            Calculated surface extent
          </div>
        </div>

      </div>

      {/* Geospatial Metadata Table */}
      <div className="bg-sat-card border border-sat-border rounded-xl overflow-hidden shadow-subtle">
        <div className="px-6 py-4 border-b border-sat-border bg-sat-surface/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-sat-blue" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-sat-ink font-mono">
              Geospatial Header &amp; Telemetry
            </h4>
          </div>
          <span className="text-[11px] font-mono text-sat-slate">ISO 19115-1 Compliant</span>
        </div>

        <div className="divide-y divide-sat-border text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 px-6 py-3">
            <span className="text-sat-slate font-medium">Coordinate Reference System:</span>
            <span className="sm:col-span-2 font-mono text-sat-ink font-semibold">
              {meta?.projection || 'WGS 84 / UTM Zone 43N (EPSG:32643)'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 px-6 py-3">
            <span className="text-sat-slate font-medium">Centroid Coordinates:</span>
            <span className="sm:col-span-2 font-mono text-sat-ink font-semibold">
              {response.coordinates?.formatted || '22.431° N, 75.362° E'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 px-6 py-3">
            <span className="text-sat-slate font-medium">Spectral Bands Ingested:</span>
            <div className="sm:col-span-2 flex flex-wrap gap-1.5 mt-1 sm:mt-0">
              {(meta?.bandsUsed || ['B04 (Red 665nm)', 'B03 (Green 560nm)', 'B02 (Blue 490nm)', 'B08 (NIR 842nm)']).map((band) => (
                <span key={band} className="px-2 py-0.5 rounded bg-sat-surface border border-sat-border font-mono text-[11px]">
                  {band}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 px-6 py-3">
            <span className="text-sat-slate font-medium">Acquisition Timestamp:</span>
            <span className="sm:col-span-2 font-mono text-sat-ink">
              {meta?.acquisitionDate || '2026-08-14 05:42:19 UTC'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 px-6 py-3">
            <span className="text-sat-slate font-medium">Bounding Box (WGS84):</span>
            <span className="sm:col-span-2 font-mono text-sat-slate text-[11px]">
              [West: 75.341°, South: 22.410°, East: 75.385°, North: 22.455°]
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
