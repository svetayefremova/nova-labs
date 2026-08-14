import type { Severity } from '@/src/constants/severity';
import type { RegionReading } from '@/src/types/domain';

export type BiomarkerType = 'volume' | 'iron' | 'flow' | 'mrs';

export type BiomarkerInfo = {
  type: BiomarkerType;
  label: string;
  value: string;
  unit: string;
  sub: string;
  severity: Severity;
  regionTitle: string;
  regions: RegionReading[];
  chartTitle: string;
  trend: number[];
  yMin: number;
  yMax: number;
  yTicks: number[];
  baseline: [number, number];
  formatY: (v: number) => string;
};

export const TREND_MONTHS = [
  'Apr 24',
  'Aug 24',
  'Dec 24',
  'Apr 25',
  'Aug 25',
  'Apr 26',
];

type CategoryBiomarkers = Record<BiomarkerType, BiomarkerInfo>;

const LIBRARY: Record<string, CategoryBiomarkers> = {
  parkinson: {
    volume: {
      type: 'volume',
      label: 'Brain Volume',
      value: '−3.8',
      unit: '%',
      sub: 'vs. age-matched norm',
      severity: 'critical',
      chartTitle: 'Volume deviation · 24-month trend',
      trend: [-1.1, -1.7, -2.2, -2.7, -3.1, -3.8],
      yMin: -8,
      yMax: 3,
      yTicks: [-6, -3, 0, 2],
      baseline: [-2, 2],
      formatY: (v) => `${v > 0 ? '+' : ''}${v}`,
      regionTitle: 'Regional volume Δ',
      regions: [
        {
          name: 'Substantia nigra',
          label: '−6.2%',
          pct: 78,
          severity: 'critical',
        },
        { name: 'Putamen', label: '−2.1%', pct: 42, severity: 'benign' },
        {
          name: 'Caudate nucleus',
          label: '+0.4%',
          pct: 18,
          severity: 'normal',
        },
        {
          name: 'Globus pallidus',
          label: '+0.1%',
          pct: 12,
          severity: 'normal',
        },
      ],
    },
    iron: {
      type: 'iron',
      label: 'Iron Level',
      value: '98',
      unit: 'µg/g',
      sub: 'susceptibility · SWI',
      severity: 'critical',
      chartTitle: 'Iron deposition · 24-month trend',
      trend: [71, 76, 82, 87, 92, 98],
      yMin: 40,
      yMax: 110,
      yTicks: [50, 70, 90, 105],
      baseline: [50, 80],
      formatY: (v) => `${Math.round(v)}`,
      regionTitle: 'Regional iron concentration',
      regions: [
        {
          name: 'Substantia nigra',
          label: '112 µg/g',
          pct: 85,
          severity: 'critical',
        },
        { name: 'Putamen', label: '94 µg/g', pct: 65, severity: 'benign' },
        {
          name: 'Caudate nucleus',
          label: '65 µg/g',
          pct: 40,
          severity: 'normal',
        },
        {
          name: 'Globus pallidus',
          label: '58 µg/g',
          pct: 33,
          severity: 'normal',
        },
      ],
    },
    flow: {
      type: 'flow',
      label: 'Blood Flow',
      value: '41',
      unit: 'mL/100g/min',
      sub: 'CBF · pCASL',
      severity: 'critical',
      chartTitle: 'Cerebral blood flow · 24-month trend',
      trend: [57, 53, 50, 47, 44, 41],
      yMin: 30,
      yMax: 70,
      yTicks: [35, 45, 55, 65],
      baseline: [48, 65],
      formatY: (v) => `${Math.round(v)}`,
      regionTitle: 'Regional CBF',
      regions: [
        {
          name: 'Substantia nigra',
          label: '36 mL',
          pct: 72,
          severity: 'critical',
        },
        { name: 'Putamen', label: '44 mL', pct: 48, severity: 'benign' },
        {
          name: 'Caudate nucleus',
          label: '58 mL',
          pct: 26,
          severity: 'normal',
        },
        {
          name: 'Globus pallidus',
          label: '61 mL',
          pct: 22,
          severity: 'normal',
        },
      ],
    },
    mrs: {
      type: 'mrs',
      label: 'MRS',
      value: '1.38',
      unit: 'NAA/Cr',
      sub: 'spectroscopy',
      severity: 'benign',
      chartTitle: 'NAA/Cr ratio · 24-month trend',
      trend: [1.66, 1.61, 1.56, 1.51, 1.46, 1.38],
      yMin: 1.0,
      yMax: 2.2,
      yTicks: [1.2, 1.5, 1.8, 2.1],
      baseline: [1.5, 2.0],
      formatY: (v) => v.toFixed(1),
      regionTitle: 'Regional NAA/Cr',
      regions: [
        {
          name: 'Substantia nigra',
          label: '1.32',
          pct: 68,
          severity: 'critical',
        },
        { name: 'Putamen', label: '1.44', pct: 44, severity: 'benign' },
        { name: 'Caudate nucleus', label: '1.61', pct: 25, severity: 'normal' },
        { name: 'Globus pallidus', label: '1.68', pct: 20, severity: 'normal' },
      ],
    },
  },
  alzheimer: {
    volume: {
      type: 'volume',
      label: 'Brain Volume',
      value: '−4.2',
      unit: '%',
      sub: 'vs. age-matched norm',
      severity: 'critical',
      chartTitle: 'Volume deviation · 24-month trend',
      trend: [-1.4, -2.0, -2.6, -3.1, -3.6, -4.2],
      yMin: -8,
      yMax: 3,
      yTicks: [-6, -3, 0, 2],
      baseline: [-2, 2],
      formatY: (v) => `${v > 0 ? '+' : ''}${v}`,
      regionTitle: 'Regional volume Δ',
      regions: [
        { name: 'Hippocampus', label: '−5.8%', pct: 73, severity: 'critical' },
        {
          name: 'Entorhinal cortex',
          label: '−1.4%',
          pct: 38,
          severity: 'benign',
        },
        { name: 'Parietal lobe', label: '−1.2%', pct: 32, severity: 'benign' },
        {
          name: 'Post. cingulate',
          label: '+0.3%',
          pct: 14,
          severity: 'normal',
        },
      ],
    },
    iron: {
      type: 'iron',
      label: 'Iron Level',
      value: '82',
      unit: 'µg/g',
      sub: 'susceptibility · SWI',
      severity: 'benign',
      chartTitle: 'Iron deposition · 24-month trend',
      trend: [68, 71, 73, 76, 79, 82],
      yMin: 40,
      yMax: 110,
      yTicks: [50, 70, 90, 105],
      baseline: [50, 80],
      formatY: (v) => `${Math.round(v)}`,
      regionTitle: 'Regional iron concentration',
      regions: [
        { name: 'Hippocampus', label: '78 µg/g', pct: 53, severity: 'benign' },
        {
          name: 'Entorhinal cortex',
          label: '68 µg/g',
          pct: 43,
          severity: 'normal',
        },
        {
          name: 'Parietal lobe',
          label: '71 µg/g',
          pct: 46,
          severity: 'normal',
        },
        {
          name: 'Post. cingulate',
          label: '62 µg/g',
          pct: 37,
          severity: 'normal',
        },
      ],
    },
    flow: {
      type: 'flow',
      label: 'Blood Flow',
      value: '43',
      unit: 'mL/100g/min',
      sub: 'CBF · pCASL',
      severity: 'critical',
      chartTitle: 'Cerebral blood flow · 24-month trend',
      trend: [58, 54, 51, 48, 45, 43],
      yMin: 30,
      yMax: 70,
      yTicks: [35, 45, 55, 65],
      baseline: [48, 65],
      formatY: (v) => `${Math.round(v)}`,
      regionTitle: 'Regional CBF',
      regions: [
        { name: 'Hippocampus', label: '38 mL', pct: 76, severity: 'critical' },
        {
          name: 'Entorhinal cortex',
          label: '45 mL',
          pct: 50,
          severity: 'benign',
        },
        { name: 'Parietal lobe', label: '47 mL', pct: 46, severity: 'benign' },
        {
          name: 'Post. cingulate',
          label: '55 mL',
          pct: 30,
          severity: 'normal',
        },
      ],
    },
    mrs: {
      type: 'mrs',
      label: 'MRS',
      value: '1.41',
      unit: 'NAA/Cr',
      sub: 'spectroscopy',
      severity: 'benign',
      chartTitle: 'NAA/Cr ratio · 24-month trend',
      trend: [1.68, 1.63, 1.58, 1.52, 1.47, 1.41],
      yMin: 1.0,
      yMax: 2.2,
      yTicks: [1.2, 1.5, 1.8, 2.1],
      baseline: [1.5, 2.0],
      formatY: (v) => v.toFixed(1),
      regionTitle: 'Regional NAA/Cr',
      regions: [
        { name: 'Hippocampus', label: '1.34', pct: 65, severity: 'critical' },
        {
          name: 'Entorhinal cortex',
          label: '1.46',
          pct: 43,
          severity: 'benign',
        },
        { name: 'Parietal lobe', label: '1.51', pct: 36, severity: 'benign' },
        { name: 'Post. cingulate', label: '1.72', pct: 18, severity: 'normal' },
      ],
    },
  },
  temporal: {
    volume: {
      type: 'volume',
      label: 'Brain Volume',
      value: '−2.4',
      unit: '%',
      sub: 'vs. age-matched norm',
      severity: 'benign',
      chartTitle: 'Volume deviation · 24-month trend',
      trend: [-0.8, -1.1, -1.4, -1.7, -2.0, -2.4],
      yMin: -8,
      yMax: 3,
      yTicks: [-6, -3, 0, 2],
      baseline: [-2, 2],
      formatY: (v) => `${v > 0 ? '+' : ''}${v}`,
      regionTitle: 'Regional volume Δ',
      regions: [
        {
          name: 'Sup. temporal gyrus',
          label: '−4.8%',
          pct: 60,
          severity: 'critical',
        },
        { name: 'Amygdala', label: '−1.6%', pct: 34, severity: 'benign' },
        {
          name: 'Parahippocampal gyrus',
          label: '+0.2%',
          pct: 16,
          severity: 'normal',
        },
      ],
    },
    iron: {
      type: 'iron',
      label: 'Iron Level',
      value: '74',
      unit: 'µg/g',
      sub: 'susceptibility · SWI',
      severity: 'normal',
      chartTitle: 'Iron deposition · 24-month trend',
      trend: [63, 66, 68, 70, 72, 74],
      yMin: 40,
      yMax: 110,
      yTicks: [50, 70, 90, 105],
      baseline: [50, 80],
      formatY: (v) => `${Math.round(v)}`,
      regionTitle: 'Regional iron concentration',
      regions: [
        {
          name: 'Sup. temporal gyrus',
          label: '88 µg/g',
          pct: 62,
          severity: 'benign',
        },
        { name: 'Amygdala', label: '74 µg/g', pct: 49, severity: 'normal' },
        {
          name: 'Parahippocampal gyrus',
          label: '61 µg/g',
          pct: 36,
          severity: 'normal',
        },
      ],
    },
    flow: {
      type: 'flow',
      label: 'Blood Flow',
      value: '39',
      unit: 'mL/100g/min',
      sub: 'CBF · pCASL',
      severity: 'critical',
      chartTitle: 'Cerebral blood flow · 24-month trend',
      trend: [59, 54, 50, 46, 43, 39],
      yMin: 30,
      yMax: 70,
      yTicks: [35, 45, 55, 65],
      baseline: [48, 65],
      formatY: (v) => `${Math.round(v)}`,
      regionTitle: 'Regional CBF',
      regions: [
        {
          name: 'Sup. temporal gyrus',
          label: '34 mL',
          pct: 80,
          severity: 'critical',
        },
        { name: 'Amygdala', label: '42 mL', pct: 57, severity: 'benign' },
        {
          name: 'Parahippocampal gyrus',
          label: '56 mL',
          pct: 32,
          severity: 'normal',
        },
      ],
    },
    mrs: {
      type: 'mrs',
      label: 'MRS',
      value: '1.44',
      unit: 'NAA/Cr',
      sub: 'spectroscopy',
      severity: 'benign',
      chartTitle: 'NAA/Cr ratio · 24-month trend',
      trend: [1.7, 1.65, 1.6, 1.55, 1.5, 1.44],
      yMin: 1.0,
      yMax: 2.2,
      yTicks: [1.2, 1.5, 1.8, 2.1],
      baseline: [1.5, 2.0],
      formatY: (v) => v.toFixed(1),
      regionTitle: 'Regional NAA/Cr',
      regions: [
        {
          name: 'Sup. temporal gyrus',
          label: '1.36',
          pct: 62,
          severity: 'critical',
        },
        { name: 'Amygdala', label: '1.48', pct: 40, severity: 'benign' },
        {
          name: 'Parahippocampal gyrus',
          label: '1.64',
          pct: 22,
          severity: 'normal',
        },
      ],
    },
  },
  lewy: {
    volume: {
      type: 'volume',
      label: 'Brain Volume',
      value: '−2.9',
      unit: '%',
      sub: 'vs. age-matched norm',
      severity: 'benign',
      chartTitle: 'Volume deviation · 24-month trend',
      trend: [-0.9, -1.3, -1.7, -2.1, -2.5, -2.9],
      yMin: -8,
      yMax: 3,
      yTicks: [-6, -3, 0, 2],
      baseline: [-2, 2],
      formatY: (v) => `${v > 0 ? '+' : ''}${v}`,
      regionTitle: 'Regional volume Δ',
      regions: [
        {
          name: 'Locus coeruleus',
          label: '−4.9%',
          pct: 61,
          severity: 'critical',
        },
        {
          name: 'Dorsal motor nucleus',
          label: '−1.8%',
          pct: 38,
          severity: 'benign',
        },
        {
          name: 'Ant. cingulate cortex',
          label: '+0.2%',
          pct: 15,
          severity: 'normal',
        },
      ],
    },
    iron: {
      type: 'iron',
      label: 'Iron Level',
      value: '86',
      unit: 'µg/g',
      sub: 'susceptibility · SWI',
      severity: 'benign',
      chartTitle: 'Iron deposition · 24-month trend',
      trend: [70, 74, 77, 80, 83, 86],
      yMin: 40,
      yMax: 110,
      yTicks: [50, 70, 90, 105],
      baseline: [50, 80],
      formatY: (v) => `${Math.round(v)}`,
      regionTitle: 'Regional iron concentration',
      regions: [
        {
          name: 'Locus coeruleus',
          label: '96 µg/g',
          pct: 70,
          severity: 'benign',
        },
        {
          name: 'Dorsal motor nucleus',
          label: '81 µg/g',
          pct: 55,
          severity: 'benign',
        },
        {
          name: 'Ant. cingulate cortex',
          label: '63 µg/g',
          pct: 38,
          severity: 'normal',
        },
      ],
    },
    flow: {
      type: 'flow',
      label: 'Blood Flow',
      value: '44',
      unit: 'mL/100g/min',
      sub: 'CBF · pCASL',
      severity: 'benign',
      chartTitle: 'Cerebral blood flow · 24-month trend',
      trend: [58, 55, 52, 50, 47, 44],
      yMin: 30,
      yMax: 70,
      yTicks: [35, 45, 55, 65],
      baseline: [48, 65],
      formatY: (v) => `${Math.round(v)}`,
      regionTitle: 'Regional CBF',
      regions: [
        {
          name: 'Locus coeruleus',
          label: '38 mL',
          pct: 76,
          severity: 'critical',
        },
        {
          name: 'Dorsal motor nucleus',
          label: '45 mL',
          pct: 50,
          severity: 'benign',
        },
        {
          name: 'Ant. cingulate cortex',
          label: '57 mL',
          pct: 29,
          severity: 'normal',
        },
      ],
    },
    mrs: {
      type: 'mrs',
      label: 'MRS',
      value: '1.42',
      unit: 'NAA/Cr',
      sub: 'spectroscopy',
      severity: 'benign',
      chartTitle: 'NAA/Cr ratio · 24-month trend',
      trend: [1.67, 1.62, 1.57, 1.52, 1.47, 1.42],
      yMin: 1.0,
      yMax: 2.2,
      yTicks: [1.2, 1.5, 1.8, 2.1],
      baseline: [1.5, 2.0],
      formatY: (v) => v.toFixed(1),
      regionTitle: 'Regional NAA/Cr',
      regions: [
        {
          name: 'Locus coeruleus',
          label: '1.33',
          pct: 67,
          severity: 'critical',
        },
        {
          name: 'Dorsal motor nucleus',
          label: '1.47',
          pct: 42,
          severity: 'benign',
        },
        {
          name: 'Ant. cingulate cortex',
          label: '1.65',
          pct: 21,
          severity: 'normal',
        },
      ],
    },
  },
};

const CATEGORIES = Object.keys(LIBRARY);

function categoryForSection(sectionId: string, fallbackIndex: number): string {
  const id = sectionId.toLowerCase();
  if (/parkinson|basal|nigra|putamen|caudate|striatum/.test(id))
    return 'parkinson';
  if (/alzheimer|hippocampus|memory|entorhinal/.test(id)) return 'alzheimer';
  if (/temporal|auditory|language|gyrus/.test(id)) return 'temporal';
  if (/lewy|coeruleus|brainstem|cingulate/.test(id)) return 'lewy';
  return CATEGORIES[fallbackIndex % CATEGORIES.length];
}

export const BIOMARKER_ORDER: BiomarkerType[] = [
  'volume',
  'iron',
  'flow',
  'mrs',
];

export function biomarkersForSection(
  sectionId: string,
  sectionIndex: number,
): BiomarkerInfo[] {
  const category = categoryForSection(sectionId, sectionIndex);
  const cat = LIBRARY[category] ?? LIBRARY.parkinson;
  return BIOMARKER_ORDER.map((type) => cat[type]);
}
