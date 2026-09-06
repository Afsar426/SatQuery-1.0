import React, { useRef, useState } from 'react';
import { UploadCloud, X, FileImage, Layers, AlertCircle } from 'lucide-react';
import { PRESET_SAMPLES } from '../../data/demo';

interface UploadCardProps {
  currentImageName: string | null;
  currentImageSize: string | null;
  currentImageUrl: string | null;
  onImageSelected: (name: string, size: string, url: string, file?: File) => void;
  onImageRemoved: () => void;
  errorMessage?: string | null;
  onErrorDismiss?: () => void;
}

export const UploadCard: React.FC<UploadCardProps> = ({
  currentImageName,
  currentImageSize,
  currentImageUrl,
  onImageSelected,
  onImageRemoved,
  errorMessage,
  onErrorDismiss
}) => {
  const [activeTab, setActiveTab] = useState<'single' | 'compare'>('single');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    // Validate file size (< 50MB)
    const maxSizeBytes = 50 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      alert('File size exceeds the 50 MB threshold. Please upload a smaller satellite granule.');
      return;
    }

    // Format file size string
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1) + ' MB';

    // Create local object URL for preview
    const objectUrl = URL.createObjectURL(file);
    onImageSelected(file.name, sizeMb, objectUrl, file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handlePresetSelect = (presetId: string) => {
    const sample = PRESET_SAMPLES.find(s => s.id === presetId) || PRESET_SAMPLES[0];
    onImageSelected(sample.name, sample.fileSize, sample.imageUrl);
  };

  return (
    <div className="bg-sat-card border border-sat-border rounded-xl p-6 shadow-card flex flex-col h-full">
      {/* Header & Subtabs */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-sat-ink font-sans tracking-tight">
          1. Upload Image
        </h3>

        {/* Single Image vs Compare Images (Beta) */}
        <div className="flex items-center bg-sat-surface p-0.5 rounded-lg border border-sat-border text-xs">
          <button
            onClick={() => setActiveTab('single')}
            className={`px-3 py-1 rounded-md font-medium transition-all ${
              activeTab === 'single'
                ? 'bg-sat-card text-sat-ink shadow-xs font-semibold'
                : 'text-sat-slate hover:text-sat-ink'
            }`}
          >
            Single Image
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-3 py-1 rounded-md font-medium transition-all flex items-center gap-1 ${
              activeTab === 'compare'
                ? 'bg-sat-card text-sat-ink shadow-xs font-semibold'
                : 'text-sat-slate hover:text-sat-ink'
            }`}
          >
            <span>Compare Images</span>
            <span className="text-[9px] bg-sat-border px-1 py-0.2 rounded font-mono text-sat-slate">Beta</span>
          </button>
        </div>
      </div>

      {activeTab === 'compare' ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-sat-surface/40 border border-dashed border-sat-border rounded-lg">
          <Layers className="w-8 h-8 text-sat-slate mb-2" />
          <p className="text-sm font-semibold text-sat-ink">Bi-temporal Change Detection</p>
          <p className="text-xs text-sat-slate mt-1 max-w-sm">
            Architecture ready for multi-date SAR/Optical comparative analysis. Select Single Image for the internal demonstration.
          </p>
          <button 
            onClick={() => setActiveTab('single')}
            className="mt-4 px-3 py-1.5 text-xs font-medium text-sat-blue hover:underline"
          >
            Return to Single Image
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-between space-y-4">
          {/* Drag & Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-all min-h-[170px] ${
              isDragging 
                ? 'border-sat-blue bg-sat-blue/5' 
                : 'border-sat-border hover:border-sat-slate/60 bg-sat-surface/30'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              accept=".tif,.tiff,.jpg,.jpeg,.png"
              className="hidden"
            />
            
            <div className="w-12 h-12 rounded-full bg-sat-card border border-sat-border flex items-center justify-center text-sat-blue mb-3 shadow-xs">
              <UploadCloud className="w-6 h-6" />
            </div>

            <p className="text-xs font-semibold text-sat-ink">
              Drag &amp; drop a satellite image here <br className="hidden sm:inline" />
              <span className="text-sat-slate font-normal">or click to browse</span>
            </p>
            
            <p className="text-[11px] text-sat-slate/80 mt-2 font-mono">
              Supports GeoTIFF, JPG, PNG (Max 50 MB)
            </p>
          </div>

          {/* Uploaded File Pill / Preview (matching mockup) */}
          {currentImageName && (
            <div className="bg-sat-surface border border-sat-border rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-3 overflow-hidden">
                {currentImageUrl ? (
                  <div className="w-10 h-10 rounded border border-sat-border overflow-hidden shrink-0 bg-black">
                    <img src={currentImageUrl} alt="Satellite preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded bg-sat-card border border-sat-border flex items-center justify-center shrink-0 text-sat-blue">
                    <FileImage className="w-5 h-5" />
                  </div>
                )}
                
                <div className="truncate">
                  <p className="text-xs font-semibold text-sat-ink truncate font-mono">
                    {currentImageName}
                  </p>
                  <p className="text-[11px] text-sat-slate">
                    {currentImageSize || '2.4 MB'}
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onImageRemoved();
                }}
                className="text-sat-slate hover:text-sat-error p-1 rounded transition-colors"
                title="Remove image"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Quick Preset Selector for Easy Live Demo */}
          <div className="pt-2 border-t border-sat-border/60">
            <span className="text-[10px] uppercase font-mono tracking-wider text-sat-slate block mb-1.5">
              Quick Select Satellite Granule:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_SAMPLES.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handlePresetSelect(preset.id)}
                  className={`px-2.5 py-1 text-[11px] rounded border font-mono transition-all ${
                    currentImageName === preset.name
                      ? 'bg-sat-blue text-white border-sat-blue'
                      : 'bg-sat-card border-sat-border text-sat-slate hover:text-sat-ink hover:border-sat-slate'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Error Notice */}
      {errorMessage && (
        <div className="mt-4 p-3 bg-sat-error-light border border-sat-error/30 rounded-lg flex items-start justify-between gap-2 text-sat-error text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          {onErrorDismiss && (
            <button onClick={onErrorDismiss} className="hover:opacity-80">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
