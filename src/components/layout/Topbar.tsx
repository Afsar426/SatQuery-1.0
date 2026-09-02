import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  Sparkles,
  ChevronDown,
  Folder,
  Plus,
  PlayCircle,
  AlertTriangle,
  User,
  Globe2,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const Topbar: React.FC = () => {
  const {
    projects,
    currentProject,
    setCurrentProject,
    activeResult,
    setCurrentRoute,
    loadDemoScenario,
    loadBlockedScenario,
    notifications,
    dismissNotification,
  } = useApp();

  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [scenarioDropdownOpen, setScenarioDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const activeModeLabel = activeResult?.modeLabel || currentProject.defaultMode;

  return (
    <header className="h-14 bg-[#222321] border-b border-[#383A34] px-5 flex items-center justify-between z-20 flex-shrink-0">
      {/* Left: Project Selector & SpaceTech Landing Quick Switch */}
      <div className="flex items-center gap-3">
        {/* Switch back to Landing Page */}
        <button
          onClick={() => setCurrentRoute('landing')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-[#2B2C28] border border-[#383A34] hover:border-[#D6A84F]/50 text-xs font-mono text-[#AAA89E] hover:text-[#D6A84F] transition-colors"
          title="Return to Public SpaceTech Landing"
        >
          <Globe2 className="w-3.5 h-3.5 text-[#D6A84F]" />
          <span className="hidden sm:inline">Landing</span>
        </button>

        <div className="h-4 w-px bg-[#383A34]" />

        {/* Project Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#2B2C28] border border-[#383A34] hover:border-[#474942] text-[#F1EBDD] text-xs font-medium transition-colors"
          >
            <Folder className="w-3.5 h-3.5 text-[#D6A84F]" />
            <div className="text-left">
              <span className="font-semibold text-[#F1EBDD]">{currentProject.name}</span>
            </div>
            <ChevronDown className="w-3 h-3 text-[#AAA89E] ml-0.5" />
          </button>

          {projectDropdownOpen && (
            <div className="absolute top-full left-0 mt-1.5 w-72 bg-[#2B2C28] border border-[#383A34] rounded-panel shadow-panel p-2 z-50">
              <div className="text-[10px] uppercase font-mono tracking-wider text-[#AAA89E] px-2 py-1">
                Select Active Geodatabase
              </div>
              <div className="space-y-0.5 mt-1">
                {projects.map(proj => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      setCurrentProject(proj);
                      setProjectDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-sm text-xs transition-colors flex items-start gap-2.5 ${
                      proj.id === currentProject.id
                        ? 'bg-[#222321] text-[#D6A84F] font-medium border border-[#383A34]'
                        : 'text-[#AAA89E] hover:text-[#F1EBDD] hover:bg-[#222321]/60'
                    }`}
                  >
                    <Folder className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-[#F1EBDD]">{proj.name}</div>
                      <div className="text-[10px] text-[#AAA89E] truncate max-w-[200px]">
                        {proj.regionName}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Auto-detected Mode Badge */}
        <div className="hidden lg:flex items-center gap-2">
          <Badge variant="amber" size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
            {activeModeLabel}
          </Badge>
        </div>
      </div>

      {/* Right: SIH Demo Scenarios, Notifications & Quick Actions */}
      <div className="flex items-center gap-2.5">
        {/* SIH 2026 Interactive Demo Scenarios Menu (Signal Amber Theme) */}
        <div className="relative">
          <button
            onClick={() => setScenarioDropdownOpen(!scenarioDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#D6A84F]/10 border border-[#D6A84F]/30 text-[#D6A84F] hover:bg-[#D6A84F]/20 text-xs font-semibold transition-colors"
          >
            <PlayCircle className="w-3.5 h-3.5 text-[#D6A84F]" />
            <span>SIH 2026 Demo Scenarios</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {scenarioDropdownOpen && (
            <div className="absolute top-full right-0 mt-1.5 w-80 bg-[#2B2C28] border border-[#383A34] rounded-panel shadow-panel p-2 z-50">
              <div className="text-[10px] uppercase font-mono tracking-wider text-[#D6A84F] px-2 py-1 flex items-center justify-between border-b border-[#383A34] pb-1.5">
                <span>Select SIH Evaluation Scenario</span>
                <span className="text-[9px] bg-[#D6A84F]/15 px-1.5 py-0.5 rounded text-[#D6A84F] font-bold">5 SCENARIOS</span>
              </div>
              <div className="space-y-1 mt-1.5">
                <button
                  onClick={() => {
                    loadDemoScenario('scenario_bitemporal_change');
                    setCurrentRoute('analysis');
                    setScenarioDropdownOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-sm text-xs hover:bg-[#222321] text-[#AAA89E] hover:text-[#F1EBDD]"
                >
                  <div className="font-semibold text-[#F1EBDD]">1. Bi-Temporal Change Analysis</div>
                  <div className="text-[11px] text-[#AAA89E]">"What changed between these two dates?"</div>
                </button>

                <button
                  onClick={() => {
                    loadDemoScenario('scenario_bitemporal_vqa');
                    setCurrentRoute('analysis');
                    setScenarioDropdownOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-sm text-xs hover:bg-[#222321] text-[#AAA89E] hover:text-[#F1EBDD]"
                >
                  <div className="font-semibold text-[#F1EBDD]">2. Change-Based VQA (Polarity)</div>
                  <div className="text-[11px] text-[#AAA89E]">"Has the built-up area increased?"</div>
                </button>

                <button
                  onClick={() => {
                    loadDemoScenario('scenario_grounding');
                    setCurrentRoute('analysis');
                    setScenarioDropdownOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-sm text-xs hover:bg-[#222321] text-[#AAA89E] hover:text-[#F1EBDD]"
                >
                  <div className="font-semibold text-[#F1EBDD]">3. Visual Region Grounding</div>
                  <div className="text-[11px] text-[#AAA89E]">"Highlight the water body."</div>
                </button>

                <button
                  onClick={() => {
                    loadDemoScenario('scenario_single_vqa');
                    setCurrentRoute('analysis');
                    setScenarioDropdownOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-sm text-xs hover:bg-[#222321] text-[#AAA89E] hover:text-[#F1EBDD]"
                >
                  <div className="font-semibold text-[#F1EBDD]">4. Single-Image VQA</div>
                  <div className="text-[11px] text-[#AAA89E]">"What major land-cover types are visible?"</div>
                </button>

                <button
                  onClick={() => {
                    loadDemoScenario('scenario_optical_sar');
                    setCurrentRoute('analysis');
                    setScenarioDropdownOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-sm text-xs hover:bg-[#222321] text-[#AAA89E] hover:text-[#F1EBDD]"
                >
                  <div className="font-semibold text-[#F1EBDD]">5. Optical + SAR Cross-Modal Fusion</div>
                  <div className="text-[11px] text-[#AAA89E]">Cloud-penetrating flood inundation mapping</div>
                </button>

                <div className="border-t border-[#383A34] my-1 pt-1">
                  <button
                    onClick={() => {
                      loadBlockedScenario();
                      setCurrentRoute('projects');
                      setScenarioDropdownOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-sm text-xs bg-[#B76552]/15 hover:bg-[#B76552]/25 text-[#B76552] border border-[#B76552]/40"
                  >
                    <div className="font-semibold flex items-center gap-1.5 text-[#B76552]">
                      <AlertTriangle className="w-3.5 h-3.5" /> Refusal Guardrail Test
                    </div>
                    <div className="text-[10px] text-[#AAA89E]">
                      Upload incompatible extents &rarr; Blocks workflow
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* New Query CTA */}
        <Button
          variant="primary"
          size="sm"
          icon={<Plus className="w-3.5 h-3.5" />}
          onClick={() => setCurrentRoute('analysis')}
        >
          New Query
        </Button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
            className="p-1.5 rounded-sm bg-[#2B2C28] border border-[#383A34] hover:bg-[#222321] text-[#AAA89E] hover:text-[#F1EBDD] transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#D6A84F]" />
            )}
          </button>

          {notifDropdownOpen && (
            <div className="absolute top-full right-0 mt-1.5 w-80 bg-[#2B2C28] border border-[#383A34] rounded-panel shadow-panel p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-[#383A34]">
                <span className="text-xs font-semibold text-[#F1EBDD]">System Telemetry Log</span>
                <span className="text-[10px] text-[#AAA89E]">{notifications.length} notices</span>
              </div>
              <div className="space-y-1.5 mt-2 max-h-60 overflow-y-auto">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    className="p-2 bg-[#222321] border border-[#383A34] rounded-sm text-xs relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#F1EBDD]">{n.title}</span>
                      <span className="text-[10px] text-[#AAA89E]">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-[#AAA89E] mt-1">{n.detail}</p>
                    <button
                      onClick={() => dismissNotification(n.id)}
                      className="text-[10px] text-[#D6A84F] hover:underline mt-1 block"
                    >
                      Dismiss
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User / Mission Analyst Tag */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#383A34]">
          <div className="w-7 h-7 rounded-sm bg-[#2B2C28] border border-[#383A34] flex items-center justify-center text-[#AAA89E]">
            <User className="w-3.5 h-3.5" />
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-semibold text-[#F1EBDD] leading-tight">ISRO GeoAI Analyst</div>
            <div className="text-[10px] text-[#AAA89E] font-mono">SAC &bull; Mission Control</div>
          </div>
        </div>
      </div>
    </header>
  );
};
