import React from 'react';
import { Activity } from 'lucide-react';

export const LiveTelemetryBar: React.FC = () => {
  const satelliteConstellation = [
    {
      name: 'Sentinel-2A MSI',
      agency: 'ESA / Copernicus',
      type: 'Optical Multispectral (13 Bands)',
      gsd: '10m GSD',
      status: 'Active Pass',
      region: 'Bengaluru NH-44 Corridor',
      coords: '13.12°N, 77.62°E',
      cloudCover: '1.2%',
    },
    {
      name: 'Sentinel-1 C-SAR',
      agency: 'ESA / Copernicus',
      type: 'Active Microwave Radar (VV+VH)',
      gsd: '10m Terrain Corrected',
      status: 'Cloud Penetrating',
      region: 'Assam Flood Reach',
      coords: '26.65°N, 93.18°E',
      cloudCover: 'All-Weather',
    },
    {
      name: 'Resourcesat-2A LISS-IV',
      agency: 'ISRO / DOS',
      type: 'High-Res VNIR Multispectral',
      gsd: '5.8m GSD',
      status: 'Calibrated Pass',
      region: 'Punjab Agricultural Belt',
      coords: '30.21°N, 74.95°E',
      cloudCover: '0.0%',
    },
    {
      name: 'Landsat-9 OLI-2',
      agency: 'NASA / USGS',
      type: 'Visible, NIR, SWIR, Thermal',
      gsd: '15m / 30m GSD',
      status: 'Synchronized',
      region: 'Deccan Regional Basin',
      coords: '17.38°N, 78.48°E',
      cloudCover: '2.8%',
    },
  ];

  return (
    <section className="bg-[#222321] border-b border-[#383A34] py-8 px-6">
      <div className="max-w-7xl mx-auto space-y-5">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#383A34] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-sm bg-[#879477]/15 border border-[#879477]/30 flex items-center justify-center text-[#879477]">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#F1EBDD] font-mono flex items-center gap-2">
                <span>Constellation Telemetry &amp; Earth Observation Feeds</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#879477]" />
              </h2>
              <p className="text-[10px] text-[#AAA89E] font-mono mt-0.5">
                Multi-Sensor Ingestion Stream &bull; Simulated Real-Time Feeds (SIH 2026 Evaluator Track)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#AAA89E]">
            <span className="text-[#879477] font-semibold">● 4 SENSORS STREAMING</span>
            <span>&bull;</span>
            <span>GDAL / COG INGEST ENGINE OK</span>
          </div>
        </div>

        {/* 4 Satellite Constellation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {satelliteConstellation.map(sat => (
            <div
              key={sat.name}
              className="p-3.5 bg-[#2B2C28] border border-[#383A34] rounded-panel space-y-2.5 hover:border-[#474942] transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-xs font-bold text-[#F1EBDD] font-mono">{sat.name}</div>
                  <div className="text-[10px] text-[#D6A84F] font-mono">{sat.agency}</div>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#222321] rounded-sm border border-[#383A34] text-[#879477]">
                  {sat.status}
                </span>
              </div>

              <div className="space-y-1 text-[10px] font-mono bg-[#222321] p-2 rounded-sm border border-[#383A34]/60">
                <div className="flex justify-between">
                  <span className="text-[#AAA89E]">Sensor Spec:</span>
                  <span className="text-[#F1EBDD] truncate max-w-[130px]">{sat.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#AAA89E]">Spatial GSD:</span>
                  <span className="text-[#879477] font-semibold">{sat.gsd}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#AAA89E]">Target Zone:</span>
                  <span className="text-[#D8C8A6] truncate max-w-[130px]">{sat.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#AAA89E]">Sub-Sat Lat/Lon:</span>
                  <span className="text-[#F1EBDD]">{sat.coords}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
