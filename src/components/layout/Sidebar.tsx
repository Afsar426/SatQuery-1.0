import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  FolderKanban,
  Cpu,
  BarChart2,
  Workflow,
  FileText,
  CheckSquare2,
  Boxes,
  Settings,
  Satellite,
  ShieldCheck,
  Globe2,
  Sparkles,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentRoute, setCurrentRoute } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Mission Overview', icon: LayoutDashboard },
    { id: 'analysis', label: 'GeoAI Workstation', icon: Cpu, badge: 'Active' },
    { id: 'projects', label: 'Projects & Imagery', icon: FolderKanban },
    { id: 'results', label: 'Intelligence Archive', icon: BarChart2 },
    { id: 'agent', label: 'Agent Monitor', icon: Workflow },
    { id: 'reports', label: 'Mission Reports', icon: FileText },
    { id: 'evaluation', label: 'Model Benchmarks', icon: CheckSquare2 },
    { id: 'models', label: 'Model Registry', icon: Boxes },
    { id: 'settings', label: 'GIS & Preferences', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#222321] border-r border-[#383A34] flex flex-col justify-between select-none h-screen flex-shrink-0 z-30">
      {/* Brand & Organization Header */}
      <div>
        <div className="p-4 border-b border-[#383A34] flex items-center justify-between bg-[#171817]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-[#2B2C28] border border-[#D6A84F]/40 flex items-center justify-center text-[#D6A84F]">
              <Satellite className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-bold tracking-wider text-[#F1EBDD]">SATQUERY</h1>
                <span className="text-[9px] font-mono font-semibold px-1 py-0.2 bg-[#D6A84F]/15 text-[#D6A84F] border border-[#D6A84F]/30 rounded-sm">
                  ISRO
                </span>
              </div>
              <p className="text-[10px] text-[#AAA89E] font-mono tracking-tight mt-0.5">
                Dept. of Space &bull; SIH 2026
              </p>
            </div>
          </div>
        </div>

        {/* SpaceTech Landing Switcher Button */}
        <div className="p-3 border-b border-[#383A34]">
          <button
            onClick={() => setCurrentRoute('landing')}
            className="w-full flex items-center justify-between p-2 rounded-sm bg-[#2B2C28] border border-[#383A34] hover:border-[#D6A84F]/50 text-xs font-mono text-[#AAA89E] hover:text-[#F1EBDD] transition-colors group"
          >
            <span className="flex items-center gap-2">
              <Globe2 className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span>SpaceTech Landing</span>
            </span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-sm bg-[#222321] text-[#D6A84F] border border-[#383A34] group-hover:border-[#D6A84F]/40">
              Public
            </span>
          </button>
        </div>

        {/* Autonomous Mission Tag */}
        <div className="px-3 pt-3 pb-1">
          <div className="bg-[#2B2C28] border border-[#383A34] rounded-sm px-2.5 py-1.5 flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#AAA89E] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D6A84F]" /> Remote Sensing Agent
            </span>
            <span className="text-[10px] text-[#879477] font-bold">● L2A</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#78766D] px-2 py-1">
            Mission Workstation
          </div>

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentRoute(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-sm text-xs transition-colors relative ${
                  isActive
                    ? 'bg-[#2B2C28] text-[#F1EBDD] font-semibold border-l-2 border-[#D6A84F]'
                    : 'text-[#AAA89E] hover:text-[#F1EBDD] hover:bg-[#2B2C28]/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D6A84F]' : 'text-[#AAA89E]'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-sm bg-[#D6A84F]/15 text-[#D6A84F] border border-[#D6A84F]/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info & Telemetry Status */}
      <div className="p-3 border-t border-[#383A34] bg-[#171817] space-y-2">
        <div className="p-2.5 bg-[#2B2C28] border border-[#383A34] rounded-sm text-[11px] font-mono text-[#AAA89E] space-y-1">
          <div className="flex items-center justify-between text-[#F1EBDD] font-semibold">
            <span>ISRO SAC Pipeline</span>
            <span className="text-[#879477]">ONLINE</span>
          </div>
          <div className="text-[10px] text-[#AAA89E]">
            EPSG:32643 &bull; UTM 43N &bull; 10m GSD
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-[#AAA89E] px-1">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#879477]" /> SIH26167
          </span>
          <span>v4.2-PROD</span>
        </div>
      </div>
    </aside>
  );
};
