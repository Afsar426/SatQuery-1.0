import React, { useRef, useState } from 'react';
import { UploadCloud, X, FileImage, AlertCircle } from 'lucide-react';

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
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setLocalError(null);
    // Validate file size (< 100MB)
    const maxSizeBytes = 100 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setLocalError('File size exceeds the 100 MB limit.');
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

  const activeError = localError || errorMessage;

  return (
    <div className="bg-sat-card border border-sat-border rounded-xl p-6 shadow-card flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-sat-ink font-sans tracking-tight">
          1. Upload Image
        </h3>
        <span className="text-[11px] font-mono text-sat-slate">
          Max 100 MB
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-between space-y-4">
        {/* Drag & Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-all min-h-[190px] ${
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
            Drag &amp; drop image
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="mt-2.5 px-3 py-1.5 bg-sat-card hover:bg-sat-surface border border-sat-border text-xs font-medium text-sat-ink rounded transition-colors shadow-xs"
          >
            Browse / Upload
          </button>
          
          <p className="text-[11px] text-sat-slate/80 mt-2.5 font-mono">
            Supports GeoTIFF, JPG, PNG (Max 100 MB)
          </p>
        </div>

        {/* Uploaded File Pill / Preview */}
        {currentImageName && (
          <div className="bg-sat-surface border border-sat-border rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              {currentImageUrl ? (
                <div className="w-10 h-10 rounded border border-sat-border overflow-hidden shrink-0 bg-black">
                  <img src={currentImageUrl} alt="Preview" className="w-full h-full object-cover" />
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
                  {currentImageSize}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onImageRemoved();
                setLocalError(null);
              }}
              className="text-sat-slate hover:text-sat-error p-1 rounded transition-colors"
              title="Remove image"
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Error Notice */}
      {activeError && (
        <div className="mt-4 p-3 bg-sat-error-light border border-sat-error/30 rounded-lg flex items-start justify-between gap-2 text-sat-error text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{activeError}</span>
          </div>
          <button 
            onClick={() => {
              setLocalError(null);
              if (onErrorDismiss) onErrorDismiss();
            }} 
            className="hover:opacity-80"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
