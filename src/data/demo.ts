import { AnalysisResponse, PresetSample } from '../types/analysis';

// High-fidelity SVG-based satellite imagery data URIs to guarantee 100% offline reliability for SIH demo
export const SATELLITE_SAMPLE_IMAGES = {
  waterBodyInput: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <defs>
      <linearGradient id="terrain1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%233A5335"/>
        <stop offset="35%" stop-color="%232D4229"/>
        <stop offset="70%" stop-color="%234A5F3A"/>
        <stop offset="100%" stop-color="%23243820"/>
      </linearGradient>
      <pattern id="fields" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
        <path d="M 0 0 L 60 0 L 60 60 L 0 60 Z" fill="none" stroke="%23253820" stroke-width="1.5" stroke-opacity="0.6"/>
        <rect x="2" y="2" width="26" height="26" fill="%23415938" fill-opacity="0.4"/>
        <rect x="32" y="32" width="26" height="26" fill="%23334B2C" fill-opacity="0.4"/>
      </pattern>
      <filter id="texture">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise"/>
        <feColorMatrix type="matrix" values="0.3 0 0 0 0.2  0 0.35 0 0 0.3  0 0 0.2 0 0.15  0 0 0 1 0"/>
        <feComposite in2="SourceGraphic" in="gl" operator="arithmetic" k1="0" k2="0.8" k3="0.2" k4="0"/>
      </filter>
    </defs>
    <!-- Background Terrain -->
    <rect width="800" height="600" fill="url(%23terrain1)"/>
    <rect width="800" height="600" fill="url(%23fields)"/>
    
    <!-- Topographic contour lines subtle -->
    <path d="M -50 150 Q 150 120 300 200 T 650 180 T 850 120" fill="none" stroke="%23567046" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.5"/>
    <path d="M -50 250 Q 200 280 400 320 T 850 310" fill="none" stroke="%23567046" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.5"/>
    <path d="M -50 480 Q 250 420 500 480 T 850 420" fill="none" stroke="%23567046" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.5"/>

    <!-- Water Reservoir and River Channel (Realistic satellite water body) -->
    <!-- Southern feeder river -->
    <path d="M 380 590 Q 360 480 390 410 T 350 320 T 430 250" fill="none" stroke="%231E353B" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 380 590 Q 360 480 390 410 T 350 320 T 430 250" fill="none" stroke="%2315252A" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
    
    <!-- Northern Large Lake / Reservoir Basin -->
    <path d="M 430 250 C 420 180 380 130 430 90 C 470 50 560 60 610 90 C 670 120 710 160 670 210 C 630 260 560 270 500 250 C 460 235 440 260 430 250 Z" fill="%23162930"/>
    <path d="M 440 240 C 430 185 395 140 440 100 C 475 65 550 70 595 100 C 650 130 690 165 655 200 C 620 245 555 255 505 240 Z" fill="%23101E24"/>

    <!-- Satellite metadata overlay imprint -->
    <rect x="20" y="20" width="180" height="34" rx="4" fill="%230F171F" fill-opacity="0.75"/>
    <text x="32" y="42" fill="%23D8DCD9" font-family="monospace" font-size="12" letter-spacing="1">SENTINEL-2B | B4-B3-B2</text>
    <text x="24" y="580" fill="%23E5E8E5" font-family="monospace" font-size="11" opacity="0.8">22°25'51.6"N 75°21'43.2"E | GSD 10M</text>
  </svg>`,

  waterBodyGroundingOutput: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <defs>
      <linearGradient id="terrain2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="%233A5335"/>
        <stop offset="35%" stop-color="%232D4229"/>
        <stop offset="70%" stop-color="%234A5F3A"/>
        <stop offset="100%" stop-color="%23243820"/>
      </linearGradient>
      <pattern id="fields2" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
        <path d="M 0 0 L 60 0 L 60 60 L 0 60 Z" fill="none" stroke="%23253820" stroke-width="1.5" stroke-opacity="0.6"/>
        <rect x="2" y="2" width="26" height="26" fill="%23415938" fill-opacity="0.4"/>
        <rect x="32" y="32" width="26" height="26" fill="%23334B2C" fill-opacity="0.4"/>
      </pattern>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>
    <!-- Background Terrain -->
    <rect width="800" height="600" fill="url(%23terrain2)"/>
    <rect width="800" height="600" fill="url(%23fields2)"/>

    <!-- Water Reservoir Base -->
    <path d="M 380 590 Q 360 480 390 410 T 350 320 T 430 250" fill="none" stroke="%231E353B" stroke-width="26" stroke-linecap="round"/>
    <path d="M 430 250 C 420 180 380 130 430 90 C 470 50 560 60 610 90 C 670 120 710 160 670 210 C 630 260 560 270 500 250 C 460 235 440 260 430 250 Z" fill="%23162930"/>

    <!-- VECTOR GROUNDING HIGHLIGHT MASK (Water Body Detection - Bright Cobalt Blue Contour) -->
    <!-- River Grounding Overlay -->
    <path d="M 380 590 Q 360 480 390 410 T 350 320 T 430 250" fill="none" stroke="%230084FF" stroke-width="22" stroke-linecap="round" opacity="0.45"/>
    <path d="M 380 590 Q 360 480 390 410 T 350 320 T 430 250" fill="none" stroke="%230070E0" stroke-width="2" stroke-dasharray="6,4"/>

    <!-- Northern Reservoir Lake Grounding Mask -->
    <path d="M 430 250 C 420 180 380 130 430 90 C 470 50 560 60 610 90 C 670 120 710 160 670 210 C 630 260 560 270 500 250 C 460 235 440 260 430 250 Z" 
          fill="%230077FF" fill-opacity="0.45" stroke="%230099FF" stroke-width="3.5" filter="url(%23glow)"/>

    <!-- Detection Pin & Bounding Indicator -->
    <circle cx="525" cy="150" r="6" fill="%23FFFFFF" stroke="%230077FF" stroke-width="3"/>
    <rect x="475" y="112" width="100" height="24" rx="3" fill="%230077FF" fill-opacity="0.95"/>
    <text x="525" y="128" fill="%23FFFFFF" font-family="sans-serif" font-weight="600" font-size="10" text-anchor="middle" letter-spacing="0.5">WATER BODY</text>

    <!-- Boundary Bounding Box Guides -->
    <rect x="360" y="55" width="345" height="235" fill="none" stroke="%230084FF" stroke-width="1.5" stroke-dasharray="5,5" opacity="0.7"/>

    <!-- Detection Legend Overlay -->
    <rect x="20" y="20" width="240" height="38" rx="4" fill="%230F171F" fill-opacity="0.88"/>
    <rect x="32" y="32" width="14" height="14" rx="2" fill="%230077FF"/>
    <text x="54" y="43" fill="%23FFFFFF" font-family="sans-serif" font-size="11" font-weight="600">Water Body (Confidence: 91%)</text>
    <text x="24" y="580" fill="%23E5E8E5" font-family="monospace" font-size="11" opacity="0.8">TARGET LOCATED: NORTH REGION</text>
  </svg>`
};

