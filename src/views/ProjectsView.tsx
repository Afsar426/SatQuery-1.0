import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { uploadService } from '../services/uploadService';
import {
  Folder,
  Plus,
  Upload,
  ShieldCheck,
  Radio,
  FileImage,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ModalityType, TemporalType } from '../types';

export const ProjectsView: React.FC = () => {
  const {
    projects,
    currentProject,
    setCurrentProject,
    setCurrentRoute,
    setValidationDrawerOpen,
    validationResult,
    refreshValidation,
    loadBlockedScenario,
  } = useApp();

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedModality, setSelectedModality] = useState<ModalityType>('optical');
  const [selectedTemporal, setSelectedTemporal] = useState<TemporalType>('t1');

  const [newProjName, setNewProjName] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjTheme, setNewProjTheme] = useState<'Urban' | 'Agriculture' | 'Water' | 'Disaster'>('Urban');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    setIsUploading(true);
    try {
      const asset = await uploadService.processUpload(file, selectedModality, selectedTemporal);
      currentProject.images.push(asset);
      refreshValidation();
      setIsUploading(false);
      setUploadModalOpen(false);
    } catch {
      setIsUploading(false);
    }
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName.trim()) return;

    const newProj = {
      id: `proj-${Date.now()}`,
      name: newProjName,
      description: newProjDesc || 'Custom remote sensing study project.',
      theme: newProjTheme,
      regionName: 'Custom Geographic Region',
      centerCoordinates: [13.125, 77.625] as [number, number],
      zoomLevel: 13,
      defaultMode: 'SINGLE_VQA' as const,
      images: [],
      validation: {
        status: 'READY' as const,
        summary: 'Initialized fresh project space.',
        checks: [],
        timestamp: new Date().toISOString(),
      },
      recentAnalyses: [],
      createdAt: new Date().toISOString(),
    };

    projects.unshift(newProj);
    setCurrentProject(newProj);
    setNewProjectModalOpen(false);
    setNewProjName('');
    setNewProjDesc('');
  };

  const isBlocked = validationResult.status === 'ANALYSIS BLOCKED';

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 pb-16 bg-[#171817]">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#383A34] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-[#F1EBDD] tracking-tight">
            Projects &amp; Remote Sensing Geodatabase
          </h1>
          <p className="text-xs text-[#AAA89E] mt-1">
            Manage satellite datasets, inspect GeoTIFF/SAR headers, and verify radiometric and spatial compatibility.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            icon={<AlertTriangle className="w-3.5 h-3.5 text-[#B76552]" />}
            onClick={loadBlockedScenario}
          >
            Test Guardrail Refusal
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => setNewProjectModalOpen(true)}
          >
            New Project
          </Button>
        </div>
      </div>

      {/* Main 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Projects List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#D6A84F] flex items-center justify-between px-1 font-mono">
            <span>Active Geodatabases ({projects.length})</span>
          </div>

          <div className="space-y-2">
            {projects.map(proj => {
              const isSelected = proj.id === currentProject.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => setCurrentProject(proj)}
                  className={`p-3.5 rounded-sm border cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#2B2C28] border-[#D6A84F]/50 shadow-subtle'
                      : 'bg-[#222321] border-[#383A34] hover:border-[#474942] hover:bg-[#2B2C28]/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#F1EBDD] flex items-center gap-2">
                      <Folder className={`w-3.5 h-3.5 ${isSelected ? 'text-[#D6A84F]' : 'text-[#AAA89E]'}`} />
                      {proj.name}
                    </span>
                    <Badge variant={isSelected ? 'amber' : 'neutral'} size="sm">
                      {proj.theme}
                    </Badge>
                  </div>

                  <p className="text-[11px] text-[#AAA89E] line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-[#383A34]/50 flex items-center justify-between text-[10px] font-mono text-[#AAA89E]">
                    <span>{proj.images.length} Imagery Asset(s)</span>
                    <span className="text-[#879477]">{proj.defaultMode}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Project Details & Assets (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          <Card className="p-6 space-y-5 bg-[#222321] border-[#383A34]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#383A34] pb-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-xl font-bold text-[#F1EBDD]">{currentProject.name}</h2>
                  <Badge variant="amber">{currentProject.theme}</Badge>
                </div>
                <p className="text-xs text-[#AAA89E] mt-1">{currentProject.regionName}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<Upload className="w-3.5 h-3.5 text-[#D6A84F]" />}
                  onClick={() => setUploadModalOpen(true)}
                >
                  Upload Imagery
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  icon={<Sparkles className="w-3.5 h-3.5" />}
                  onClick={() => setCurrentRoute('analysis')}
                >
                  Open in Workstation
                </Button>
              </div>
            </div>

            {/* Validation Banner for this Project */}
            <div
              className={`p-3.5 rounded-sm border flex items-center justify-between gap-4 ${
                isBlocked
                  ? 'bg-[#B76552]/15 border-[#B76552]/40 text-[#F1EBDD]'
                  : 'bg-[#879477]/15 border-[#879477]/40 text-[#F1EBDD]'
              }`}
            >
              <div className="flex items-start gap-3">
                {isBlocked ? (
                  <XCircle className="w-4 h-4 text-[#B76552] mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-[#879477] mt-0.5" />
                )}
                <div>
                  <div className="font-bold text-xs tracking-wide font-mono">
                    INPUT VALIDATION: {validationResult.status}
                  </div>
                  <p className="text-[11px] opacity-90 mt-0.5 text-[#AAA89E]">
                    {validationResult.summary}
                  </p>
                  {validationResult.refusalReason && (
                    <p className="text-[11px] font-mono text-[#B76552] mt-1">
                      Reason: {validationResult.refusalReason}
                    </p>
                  )}
                </div>
              </div>

              <Button
                variant="secondary"
                size="sm"
                icon={<ShieldCheck className="w-3.5 h-3.5 text-[#D6A84F]" />}
                onClick={() => setValidationDrawerOpen(true)}
              >
                Deep Validation
              </Button>
            </div>

            {/* Image Assets Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D6A84F] flex items-center gap-1.5 font-mono">
                  <Layers className="w-4 h-4" /> Loaded Satellite Imagery Assets ({currentProject.images.length})
                </span>
                <span className="text-[10px] text-[#AAA89E] font-mono">GeoTIFF / COG / SAR</span>
              </div>

              {currentProject.images.length === 0 ? (
                <div className="p-8 border border-dashed border-[#383A34] rounded-sm text-center space-y-3">
                  <FileImage className="w-7 h-7 text-[#AAA89E] mx-auto" />
                  <div className="text-xs text-[#AAA89E]">No satellite images in this project yet.</div>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<Upload className="w-3.5 h-3.5" />}
                    onClick={() => setUploadModalOpen(true)}
                  >
                    Upload Satellite Data
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {currentProject.images.map((img, idx) => (
                    <div
                      key={img.id}
                      className="p-3.5 bg-[#2B2C28] border border-[#383A34] rounded-sm space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-sm bg-[#222321] border border-[#383A34] flex items-center justify-center text-[#D6A84F] text-xs font-mono font-bold">
                            {img.temporalType === 't1' ? 'T1' : img.temporalType === 't2' ? 'T2' : `#${idx + 1}`}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#F1EBDD] truncate max-w-[170px]">
                              {img.name}
                            </div>
                            <div className="text-[10px] text-[#AAA89E] font-mono">{img.metadata.fileSize}</div>
                          </div>
                        </div>
                        <Badge variant={img.modality === 'sar' ? 'sand' : 'amber'} size="sm">
                          {img.modality}
                        </Badge>
                      </div>

                      {/* Technical Specs Inspector */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-[#171817] p-2 rounded-sm border border-[#383A34]/50">
                        <div>
                          <span className="text-[9px] text-[#AAA89E] block">CRS</span>
                          <span className="text-[#F1EBDD] text-[10px] truncate block" title={img.metadata.crs}>
                            {img.metadata.crs.split(' ')[0]}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] text-[#AAA89E] block">GSD</span>
                          <span className="text-[#F1EBDD] text-[10px]">{img.metadata.resolution}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-[#AAA89E] block">SENSOR</span>
                          <span className="text-[#F1EBDD] text-[10px] truncate block">{img.metadata.sensor}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-[#AAA89E] block">DATE</span>
                          <span className="text-[#F1EBDD] text-[10px] truncate block">
                            {img.metadata.acquisitionDate.split('T')[0]}
                          </span>
                        </div>
                      </div>

                      {/* Bands Badges */}
                      <div className="flex flex-wrap gap-1">
                        {img.metadata.bands.map(b => (
                          <span key={b} className="text-[9px] font-mono px-1 py-0.2 bg-[#171817] rounded-sm border border-[#383A34] text-[#AAA89E]">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Ingest Satellite Remote-Sensing Imagery"
        subtitle="Extracts CRS, resolution, and radiometric metadata headers"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#AAA89E] block mb-1">
                Sensor Modality
              </label>
              <select
                value={selectedModality}
                onChange={e => setSelectedModality(e.target.value as ModalityType)}
                className="w-full bg-[#171817] border border-[#383A34] rounded-sm px-3 py-2 text-xs text-[#F1EBDD] focus:outline-none focus:border-[#D6A84F] font-mono"
              >
                <option value="optical">Optical (Multispectral VNIR)</option>
                <option value="sar">SAR (Synthetic Aperture Radar)</option>
                <option value="change_mask">Reference Change Mask</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#AAA89E] block mb-1">
                Temporal Sequence
              </label>
              <select
                value={selectedTemporal}
                onChange={e => setSelectedTemporal(e.target.value as TemporalType)}
                className="w-full bg-[#171817] border border-[#383A34] rounded-sm px-3 py-2 text-xs text-[#F1EBDD] focus:outline-none focus:border-[#D6A84F] font-mono"
              >
                <option value="t1">T1 (Baseline Acquisition)</option>
                <option value="t2">T2 (Comparison Acquisition)</option>
                <option value="single">Single Acquisition</option>
              </select>
            </div>
          </div>

          <div className="border border-dashed border-[#383A34] hover:border-[#D6A84F]/50 rounded-panel p-7 text-center transition-colors bg-[#171817]">
            <Upload className="w-7 h-7 text-[#D6A84F] mx-auto mb-2" />
            <div className="text-sm font-semibold text-[#F1EBDD] mb-1">
              Drop remote-sensing imagery here
            </div>
            <p className="text-xs text-[#AAA89E] mb-3 font-mono">
              Supports GeoTIFF (.tif, .tiff), COG, and Sentinel SAR archives
            </p>

            <label className="cursor-pointer">
              <Button variant="primary" size="sm" loading={isUploading} onClick={() => {}}>
                Browse Local Storage
              </Button>
              <input
                type="file"
                className="hidden"
                accept=".tif,.tiff,.png,.jpg,.jpeg"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>
      </Modal>

      {/* New Project Modal */}
      <Modal
        isOpen={newProjectModalOpen}
        onClose={() => setNewProjectModalOpen(false)}
        title="Initialize New Remote-Sensing Geodatabase"
        subtitle="Create a structured workspace for earth observation analysis"
      >
        <form onSubmit={handleCreateProject} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#AAA89E] block mb-1">
              Project Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. NCR Peri-Urban Growth Monitoring"
              value={newProjName}
              onChange={e => setNewProjName(e.target.value)}
              className="w-full bg-[#171817] border border-[#383A34] rounded-sm px-3 py-2 text-xs text-[#F1EBDD] focus:outline-none focus:border-[#D6A84F]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#AAA89E] block mb-1">
              Domain Theme
            </label>
            <select
              value={newProjTheme}
              onChange={e => setNewProjTheme(e.target.value as any)}
              className="w-full bg-[#171817] border border-[#383A34] rounded-sm px-3 py-2 text-xs text-[#F1EBDD] focus:outline-none focus:border-[#D6A84F] font-mono"
            >
              <option value="Urban">Urban Growth &amp; Infrastructure</option>
              <option value="Agriculture">Agricultural Phenology &amp; Water</option>
              <option value="Water">Water Bodies &amp; Wetlands</option>
              <option value="Disaster">Disaster Flood / Cyclone Monitoring</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#AAA89E] block mb-1">
              Mission Objectives
            </label>
            <textarea
              rows={3}
              placeholder="Describe observation parameters, sensor requirements, and target coordinate extent..."
              value={newProjDesc}
              onChange={e => setNewProjDesc(e.target.value)}
              className="w-full bg-[#171817] border border-[#383A34] rounded-sm px-3 py-2 text-xs text-[#F1EBDD] focus:outline-none focus:border-[#D6A84F]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#383A34]">
            <Button variant="ghost" size="sm" onClick={() => setNewProjectModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Initialize Project
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
