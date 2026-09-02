import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sliders,
  Eye,
  Activity,
  Compass,
  MapPin,
  Ruler,
  Square,
  Crosshair,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const GeoMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const vectorLayerGroupRef = useRef<L.LayerGroup | null>(null);

  const {
    currentProject,
    layers,
    activeResult,
    mapCenter,
    mapZoom,
    setMapCenter,
    setMapZoom,
    mapMode,
    setMapMode,
  } = useApp();

  const [swipePosition, setSwipePosition] = useState<number>(50);
  const [flickerState, setFlickerState] = useState<'t1' | 't2'>('t1');
  const [mouseCoords, setMouseCoords] = useState<string>('13.1250° N, 77.6250° E');
  const [activeTool, setActiveTool] = useState<'pan' | 'measure' | 'box'>('pan');

  // Flicker interval timer
  useEffect(() => {
    if (mapMode !== 'flicker') return;
    const interval = setInterval(() => {
      setFlickerState(prev => (prev === 't1' ? 't2' : 't1'));
    }, 800);
    return () => clearInterval(interval);
  }, [mapMode]);

  // Leaflet Map Initialization
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: mapCenter,
      zoom: mapZoom,
      zoomControl: false,
      attributionControl: false,
    });

    // High-Resolution Esri World Imagery (Standard true-color satellite tiles)
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 19,
        subdomains: ['server', 'services'],
      }
    ).addTo(map);

    // CartoDB Dark Labels Overlay (Clear geographic street and city labels)
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 19,
        subdomains: 'abcd',
        opacity: 0.85,
      }
    ).addTo(map);

    const vectorGroup = L.layerGroup().addTo(map);
    vectorLayerGroupRef.current = vectorGroup;

    map.on('mousemove', (e: L.LeafletMouseEvent) => {
      const lat = e.latlng.lat.toFixed(4);
      const lng = e.latlng.lng.toFixed(4);
      setMouseCoords(`${lat}° N, ${lng}° E`);
    });

    map.on('moveend', () => {
      const c = map.getCenter();
      setMapCenter([c.lat, c.lng]);
      setMapZoom(map.getZoom());
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update map center/zoom on state changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const curr = mapInstanceRef.current.getCenter();
    if (curr.lat !== mapCenter[0] || curr.lng !== mapCenter[1]) {
      mapInstanceRef.current.flyTo(mapCenter, mapZoom, { duration: 1.2 });
    }
  }, [mapCenter, mapZoom]);

  // Render Vector Evidence Overlays
  useEffect(() => {
    if (!vectorLayerGroupRef.current || !mapInstanceRef.current) return;
    vectorLayerGroupRef.current.clearLayers();

    if (!activeResult || !activeResult.evidenceItems) return;

    activeResult.evidenceItems.forEach(ev => {
      // Grounding Box & Segmentation Mask Overlay (Signal Amber / Accent)
      if (ev.type === 'grounding_box' || ev.type === 'segmentation_mask') {
        const deltaLat = 0.012;
        const deltaLng = 0.015;
        const bounds: L.LatLngBoundsExpression = [
          [ev.centerCoords[0] - deltaLat, ev.centerCoords[1] - deltaLng],
          [ev.centerCoords[0] + deltaLat, ev.centerCoords[1] + deltaLng],
        ];

        const rect = L.rectangle(bounds, {
          color: ev.colorCode || '#D6A84F',
          weight: 2,
          opacity: 0.9,
          fillColor: ev.colorCode || '#D6A84F',
          fillOpacity: 0.15,
          dashArray: '4, 4',
        });

        rect.bindPopup(`
          <div class="p-2 font-mono">
            <div class="text-[10px] text-[#D6A84F] font-bold uppercase tracking-wider">GROUNDED TARGET</div>
            <div class="text-xs text-[#F1EBDD] font-bold mt-0.5">${ev.title}</div>
            <div class="text-[10px] text-[#AAA89E] mt-1">${ev.description}</div>
          </div>
        `);

        rect.addTo(vectorLayerGroupRef.current!);
      }

      // Change Polygons Overlay (Muted Terracotta #B76552)
      if (ev.type === 'change_map' || ev.type === 'optical_sar_overlay') {
        const [cLat, cLng] = ev.centerCoords;
        const polyCoords: [number, number][] = [
          [cLat - 0.008, cLng - 0.01],
          [cLat - 0.004, cLng + 0.012],
          [cLat + 0.009, cLng + 0.008],
          [cLat + 0.006, cLng - 0.009],
        ];

        const poly = L.polygon(polyCoords, {
          color: ev.colorCode || '#B76552',
          weight: 2,
          opacity: 0.95,
          fillColor: ev.colorCode || '#B76552',
          fillOpacity: 0.35,
        });

        poly.bindPopup(`
          <div class="p-2 font-mono">
            <div class="text-[10px] text-[#B76552] font-bold uppercase tracking-wider">DETECTED SURFACE CONVERSION</div>
            <div class="text-xs text-[#F1EBDD] font-bold mt-0.5">${ev.title}</div>
            <div class="text-[10px] text-[#AAA89E] mt-1">${ev.description}</div>
          </div>
        `);

        poly.addTo(vectorLayerGroupRef.current!);
      }
    });
  }, [activeResult, layers]);

  return (
    <div className="relative w-full h-full bg-[#171817] overflow-hidden select-none">
      {/* The Leaflet Canvas Map */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Swipe Mode Split Overlay */}
      {mapMode === 'swipe' && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-[#D6A84F] shadow-panel"
            style={{ left: `${swipePosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#222321] border border-[#D6A84F] flex items-center justify-center text-[#D6A84F] text-xs font-mono font-bold shadow-panel pointer-events-auto cursor-ew-resize">
              ↔
            </div>
          </div>

          <div className="absolute top-4 left-4 bg-[#222321]/90 border border-[#383A34] px-2.5 py-1 rounded-sm text-xs font-mono text-[#879477] backdrop-blur-sm">
            T1: BASELINE (2024)
          </div>
          <div className="absolute top-4 right-4 bg-[#222321]/90 border border-[#383A34] px-2.5 py-1 rounded-sm text-xs font-mono text-[#B76552] backdrop-blur-sm">
            T2: COMPARISON (2026)
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={swipePosition}
            onChange={e => setSwipePosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 pointer-events-auto cursor-ew-resize"
          />
        </div>
      )}

      {/* Flicker Mode Status Pill */}
      {mapMode === 'flicker' && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-[#222321]/95 border border-[#383A34] px-4 py-1.5 rounded-sm text-xs font-mono flex items-center gap-2.5 shadow-panel">
          <span className="w-2 h-2 rounded-full bg-[#D6A84F] animate-pulse" />
          <span className="text-[#AAA89E]">FLICKER COMPARISON:</span>
          <span className={`font-bold ${flickerState === 't1' ? 'text-[#879477]' : 'text-[#B76552]'}`}>
            {flickerState === 't1' ? 'T1: 2024-03-15' : 'T2: 2026-02-28'}
          </span>
        </div>
      )}

      {/* Top Floating GIS Mode & Interaction Toolbar */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-[#222321]/95 border border-[#383A34] p-1 rounded-panel shadow-panel backdrop-blur-md">
        <button
          onClick={() => setMapMode('natural')}
          className={`px-2.5 py-1 rounded-sm text-xs font-mono transition-colors ${
            mapMode === 'natural'
              ? 'bg-[#2B2C28] text-[#D6A84F] font-bold border border-[#D6A84F]/40 shadow-subtle'
              : 'text-[#AAA89E] hover:text-[#F1EBDD] hover:bg-[#2B2C28]/60'
          }`}
        >
          Natural
        </button>

        <button
          onClick={() => setMapMode('swipe')}
          className={`px-2.5 py-1 rounded-sm text-xs font-mono transition-colors flex items-center gap-1.5 ${
            mapMode === 'swipe'
              ? 'bg-[#2B2C28] text-[#D6A84F] font-bold border border-[#D6A84F]/40 shadow-subtle'
              : 'text-[#AAA89E] hover:text-[#F1EBDD] hover:bg-[#2B2C28]/60'
          }`}
        >
          <Sliders className="w-3 h-3" />
          <span>Swipe Split</span>
        </button>

        <button
          onClick={() => setMapMode('flicker')}
          className={`px-2.5 py-1 rounded-sm text-xs font-mono transition-colors flex items-center gap-1.5 ${
            mapMode === 'flicker'
              ? 'bg-[#2B2C28] text-[#D6A84F] font-bold border border-[#D6A84F]/40 shadow-subtle'
              : 'text-[#AAA89E] hover:text-[#F1EBDD] hover:bg-[#2B2C28]/60'
          }`}
        >
          <Eye className="w-3 h-3" />
          <span>Flicker (800ms)</span>
        </button>

        <div className="h-4 w-px bg-[#383A34] mx-0.5" />

        {/* Measurement & AOI Tools */}
        <button
          onClick={() => setActiveTool(activeTool === 'measure' ? 'pan' : 'measure')}
          className={`p-1.5 rounded-sm text-xs transition-colors ${
            activeTool === 'measure'
              ? 'bg-[#2B2C28] text-[#D6A84F]'
              : 'text-[#AAA89E] hover:text-[#F1EBDD] hover:bg-[#2B2C28]'
          }`}
          title="Measure Distance & Area"
        >
          <Ruler className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setActiveTool(activeTool === 'box' ? 'pan' : 'box')}
          className={`p-1.5 rounded-sm text-xs transition-colors ${
            activeTool === 'box'
              ? 'bg-[#2B2C28] text-[#D6A84F]'
              : 'text-[#AAA89E] hover:text-[#F1EBDD] hover:bg-[#2B2C28]'
          }`}
          title="Draw Area of Interest (AOI)"
        >
          <Square className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right Floating Map Controls */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-1 bg-[#222321]/95 border border-[#383A34] p-1 rounded-panel shadow-panel backdrop-blur-md">
        <button
          onClick={() => mapInstanceRef.current?.zoomIn()}
          className="p-1.5 rounded-sm text-[#AAA89E] hover:text-[#F1EBDD] hover:bg-[#2B2C28] transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => mapInstanceRef.current?.zoomOut()}
          className="p-1.5 rounded-sm text-[#AAA89E] hover:text-[#F1EBDD] hover:bg-[#2B2C28] transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.setView(currentProject.centerCoordinates, currentProject.zoomLevel);
            }
          }}
          className="p-1.5 rounded-sm text-[#AAA89E] hover:text-[#F1EBDD] hover:bg-[#2B2C28] transition-colors"
          title="Reset Extent"
        >
          <Crosshair className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Telemetry & Coordinate Bar */}
      <div className="absolute bottom-2 left-2 right-2 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left: Crosshair Coordinates & Spatial Scale */}
        <div className="bg-[#222321]/95 border border-[#383A34] px-3 py-1 rounded-sm text-[10px] font-mono text-[#AAA89E] shadow-panel backdrop-blur-md flex items-center gap-3 pointer-events-auto">
          <span className="flex items-center gap-1.5 text-[#F1EBDD]">
            <Compass className="w-3 h-3 text-[#D6A84F]" /> {mouseCoords}
          </span>
          <span className="text-[#383A34]">|</span>
          <span>EPSG:32643 (UTM 43N)</span>
          <span className="text-[#383A34]">|</span>
          <span className="text-[#879477]">10m GSD</span>
          <span className="text-[#383A34]">|</span>
          <span>Zoom {mapZoom}</span>
        </div>

        {/* Right: Cartographic Scale & Active Evidence Status */}
        <div className="bg-[#222321]/95 border border-[#383A34] px-3 py-1 rounded-sm text-[10px] font-mono text-[#AAA89E] shadow-panel backdrop-blur-md flex items-center gap-2 pointer-events-auto">
          <span className="text-[#879477]">● TILES CACHED</span>
          <span className="text-[#383A34]">|</span>
          <span>Esri World Imagery WMTS</span>
        </div>
      </div>
    </div>
  );
};