export const PRESET_SAMPLES: PresetSample[] = [
  {
    id: 'sentinel2_water_basin',
    name: 'sentinel2_sample.jpg',
    category: 'Water Resources',
    imageUrl: SATELLITE_SAMPLE_IMAGES.waterBodyInput,
    fileSize: '2.4 MB',
    recommendedQueries: [
      'Where is the water body in this image?',
      'Describe this image',
      'What objects are visible?',
      'Calculate NDVI',
      'Find built-up area'
    ],
    description: 'Sentinel-2 MSI true color acquisition showing riparian corridor and northern water storage reservoir.'
  },
  {
    id: 'urban_settlement',
    name: 'delhi_ncr_urban_patch.jpg',
    category: 'Urban Planning',
    imageUrl: SATELLITE_SAMPLE_IMAGES.waterBodyInput, // fallback gracefully
    fileSize: '3.1 MB',
    recommendedQueries: [
      'Find built-up area',
      'Highlight the built-up area',
      'What percentage is urbanized?',
      'Describe this image'
    ],
    description: 'High-density urban development featuring transportation networks and institutional infrastructure.'
  },
  {
    id: 'punjab_farmlands',
    name: 'punjab_cropland_sector.jpg',
    category: 'Agriculture',
    imageUrl: SATELLITE_SAMPLE_IMAGES.waterBodyInput,
    fileSize: '2.8 MB',
    recommendedQueries: [
      'Calculate NDVI',
      'Identify irrigated agricultural parcels',
      'Is there a forest area?'
    ],
    description: 'Precision agricultural parcels with distinct vegetative phenology across crop cycles.'
  }
];

