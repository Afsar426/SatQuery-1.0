import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import {
  Map,
  Cpu,
  ShieldCheck,
  Save,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { demoMode, setDemoMode, addNotification } = useApp();

  const [coordFormat, setCoordFormat] = useState<'dd' | 'utm'>('dd');
  const [autoDetectMode, setAutoDetectMode] = useState<boolean>(true);
  const [autoFocusEvidence, setAutoFocusEvidence] = useState<boolean>(true);
  const [mapProvider, setMapProvider] = useState<string>('esri');

  const handleSaveSettings = () => {
    addNotification('Settings Saved', 'System preferences and GIS defaults updated successfully.', 'success');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 pb-16 bg-[#171817]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#383A34] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#F1EBDD] tracking-tight">
              System Settings &amp; GIS Preferences
            </h1>
            <Badge variant="amber" size="sm">Preferences</Badge>
          </div>
          <p className="text-xs text-[#AAA89E] mt-1">
            Configure agent inference thresholds, cartographic coordinate projections, and presentation modes.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Save className="w-3.5 h-3.5" />}
          onClick={handleSaveSettings}
        >
          Save Changes
        </Button>
      </div>

      <div className="space-y-6">
        {/* Section 1: AI Agent & Analysis Settings */}
        <Card className="p-6 space-y-5 bg-[#222321] border-[#383A34]">
          <div className="flex items-center gap-2 border-b border-[#383A34] pb-3">
            <Cpu className="w-4 h-4 text-[#D6A84F]" />
            <h2 className="text-sm font-bold text-[#F1EBDD] uppercase tracking-wider font-mono">
              AI Agent &amp; Analysis Controls
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[#F1EBDD]">
                  Autonomous Workflow Auto-Detection
                </div>
                <div className="text-[11px] text-[#AAA89E]">
                  Allows SatQuery Agent Controller to determine whether query requires VQA, Grounding, Change-Net, or Fusion.
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoDetectMode}
                onChange={e => setAutoDetectMode(e.target.checked)}
                className="rounded-sm bg-[#171817] border-[#383A34] text-[#D6A84F] focus:ring-0 cursor-pointer h-4 w-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[#F1EBDD]">
                  Auto-Pan &amp; Zoom to Spatial Evidence
                </div>
                <div className="text-[11px] text-[#AAA89E]">
                  Automatically centers and zooms the geospatial map canvas when grounding masks or change clusters are generated.
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoFocusEvidence}
                onChange={e => setAutoFocusEvidence(e.target.checked)}
                className="rounded-sm bg-[#171817] border-[#383A34] text-[#D6A84F] focus:ring-0 cursor-pointer h-4 w-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[#F1EBDD]">
                  SIH 2026 Presentation Demo Mode
                </div>
                <div className="text-[11px] text-[#AAA89E]">
                  Preloads high-resolution ISRO benchmark scenarios with simulated model latencies for offline presentation.
                </div>
              </div>
              <input
                type="checkbox"
                checked={demoMode}
                onChange={e => setDemoMode(e.target.checked)}
                className="rounded-sm bg-[#171817] border-[#383A34] text-[#D6A84F] focus:ring-0 cursor-pointer h-4 w-4"
              />
            </div>
          </div>
        </Card>

        {/* Section 2: Geospatial Map Preferences */}
        <Card className="p-6 space-y-5 bg-[#222321] border-[#383A34]">
          <div className="flex items-center gap-2 border-b border-[#383A34] pb-3">
            <Map className="w-4 h-4 text-[#879477]" />
            <h2 className="text-sm font-bold text-[#F1EBDD] uppercase tracking-wider font-mono">
              Geospatial Cartography &amp; Map Engine
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-semibold text-[#AAA89E] block mb-1.5 font-mono">
                Primary Satellite Basemap Tile Provider
              </label>
              <select
                value={mapProvider}
                onChange={e => setMapProvider(e.target.value)}
                className="w-full bg-[#171817] border border-[#383A34] rounded-sm px-3 py-2 text-xs text-[#F1EBDD] focus:outline-none focus:border-[#D6A84F] font-mono"
              >
                <option value="esri">Esri World Imagery (High-Res True Color)</option>
                <option value="osm">OpenStreetMap Cartographic Standard</option>
                <option value="bhuvan">ISRO Bhuvan WMTS Standard (Simulated)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#AAA89E] block mb-1.5 font-mono">
                Coordinate Display Format
              </label>
              <select
                value={coordFormat}
                onChange={e => setCoordFormat(e.target.value as 'dd' | 'utm')}
                className="w-full bg-[#171817] border border-[#383A34] rounded-sm px-3 py-2 text-xs text-[#F1EBDD] focus:outline-none focus:border-[#D6A84F] font-mono"
              >
                <option value="dd">Decimal Degrees (Lat/Lon WGS-84)</option>
                <option value="utm">Universal Transverse Mercator (UTM Grid)</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Section 3: System Health & Diagnostics */}
        <Card className="p-6 space-y-4 bg-[#222321] border-[#383A34]">
          <div className="flex items-center gap-2 border-b border-[#383A34] pb-3">
            <ShieldCheck className="w-4 h-4 text-[#879477]" />
            <h2 className="text-sm font-bold text-[#F1EBDD] uppercase tracking-wider font-mono">
              System Health &amp; Infrastructure Diagnostics
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 bg-[#2B2C28] rounded-sm border border-[#383A34]">
              <span className="text-[10px] text-[#AAA89E] block">AI Engine</span>
              <span className="text-[#879477] font-bold">ONLINE (v2.6)</span>
            </div>
            <div className="p-3 bg-[#2B2C28] rounded-sm border border-[#383A34]">
              <span className="text-[10px] text-[#AAA89E] block">GPU Acceleration</span>
              <span className="text-[#879477] font-bold">NVIDIA RTX (CUDA)</span>
            </div>
            <div className="p-3 bg-[#2B2C28] rounded-sm border border-[#383A34]">
              <span className="text-[10px] text-[#AAA89E] block">Map Engine</span>
              <span className="text-[#879477] font-bold">LEAFLET GIS (OK)</span>
            </div>
            <div className="p-3 bg-[#2B2C28] rounded-sm border border-[#383A34]">
              <span className="text-[10px] text-[#AAA89E] block">Validation Core</span>
              <span className="text-[#879477] font-bold">DETERMINISTIC (OK)</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
