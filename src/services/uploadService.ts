import { ImageAsset, ModalityType, TemporalType } from '../types';

export class UploadService {
  /**
   * Simulates extracting remote sensing metadata from a dropped/selected file
   */
  public async processUpload(
    file: File,
    modality: ModalityType = 'optical',
    temporalType: TemporalType = 'single',
    customCrs?: string
  ): Promise<ImageAsset> {
    // Artificial latency for metadata reading
    await new Promise(res => setTimeout(res, 400));

    const isTiff = file.name.toLowerCase().endsWith('.tif') || file.name.toLowerCase().endsWith('.tiff');
    const isSar = modality === 'sar' || file.name.toLowerCase().includes('sar') || file.name.toLowerCase().includes('grd');

    const defaultCenter: [number, number] = [13.125, 77.625]; // Bengaluru corridor
    const bbox: [number, number, number, number] = [
      defaultCenter[1] - 0.05,
      defaultCenter[0] - 0.05,
      defaultCenter[1] + 0.05,
      defaultCenter[0] + 0.05,
    ];

    const crs = customCrs || (isSar ? 'EPSG:32646 (WGS 84 / UTM Zone 46N)' : 'EPSG:32643 (WGS 84 / UTM Zone 43N)');

    const asset: ImageAsset = {
      id: `img-${Date.now()}`,
      name: file.name,
      url: URL.createObjectURL(file),
      thumbnailUrl: URL.createObjectURL(file),
      modality: isSar ? 'sar' : modality,
      temporalType,
      uploadedAt: new Date().toISOString(),
      metadata: {
        format: isTiff ? 'GeoTIFF / Cloud-Optimized GeoTIFF (COG)' : file.type || 'TIFF',
        crs,
        crsStatus: isTiff || customCrs ? 'valid' : 'uncertain',
        dimensions: { width: 4096, height: 4096 },
        resolution: isSar ? '10m GSD (Terrain Corrected)' : '10.0m GSD',
        pixelSizeMeters: 10.0,
        bands: isSar ? ['Gamma0_VV', 'Gamma0_VH', 'Ratio_VV_VH'] : ['B02-Blue', 'B03-Green', 'B04-Red', 'B08-NIR'],
        sensor: isSar ? 'Sentinel-1 C-SAR IW Mode' : 'Sentinel-2 MSI Level-2A',
        acquisitionDate: new Date().toISOString(),
        bbox,
        center: defaultCenter,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        radiometricBits: isSar ? 16 : 12,
        cloudCoverPercentage: isSar ? undefined : 2.4,
        polarization: isSar ? 'VV + VH dual-pol' : undefined,
      },
    };

    return asset;
  }
}

export const uploadService = new UploadService();