// High-fidelity Mock Response matching SIH demo and mockup requirements
export function generateMockAnalysis(
  query: string, 
  imageName: string = 'sentinel2_sample.jpg'
): AnalysisResponse {
  const normalizedQuery = query.toLowerCase().trim();

  // Scenario 1: Water Body Grounding (Primary Demonstration Scenario)
  if (
    normalizedQuery.includes('water') || 
    normalizedQuery.includes('river') || 
    normalizedQuery.includes('lake') ||
    normalizedQuery === '' ||
    normalizedQuery.includes('where is')
  ) {
    return {
      taskId: 'TASK-GROUND-2026-0904',
      status: 'completed',
      task: 'Visual Grounding',
      model: 'Remote-Sensing Grounding Model (RS-Grounding-v2.1)',
      answer: 'A water body is present in the northern part of the image. It appears to be a river or lake with a southern feeder tributary.',
      confidence: 0.91,
      detectedArea: '2.34 km²',
      coordinates: {
        lat: 22.431,
        lng: 75.362,
        formatted: '22.431° N, 75.362° E'
      },
      visualEvidence: {
        inputImageUrl: SATELLITE_SAMPLE_IMAGES.waterBodyInput,
        detectedRegionUrl: SATELLITE_SAMPLE_IMAGES.waterBodyGroundingOutput,
        detectedObject: 'Water Body',
        approximateRegion: 'Northern Area & Central Corridor',
        detectedArea: '2.34 km²',
        coordinates: {
          lat: 22.431,
          lng: 75.362,
          formatted: '22.431° N, 75.362° E'
        },
        boundingBox: [0.08, 0.45, 0.42, 0.88]
      },
      insights: [
        'Image validated successfully',
        'Query classified as Grounding',
        'Grounding model executed',
        'Water body detected with high confidence',
        'Response generated'
      ],
      metadata: {
        sensor: 'Sentinel-2 MSI Level-2A',
        platform: 'ESA Copernicus Constellation',
        acquisitionDate: '2026-08-14 05:42 UTC',
        resolutionGsd: '10.0 meters/pixel',
        bandsUsed: ['B04 (Red)', 'B03 (Green)', 'B02 (Blue)', 'B08 (NIR)'],
        projection: 'WGS 84 / UTM Zone 43N (EPSG:32643)',
        cloudCoverPercentage: 0.4,
        dimensions: { width: 1024, height: 768 }
      },
      executionTrace: [
        {
          id: 'step-1',
          stepNumber: 1,
          label: 'Input Validated',
          detail: `Satellite payload '${imageName}' verified: dimensions 1024x768, 3 RGB + 1 NIR bands detected. Format verified compliant with GeoTIFF/ISO standards.`,
          status: 'completed',
          durationMs: 42,
          timestamp: '10:24:01.120'
        },
        {
          id: 'step-2',
          stepNumber: 2,
          label: 'Query Classified → Grounding',
          detail: `Natural language query parsed. Intent: Spatial Grounding of geographical entity 'water body'. Dispatching to Geospatial Vision Agent router.`,
          status: 'completed',
          durationMs: 110,
          timestamp: '10:24:01.162'
        },
        {
          id: 'step-3',
          stepNumber: 3,
          label: 'Grounding Model Selected',
          detail: `Selected specialist model: Remote-Sensing Grounding Model (RS-Grounding-v2.1). Weights loaded with NIR spectral index assistance (MNDWI/NDWI).`,
          status: 'completed',
          durationMs: 85,
          timestamp: '10:24:01.272'
        },
        {
          id: 'step-4',
          stepNumber: 4,
          label: 'Model Executed',
          detail: `Inference executed over 786,432 pixels. Surface water polygon extracted with confidence score 0.912 across northern basin.`,
          status: 'completed',
          durationMs: 312,
          timestamp: '10:24:01.357'
        },
        {
          id: 'step-5',
          stepNumber: 5,
          label: 'Visual Evidence Generated',
          detail: `Vector contour boundary generated (142 vertices). GeoJSON polygon mapped to EPSG:32643 coordinate plane. Mask rendered for visualization.`,
          status: 'completed',
          durationMs: 64,
          timestamp: '10:24:01.669'
        },
        {
          id: 'step-6',
          stepNumber: 6,
          label: 'Response Generated',
          detail: `Synthesized grounded analytical answer with spatial localization metrics (22.431° N, 75.362° E, area 2.34 km²). Trace audit complete.`,
          status: 'completed',
          durationMs: 45,
          timestamp: '10:24:01.733'
        }
      ]
    };
  }

  // Scenario 2: Visual Question Answering (VQA) / Scene Description
  if (normalizedQuery.includes('describe') || normalizedQuery.includes('what') || normalizedQuery.includes('objects')) {
    return {
      taskId: 'TASK-VQA-2026-0905',
      status: 'completed',
      task: 'Visual Question Answering',
      model: 'Remote-Sensing Vision-Language Model (RS-VLM-v1.8)',
      answer: 'The satellite scene depicts an agrarian landscape intersected by a natural freshwater river system in the center, flowing into an expansive reservoir in the northern sector. Surrounding terrain comprises mixed agricultural plots and light riparian vegetation.',
      confidence: 0.88,
      detectedArea: '18.60 km² (total frame)',
      coordinates: {
        lat: 22.431,
        lng: 75.362,
        formatted: '22.431° N, 75.362° E'
      },
      visualEvidence: {
        inputImageUrl: SATELLITE_SAMPLE_IMAGES.waterBodyInput,
        detectedRegionUrl: SATELLITE_SAMPLE_IMAGES.waterBodyInput,
        detectedObject: 'Rural & Riparian Landscape',
        approximateRegion: 'Full scene overview',
        detectedArea: '18.60 km²',
        coordinates: {
          lat: 22.431,
          lng: 75.362,
          formatted: '22.431° N, 75.362° E'
        }
      },
      insights: [
        'Image validated successfully',
        'Query classified as VQA (Scene Description)',
        'Remote-Sensing VLM executed',
        'Multi-class land cover breakdown computed',
        'Response generated'
      ],
      metadata: {
        sensor: 'Sentinel-2 MSI Level-2A',
        platform: 'ESA Copernicus Constellation',
        acquisitionDate: '2026-08-14 05:42 UTC',
        resolutionGsd: '10.0 meters/pixel',
        bandsUsed: ['B04 (Red)', 'B03 (Green)', 'B02 (Blue)'],
        projection: 'WGS 84 (EPSG:4326)',
        cloudCoverPercentage: 0.4
      },
      executionTrace: [
        {
          id: 'step-1',
          stepNumber: 1,
          label: 'Input Validated',
          detail: 'Satellite frame verified with valid projection and radiometry.',
          status: 'completed',
          durationMs: 38,
          timestamp: '10:25:12.010'
        },
        {
          id: 'step-2',
          stepNumber: 2,
          label: 'Query Classified → VQA',
          detail: 'Intent classified as open-ended Visual Question Answering regarding scene contents.',
          status: 'completed',
          durationMs: 98,
          timestamp: '10:25:12.048'
        },
        {
          id: 'step-3',
          stepNumber: 3,
          label: 'VLM Specialist Selected',
          detail: 'Selected RS-VLM-v1.8 fine-tuned on multi-spectral Earth Observation benchmarks.',
          status: 'completed',
          durationMs: 72,
          timestamp: '10:25:12.146'
        },
        {
          id: 'step-4',
          stepNumber: 4,
          label: 'Model Executed',
          detail: 'Cross-attention generated across visual tokens and query embeddings.',
          status: 'completed',
          durationMs: 340,
          timestamp: '10:25:12.218'
        },
        {
          id: 'step-5',
          stepNumber: 5,
          label: 'Evidence Generated',
          detail: 'Land cover distribution: 68% Cropland, 18% Surface Water, 14% Fallow/Barren.',
          status: 'completed',
          durationMs: 50,
          timestamp: '10:25:12.558'
        },
        {
          id: 'step-6',
          stepNumber: 6,
          label: 'Response Generated',
          detail: 'Synthesized factual scene description.',
          status: 'completed',
          durationMs: 35,
          timestamp: '10:25:12.608'
        }
      ]
    };
  }

  // Scenario 3: Built-up Area / Urban Grounding
  if (normalizedQuery.includes('built') || normalizedQuery.includes('urban') || normalizedQuery.includes('city')) {
    return {
      taskId: 'TASK-URBAN-2026-0906',
      status: 'completed',
      task: 'Visual Grounding',
      model: 'GeoAI Urban Extraction Tool (RS-Urban-v1.4)',
      answer: 'Light human settlement and agricultural farmsteads are concentrated predominantly along the western transport corridors. No dense metropolitan built-up zones are detected in this frame.',
      confidence: 0.85,
      detectedArea: '0.48 km²',
      coordinates: {
        lat: 22.428,
        lng: 75.355,
        formatted: '22.428° N, 75.355° E'
      },
      visualEvidence: {
        inputImageUrl: SATELLITE_SAMPLE_IMAGES.waterBodyInput,
        detectedRegionUrl: SATELLITE_SAMPLE_IMAGES.waterBodyGroundingOutput,
        detectedObject: 'Built-up Settlements',
        approximateRegion: 'Western boundary corridors',
        detectedArea: '0.48 km²',
        coordinates: {
          lat: 22.428,
          lng: 75.355,
          formatted: '22.428° N, 75.355° E'
        }
      },
      insights: [
        'Image validated successfully',
        'Query classified as Built-up Grounding',
        'RS-Urban model executed',
        'Impervious surface indices computed (NDBI)',
        'Response generated'
      ],
      metadata: {
        sensor: 'Sentinel-2 MSI Level-2A',
        platform: 'ESA Copernicus Constellation',
        acquisitionDate: '2026-08-14 05:42 UTC',
        resolutionGsd: '10.0 meters/pixel',
        bandsUsed: ['B04 (Red)', 'B11 (SWIR)'],
        projection: 'WGS 84 (EPSG:4326)',
        cloudCoverPercentage: 0.4
      },
      executionTrace: [
        { id: 'step-1', stepNumber: 1, label: 'Input Validated', detail: 'Checked band compatibility.', status: 'completed', durationMs: 35 },
        { id: 'step-2', stepNumber: 2, label: 'Query Classified → Grounding', detail: 'Target entity: Built-up structures.', status: 'completed', durationMs: 90 },
        { id: 'step-3', stepNumber: 3, label: 'Model Selected', detail: 'Selected RS-Urban-v1.4 SWIR-aided detector.', status: 'completed', durationMs: 80 },
        { id: 'step-4', stepNumber: 4, label: 'Model Executed', detail: 'Extracted impervious surface index (NDBI).', status: 'completed', durationMs: 290 },
        { id: 'step-5', stepNumber: 5, label: 'Evidence Generated', detail: 'Localized 12 settlement clusters.', status: 'completed', durationMs: 40 },
        { id: 'step-6', stepNumber: 6, label: 'Response Generated', detail: 'Synthesized report.', status: 'completed', durationMs: 30 }
      ]
    };
  }

  // Fallback / General remote sensing grounding scenario
  return {
    taskId: 'TASK-GEN-2026-0907',
    status: 'completed',
    task: 'Visual Grounding',
    model: 'Remote-Sensing Grounding Model (RS-Grounding-v2.1)',
    answer: `Analysis complete for: "${query}". Relevant geospatial features have been identified and correlated with multi-spectral reflectance signatures.`,
    confidence: 0.89,
    detectedArea: '2.34 km²',
    coordinates: {
      lat: 22.431,
      lng: 75.362,
      formatted: '22.431° N, 75.362° E'
    },
    visualEvidence: {
      inputImageUrl: SATELLITE_SAMPLE_IMAGES.waterBodyInput,
      detectedRegionUrl: SATELLITE_SAMPLE_IMAGES.waterBodyGroundingOutput,
      detectedObject: 'Target Feature',
      approximateRegion: 'Identified Spatial Region',
      detectedArea: '2.34 km²',
      coordinates: {
        lat: 22.431,
        lng: 75.362,
        formatted: '22.431° N, 75.362° E'
      }
    },
    insights: [
      'Image validated successfully',
      'Query analyzed by Geospatial Agent',
      'Specialist remote-sensing model executed',
      'Spatial boundaries localized',
      'Response generated'
    ],
    metadata: {
      sensor: 'Sentinel-2 MSI Level-2A',
      platform: 'ESA Copernicus Constellation',
      acquisitionDate: '2026-08-14 05:42 UTC',
      resolutionGsd: '10.0 meters/pixel',
      bandsUsed: ['B04 (Red)', 'B03 (Green)', 'B02 (Blue)', 'B08 (NIR)'],
      projection: 'WGS 84 (EPSG:4326)',
      cloudCoverPercentage: 0.4
    },
    executionTrace: [
      { id: 'step-1', stepNumber: 1, label: 'Input Validated', detail: 'Payload verified.', status: 'completed', durationMs: 40 },
      { id: 'step-2', stepNumber: 2, label: 'Query Understood', detail: 'Query processed and tokenized.', status: 'completed', durationMs: 85 },
      { id: 'step-3', stepNumber: 3, label: 'Specialist Model Selected', detail: 'RS-Grounding-v2.1 selected.', status: 'completed', durationMs: 70 },
      { id: 'step-4', stepNumber: 4, label: 'Analysis Completed', detail: 'Feature extraction finished.', status: 'completed', durationMs: 280 },
      { id: 'step-5', stepNumber: 5, label: 'Evidence Generated', detail: 'Mask rendered.', status: 'completed', durationMs: 50 },
      { id: 'step-6', stepNumber: 6, label: 'Response Generated', detail: 'Delivered answer.', status: 'completed', durationMs: 35 }
    ]
  };
}
