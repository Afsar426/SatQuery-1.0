import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import {
  Satellite,
  ArrowRight,
  Sparkles,
  Radio,
  Globe2,
  Compass,
  Activity,
  Play,
  ShieldCheck,
} from 'lucide-react';

interface SatelliteOrbitHeroProps {
  onLaunchMission: () => void;
  onExploreDemo: () => void;
}

export const SatelliteOrbitHero: React.FC<SatelliteOrbitHeroProps> = ({
  onLaunchMission,
  onExploreDemo,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 680;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Subtle star points (restrained, non-glaring)
    const numStars = 85;
    const stars = Array.from({ length: numStars }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.2 + 0.4,
      alpha: Math.random() * 0.4 + 0.2,
      speed: Math.random() * 0.02 + 0.01,
    }));

    const render = () => {
      t += 0.003;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // 1. Primary Canvas Background: Obsidian Graphite #171817
      ctx.fillStyle = '#171817';
      ctx.fillRect(0, 0, w, h);

      // 2. Subtle Coordinate Grid Lines (Aerospace Cartography)
      ctx.strokeStyle = 'rgba(170, 168, 158, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // 3. Drifting subtle starfield
      stars.forEach(star => {
        const starX = (star.x * w - t * star.speed * 30) % w;
        const actualX = starX < 0 ? starX + w : starX;
        const starY = star.y * h;

        ctx.fillStyle = `rgba(241, 235, 221, ${star.alpha * (0.6 + 0.4 * Math.sin(t * 1.5 + star.x * 8))})`;
        ctx.beginPath();
        ctx.arc(actualX, starY, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Partial Earth Horizon (Lower-right quadrant, desaturated natural Earth tones)
      const earthRadius = Math.max(w, h) * 0.98;
      const earthCenterX = w * 0.88;
      const earthCenterY = h * 1.62;

      // Subtle Atmospheric Limb (Desaturated pale cyan-sand glow)
      const atmoGrad = ctx.createRadialGradient(
        earthCenterX,
        earthCenterY,
        earthRadius * 0.88,
        earthCenterX,
        earthCenterY,
        earthRadius * 1.06
      );
      atmoGrad.addColorStop(0, 'rgba(135, 148, 119, 0.22)'); // Earth Sage
      atmoGrad.addColorStop(0.45, 'rgba(216, 200, 166, 0.09)'); // Pale Sand
      atmoGrad.addColorStop(0.85, 'rgba(214, 168, 79, 0.03)'); // Signal Amber tint
      atmoGrad.addColorStop(1, 'rgba(23, 24, 23, 0)');

      ctx.fillStyle = atmoGrad;
      ctx.beginPath();
      ctx.arc(earthCenterX, earthCenterY, earthRadius * 1.06, 0, Math.PI * 2);
      ctx.fill();

      // Earth Body Surface (Deep night oceanic surface with subtle terrain curvature)
      const earthGrad = ctx.createRadialGradient(
        earthCenterX,
        earthCenterY,
        earthRadius * 0.35,
        earthCenterX,
        earthCenterY,
        earthRadius
      );
      earthGrad.addColorStop(0, '#1C2321'); // Deep Charcoal Slate
      earthGrad.addColorStop(0.7, '#18201E');
      earthGrad.addColorStop(0.95, '#222B28');
      earthGrad.addColorStop(1, '#2F3A34'); // Earth Sage edge

      ctx.fillStyle = earthGrad;
      ctx.beginPath();
      ctx.arc(earthCenterX, earthCenterY, earthRadius, 0, Math.PI * 2);
      ctx.fill();

      // Earth Horizon Boundary Arc
      ctx.strokeStyle = 'rgba(135, 148, 119, 0.35)'; // Earth Sage
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Geographic Latitude Latent Arcs over Earth
      ctx.strokeStyle = 'rgba(216, 200, 166, 0.07)'; // Pale Sand
      ctx.lineWidth = 0.8;
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(earthCenterX, earthCenterY, earthRadius * (0.84 + i * 0.05), Math.PI * 1.12, Math.PI * 1.52);
        ctx.stroke();
      }

      // 5. Restrained Orbital Path: Signal Amber #D6A84F
      const orbitA = w * 0.54;
      const orbitB = h * 0.40;
      const orbitCenterX = w * 0.52;
      const orbitCenterY = h * 0.54;

      ctx.save();
      ctx.strokeStyle = 'rgba(214, 168, 79, 0.28)'; // Signal Amber thin line
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.ellipse(orbitCenterX, orbitCenterY, orbitA, orbitB, -Math.PI / 7.2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 6. Satellite Position along the Orbit
      const orbitProgress = (t * 0.32) % (Math.PI * 2);
      const angle = orbitProgress;
      const rot = -Math.PI / 7.2;

      const unrotatedX = orbitA * Math.cos(angle);
      const unrotatedY = orbitB * Math.sin(angle);

      const satX = orbitCenterX + (unrotatedX * Math.cos(rot) - unrotatedY * Math.sin(rot));
      const satY = orbitCenterY + (unrotatedX * Math.sin(rot) + unrotatedY * Math.cos(rot));

      // 7. Ground Scan Cone (Signal Amber to Earth Sage)
      const groundTargetX = satX + 110;
      const groundTargetY = satY + 150;

      const coneGrad = ctx.createLinearGradient(satX, satY, groundTargetX, groundTargetY);
      coneGrad.addColorStop(0, 'rgba(214, 168, 79, 0.22)');
      coneGrad.addColorStop(1, 'rgba(135, 148, 119, 0.02)');

      ctx.fillStyle = coneGrad;
      ctx.beginPath();
      ctx.moveTo(satX, satY);
      ctx.lineTo(groundTargetX - 40, groundTargetY);
      ctx.lineTo(groundTargetX + 40, groundTargetY);
      ctx.closePath();
      ctx.fill();

      // Surface Scan Line Target
      ctx.strokeStyle = 'rgba(135, 148, 119, 0.45)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(groundTargetX, groundTargetY, 40, 10, 0, 0, Math.PI * 2);
      ctx.stroke();

      // 8. Communication Pulse (Subtle Signal Ring in Signal Amber)
      const pulseCycle = (t * 1.5) % 1;
      const pulseRadius = pulseCycle * 55 + 8;
      ctx.strokeStyle = `rgba(214, 168, 79, ${(1 - pulseCycle) * 0.5})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(satX, satY, pulseRadius, 0, Math.PI * 2);
      ctx.stroke();

      // 9. Realistic Satellite Model (Spacecraft Instrumentation)
      ctx.save();
      ctx.translate(satX, satY);
      ctx.rotate(rot + Math.PI / 4 + Math.sin(t * 1.2) * 0.05);

      // Central Satellite Bus (Gold MLI foil finish)
      ctx.fillStyle = '#D6A84F';
      ctx.strokeStyle = '#B38836';
      ctx.lineWidth = 1;
      ctx.fillRect(-7, -9, 14, 18);
      ctx.strokeRect(-7, -9, 14, 18);

      // Sensor Optics Lens
      ctx.fillStyle = '#2B2C28';
      ctx.beginPath();
      ctx.arc(0, 9, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Solar Array Wings (Left & Right Photovoltaic panels in Charcoal/Sand)
      const panelWidth = 28;
      const panelHeight = 10;

      // Left Panel
      ctx.fillStyle = '#222321';
      ctx.strokeStyle = '#879477';
      ctx.lineWidth = 0.8;
      ctx.fillRect(-7 - panelWidth, -5, panelWidth, panelHeight);
      ctx.strokeRect(-7 - panelWidth, -5, panelWidth, panelHeight);

      // Right Panel
      ctx.fillRect(7, -5, panelWidth, panelHeight);
      ctx.strokeRect(7, -5, panelWidth, panelHeight);

      // Grid dividers on panels
      ctx.strokeStyle = 'rgba(216, 200, 166, 0.4)';
      ctx.beginPath();
      ctx.moveTo(-7 - panelWidth / 2, -5);
      ctx.lineTo(-7 - panelWidth / 2, 5);
      ctx.moveTo(7 + panelWidth / 2, -5);
      ctx.lineTo(7 + panelWidth / 2, 5);
      ctx.stroke();

      // Communications Dish
      ctx.strokeStyle = '#D8C8A6';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, -11, 5, Math.PI * 0.2, Math.PI * 0.8);
      ctx.stroke();

      ctx.restore();

      // 10. Monospace Telemetry Instrumentation Labels pinned near satellite
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = '#AAA89E';
      ctx.fillText('ORBITAL PASS // SENTINEL-2', satX + 20, satY - 12);
      ctx.fillStyle = '#D6A84F';
      ctx.fillText('ALT 684 KM | INC 98.2°', satX + 20, satY + 1);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="relative min-h-[660px] md:min-h-[740px] flex items-center overflow-hidden border-b border-[#383A34]">
      {/* Canvas Orbital Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28 w-full">
        <div className="max-w-2xl space-y-6">
          {/* Mission Crest & Telemetry Badge */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D6A84F] bg-[#D6A84F]/10 border border-[#D6A84F]/30 px-3 py-1 rounded-sm font-bold flex items-center gap-1.5">
              <Satellite className="w-3.5 h-3.5 text-[#D6A84F]" />
              ISRO SIH26167 &bull; SPACE TECHNOLOGY
            </span>
            <span className="text-[11px] font-mono text-[#AAA89E] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#879477]" />
              EO SENSOR ONLINE &bull; 24.6134° N | 73.8478° E
            </span>
          </div>

          {/* Main Headline: Short, Confident, Memorable */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#F1EBDD] tracking-tight leading-[1.1]">
              Ask Earth.{' '}
              <span className="text-[#D6A84F]">Understand Change.</span>
            </h1>
            <p className="text-xs md:text-sm font-mono text-[#879477] uppercase tracking-wider font-semibold">
              Autonomous Remote-Sensing Vision-Language Agent
            </p>
          </div>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-[#AAA89E] leading-relaxed font-normal">
            SatQuery AI transforms high-resolution satellite imagery into grounded Earth intelligence.
            Ask complex natural-language questions across single optical scenes, bi-temporal change epochs, and cloud-penetrating
            radar SAR acquisitions—orchestrated through autonomous agentic workflows with calibrated evidence.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={onLaunchMission}
            >
              Launch Mission
            </Button>

            <Button
              variant="secondary"
              size="lg"
              icon={<Compass className="w-4 h-4 text-[#D8C8A6]" />}
              onClick={onExploreDemo}
            >
              Explore Earth
            </Button>
          </div>

          {/* Tiny Instrumentation Telemetry Modules */}
          <div className="pt-6 border-t border-[#383A34] grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-2.5 bg-[#222321]/90 rounded-sm border border-[#383A34]">
              <span className="text-[9px] text-[#AAA89E] block uppercase">Orbital Pass</span>
              <span className="text-[#F1EBDD] font-bold">Sun-Sync (LEO)</span>
            </div>
            <div className="p-2.5 bg-[#222321]/90 rounded-sm border border-[#383A34]">
              <span className="text-[9px] text-[#AAA89E] block uppercase">Altitude &amp; Inc</span>
              <span className="text-[#D6A84F] font-bold">684 km &bull; 98.2°</span>
            </div>
            <div className="p-2.5 bg-[#222321]/90 rounded-sm border border-[#383A34]">
              <span className="text-[9px] text-[#AAA89E] block uppercase">Spatial GSD</span>
              <span className="text-[#879477] font-bold">10.0m Sentinel</span>
            </div>
            <div className="p-2.5 bg-[#222321]/90 rounded-sm border border-[#383A34]">
              <span className="text-[9px] text-[#AAA89E] block uppercase">Signal State</span>
              <span className="text-[#879477] font-bold">● LOCKED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
