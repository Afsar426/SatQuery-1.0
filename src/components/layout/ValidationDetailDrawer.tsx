import React from 'react';
import { useApp } from '../../context/AppContext';
import { Drawer } from '../common/Drawer';
import { Badge } from '../common/Badge';
import { CheckCircle2, AlertTriangle, XCircle, ShieldAlert, Layers, MapPin, Radio, Calendar } from 'lucide-react';

export const ValidationDetailDrawer: React.FC = () => {
  const { validationDrawerOpen, setValidationDrawerOpen, validationResult, currentProject } = useApp();

  const isBlocked = validationResult.status === 'ANALYSIS BLOCKED';
  const isWarning = validationResult.status === 'WARNING';

  return (
    <Drawer
      isOpen={validationDrawerOpen}
      onClose={() => setValidationDrawerOpen(false)}
      title="Geospatial Input Validation &amp; Guardrails"
      subtitle={`Project: ${currentProject.name} • ${currentProject.images.length} Image Asset(s)`}
    >
      {/* Overall Status Banner */}
      <div
        className={`p-3.5 rounded-sm border flex items-start gap-3 ${
          isBlocked
            ? 'bg-[#B76552]/15 border-[#B76552]/40 text-[#F1EBDD]'
            : isWarning
            ? 'bg-[#D6A84F]/15 border-[#D6A84F]/40 text-[#F1EBDD]'
            : 'bg-[#879477]/15 border-[#879477]/40 text-[#F1EBDD]'
        }`}
      >
        <div className="mt-0.5 flex-shrink-0">
          {isBlocked ? (
            <XCircle className="w-4 h-4 text-[#B76552]" />
          ) : isWarning ? (
            <AlertTriangle className="w-4 h-4 text-[#D6A84F]" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-[#879477]" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs tracking-wide font-mono">STATUS: {validationResult.status}</span>
            <Badge
              variant={isBlocked ? 'error' : isWarning ? 'warning' : 'success'}
              size="sm"
            >
              {isBlocked ? 'BLOCKED' : isWarning ? 'WARNINGS' : 'READY'}
            </Badge>
          </div>
          <p className="text-[11px] mt-1 leading-relaxed text-[#AAA89E]">{validationResult.summary}</p>
          {validationResult.refusalReason && (
            <div className="mt-2 p-2 bg-[#171817] border border-[#B76552]/50 rounded-sm text-xs font-mono text-[#B76552] flex items-start gap-2">
              <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              <span>Guardrail Refusal: {validationResult.refusalReason}</span>
            </div>
          )}
        </div>
      </div>

      {/* Categorized Validation Breakdown */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#D6A84F] flex items-center gap-1.5 font-mono">
          <Layers className="w-3.5 h-3.5" /> Geodetic Verification Matrix
        </h3>

        <div className="space-y-1.5">
          {validationResult.checks.map(check => {
            const isPass = check.status === 'passed';
            const isWarn = check.status === 'warning';
            const isFail = check.status === 'failed';

            return (
              <div
                key={check.id}
                className="p-2.5 bg-[#2B2C28] border border-[#383A34] rounded-sm flex items-start justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-2">
                  <div className="mt-0.5">
                    {isPass && <CheckCircle2 className="w-3.5 h-3.5 text-[#879477]" />}
                    {isWarn && <AlertTriangle className="w-3.5 h-3.5 text-[#D6A84F]" />}
                    {isFail && <XCircle className="w-3.5 h-3.5 text-[#B76552]" />}
                  </div>
                  <div>
                    <div className="font-semibold text-[#F1EBDD] flex items-center gap-2">
                      <span>{check.name}</span>
                      <span className="text-[9px] uppercase font-mono px-1 py-0.2 rounded-sm bg-[#222321] text-[#AAA89E]">
                        {check.category}
                      </span>
                    </div>
                    <div className="text-[#AAA89E] text-[11px] mt-0.5 leading-relaxed font-mono">
                      {check.detail}
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[9px] font-mono uppercase font-bold px-1.5 py-0.2 rounded-sm ${
                    isPass
                      ? 'text-[#879477] bg-[#879477]/15'
                      : isWarn
                      ? 'text-[#D6A84F] bg-[#D6A84F]/15'
                      : 'text-[#B76552] bg-[#B76552]/15'
                  }`}
                >
                  {check.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Technical Headers */}
      <div className="space-y-3 pt-2 border-t border-[#383A34]">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#D6A84F] flex items-center gap-1.5 font-mono">
          <MapPin className="w-3.5 h-3.5" /> Georeferencing &amp; Radiometric Headers
        </h3>

        {currentProject.images.map((img, i) => (
          <div key={img.id} className="p-3 bg-[#2B2C28] border border-[#383A34] rounded-sm text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-[#383A34] pb-1.5">
              <span className="font-bold text-[#F1EBDD] flex items-center gap-2">
                <Radio className="w-3 h-3 text-[#D6A84F]" />
                Asset #{i + 1}: {img.name}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[#222321] rounded-sm text-[#D6A84F] uppercase">
                {img.modality} &bull; {img.temporalType}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] font-mono">
              <div>
                <span className="text-[#AAA89E] text-[10px] block">Format:</span>
                <span className="text-[#F1EBDD] text-[10px]">{img.metadata.format}</span>
              </div>
              <div>
                <span className="text-[#AAA89E] text-[10px] block">CRS:</span>
                <span className="text-[#F1EBDD] text-[10px]">{img.metadata.crs}</span>
              </div>
              <div>
                <span className="text-[#AAA89E] text-[10px] block">Dimensions &amp; GSD:</span>
                <span className="text-[#F1EBDD] text-[10px]">
                  {img.metadata.dimensions.width} &times; {img.metadata.dimensions.height} ({img.metadata.resolution})
                </span>
              </div>
              <div>
                <span className="text-[#AAA89E] text-[10px] block">Sensor / Radiometry:</span>
                <span className="text-[#F1EBDD] text-[10px]">
                  {img.metadata.sensor} ({img.metadata.radiometricBits}-bit)
                </span>
              </div>
              <div>
                <span className="text-[#AAA89E] text-[10px] block">Acquisition Timestamp:</span>
                <span className="text-[#F1EBDD] text-[10px] flex items-center gap-1">
                  <Calendar className="w-2.5 h-2.5 text-[#AAA89E]" />
                  {img.metadata.acquisitionDate.replace('T', ' ').slice(0, 19)}
                </span>
              </div>
              <div>
                <span className="text-[#AAA89E] text-[10px] block">Bounding Box [WGS-84]:</span>
                <span className="text-[#F1EBDD] text-[10px]">
                  [{img.metadata.bbox.map(n => n.toFixed(2)).join(', ')}]
                </span>
              </div>
            </div>

            <div className="pt-1.5 border-t border-[#383A34] flex flex-wrap gap-1">
              <span className="text-[9px] text-[#AAA89E] mr-1 font-mono">Bands:</span>
              {img.metadata.bands.map(b => (
                <span key={b} className="text-[9px] font-mono bg-[#222321] border border-[#383A34] px-1 py-0.2 rounded-sm text-[#AAA89E]">
                  {b}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Drawer>
  );
};
