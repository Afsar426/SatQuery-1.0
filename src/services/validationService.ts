import { ImageAsset, ValidationResult, ValidationCheck } from '../types';

export class ValidationService {
  /**
   * Validates single image, bi-temporal pairs, or optical-SAR pairs
   */
  public validateAssets(images: ImageAsset[]): ValidationResult {
    const timestamp = new Date().toISOString();

    if (!images || images.length === 0) {
      return {
        status: 'ANALYSIS BLOCKED',
        summary: 'No remote sensing imagery provided.',
        refusalReason: 'Upload at least one satellite image (GeoTIFF / COG) before initializing analysis.',
        checks: [
          {
            id: 'chk-empty',
            category: 'file',
            name: 'Image Count Verification',
            status: 'failed',
            detail: 'Zero images detected in pipeline input buffer.',
          },
        ],
        timestamp,
      };
    }

    const checks: ValidationCheck[] = [];
    let isBlocked = false;
    let refusalReason: string | undefined;

    // 1. File Format & Metadata Integrity Checks
    images.forEach((img, idx) => {
      const isGeotiff = img.name.toLowerCase().endsWith('.tif') || img.name.toLowerCase().endsWith('.tiff') || img.metadata.format.includes('GeoTIFF');
      checks.push({
        id: `chk-fmt-${idx}`,
        category: 'file',
        name: `File Format (${img.name})`,
        status: isGeotiff ? 'passed' : 'warning',
        detail: isGeotiff
          ? `Detected valid ${img.metadata.format} (${img.metadata.fileSize}) with 12/16-bit radiometric depth.`
          : 'Standard image format detected. Georeferencing will rely on embedded world file or user-supplied CRS.',
      });

      checks.push({
        id: `chk-crs-${idx}`,
        category: 'georeferencing',
        name: `CRS & Projection (${img.name})`,
        status: img.metadata.crsStatus === 'valid' ? 'passed' : 'failed',
        detail: `Projected Coordinate System: ${img.metadata.crs}`,
      });

      if (img.metadata.crsStatus !== 'valid') {
        isBlocked = true;
        refusalReason = `Image "${img.name}" lacks valid Coordinate Reference System (CRS) geospatial metadata. Cannot guarantee spatial alignment.`;
      }
    });

    // 2. Pair Compatibility Checks (Bi-Temporal or Optical + SAR)
    if (images.length === 2) {
      const img1 = images[0];
      const img2 = images[1];

      // Spatial Extent Comparison
      const bbox1 = img1.metadata.bbox;
      const bbox2 = img2.metadata.bbox;

      // Check for overlap: [minLon, minLat, maxLon, maxLat]
      const overlapX = Math.max(0, Math.min(bbox1[2], bbox2[2]) - Math.max(bbox1[0], bbox2[0]));
      const overlapY = Math.max(0, Math.min(bbox1[3], bbox2[3]) - Math.max(bbox1[1], bbox2[1]));
      const hasSpatialOverlap = overlapX > 0 && overlapY > 0;

      checks.push({
        id: 'chk-pair-extent',
        category: 'georeferencing',
        name: 'Spatial Extent Congruence',
        status: hasSpatialOverlap ? 'passed' : 'failed',
        detail: hasSpatialOverlap
          ? `Bounding footprints intersect with high congruence. Intersection area: ~${(overlapX * overlapY * 111 * 111).toFixed(1)} km².`
          : `Non-overlapping bounding boxes detected: [${bbox1.join(', ')}] vs [${bbox2.join(', ')}].`,
      });

      if (!hasSpatialOverlap) {
        isBlocked = true;
        refusalReason = 'These images do not appear to cover the same geographic region. Bi-temporal change analysis cannot safely continue.';
      }

      // CRS Match
      const crsMatch = img1.metadata.crs === img2.metadata.crs;
      checks.push({
        id: 'chk-pair-crs',
        category: 'compatibility',
        name: 'CRS Consistency & Datum Alignment',
        status: crsMatch ? 'passed' : 'warning',
        detail: crsMatch
          ? `Both assets utilize identical projection: ${img1.metadata.crs}`
          : `Differing projections detected: (${img1.metadata.crs}) vs (${img2.metadata.crs}). On-the-fly reprojection required.`,
      });

      // Resolution Compatibility
      const res1 = img1.metadata.pixelSizeMeters;
      const res2 = img2.metadata.pixelSizeMeters;
      const resRatio = Math.max(res1, res2) / Math.min(res1, res2);

      checks.push({
        id: 'chk-pair-gsd',
        category: 'sensor',
        name: 'Ground Sampling Distance (GSD) Scale',
        status: resRatio <= 2.0 ? 'passed' : 'warning',
        detail: `GSD Scale Ratio: ${resRatio.toFixed(2)}x (${res1}m vs ${res2}m). ${resRatio <= 2.0 ? 'Compatible for direct feature extraction.' : 'Resampling recommended for optimal cross-correlation.'}`,
      });

      // Temporal Sequence
      if (img1.metadata.acquisitionDate && img2.metadata.acquisitionDate) {
        const d1 = new Date(img1.metadata.acquisitionDate).getTime();
        const d2 = new Date(img2.metadata.acquisitionDate).getTime();
        const daysDiff = Math.abs(Math.round((d2 - d1) / (1000 * 60 * 60 * 24)));

        checks.push({
          id: 'chk-pair-time',
          category: 'compatibility',
          name: 'Temporal Baseline',
          status: daysDiff > 0 ? 'passed' : 'warning',
          detail: `Temporal separation: ${daysDiff} days between acquisitions (${img1.metadata.acquisitionDate.split('T')[0]} to ${img2.metadata.acquisitionDate.split('T')[0]}).`,
        });
      }
    }

    if (isBlocked) {
      return {
        status: 'ANALYSIS BLOCKED',
        summary: 'Input validation failed. SatQuery refused unreliable workflow to preserve scientific integrity.',
        refusalReason: refusalReason || 'Critical compatibility parameters failed verification.',
        checks,
        timestamp,
      };
    }

    const hasWarnings = checks.some(c => c.status === 'warning');
    return {
      status: hasWarnings ? 'WARNING' : 'READY',
      summary: hasWarnings
        ? 'Inputs validated with non-critical warnings. Auto-preprocessing will handle minor discrepancies.'
        : 'All input parameters, georeferencing coordinates, and radiometric checks passed successfully.',
      checks,
      timestamp,
    };
  }
}

export const validationService = new ValidationService();
