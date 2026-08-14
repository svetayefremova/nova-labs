import type { Severity } from '@/src/constants/severity';
import type {
  Finding,
  QuantitativeRow,
  RegionReading,
} from '@/src/types/domain';

type FindingTemplate = {
  location: string;
  name: string;
  description: string;
  meta: string;
  quantitative?: QuantitativeRow[];
  recommendation?: string;
  keyImages?: number[];
};

type CategoryLibrary = Record<Severity, FindingTemplate>;

const FINDING_LIBRARY: Record<string, CategoryLibrary> = {
  parkinson: {
    critical: {
      location: 'Substantia nigra',
      name: 'Loss of nigrosome-1',
      description:
        'Asymmetric loss of the dorsolateral nigrosome-1 "swallow-tail" sign on SWI, more pronounced on the right. Pattern is consistent with nigrosomal degeneration.',
      meta: 'SWI · 3T · slice 14',
      quantitative: [
        { label: 'Nigrosome signal', value: 'Absent (R)', highlight: true },
        { label: 'Asymmetry index', value: '0.42', highlight: true },
        { label: 'Iron · SWI', value: '98 μg/g' },
        { label: 'Prior study', value: 'New finding' },
      ],
      recommendation:
        'Neurology referral and DAT-SPECT correlation recommended.',
      keyImages: [
        require('@/assets/images/MRI_brain.jpg'),
        require('@/assets/images/MRI_brain.jpg'),
        require('@/assets/images/MRI_brain.jpg'),
      ],
    },
    benign: {
      location: 'Putamen',
      name: 'Age-related iron deposition',
      description:
        'Symmetric T2 hypointensity in the posterolateral putamina without volume loss or signal abnormality of surrounding white matter. Within expected range for age (58y). No interval change vs. Oct 2025 study.',
      meta: 'T2 · stable',
    },
    normal: {
      location: 'Caudate',
      name: 'Globus pallidus',
      description:
        'Bilateral caudate heads and globi pallidi demonstrate normal volume, morphology, and signal characteristics. No evidence of mineralization or atrophy.',
      meta: 'WNL',
    },
  },
  alzheimer: {
    critical: {
      location: 'Hippocampus',
      name: 'Medial temporal atrophy',
      description:
        'Bilateral hippocampal volume loss (MTA grade 2 right, grade 1 left) with widening of the choroidal fissures. Findings concerning for early limbic-predominant degeneration. Recommend volumetric quantification and clinical correlation.',
      meta: 'MTA 2 / 1 · MPRAGE',
    },
    benign: {
      location: 'Parietal lobe',
      name: 'Mild cortical thinning',
      description:
        'Minimal symmetric thinning of the precuneus and posterior parietal cortex without focal signal abnormality. Non-specific finding, may reflect normal aging. Comparison with prior recommended over 12-month interval.',
      meta: 'Δ vs prior: -1.4%',
    },
    normal: {
      location: 'Entorhinal',
      name: 'Posterior cingulate',
      description:
        'Entorhinal cortex thickness and posterior cingulate volume are preserved bilaterally. No regional hypointensity or microbleeds.',
      meta: 'WNL',
    },
  },
  temporal: {
    critical: {
      location: 'Superior temporal gyrus',
      name: 'FLAIR hyperintensity',
      description:
        '8 mm focus of cortical-subcortical FLAIR hyperintensity in the right superior temporal gyrus with mild surrounding edema. No restricted diffusion. Differential includes inflammatory, ischemic, or low-grade neoplastic etiology — short-interval MRI in 6 weeks recommended.',
      meta: 'FLAIR · DWI -',
    },
    benign: {
      location: 'Amygdala',
      name: 'Enlarged perivascular spaces',
      description:
        'Several prominent perivascular spaces along the right amygdala measuring up to 3 mm. CSF signal on all sequences. Benign normal variant, no follow-up required.',
      meta: 'Virchow-Robin',
    },
    normal: {
      location: 'Parahippocampal gyrus',
      name: 'Normal volume and signal',
      description:
        'Symmetric volume and signal of the parahippocampal gyri. No abnormal enhancement or restricted diffusion identified.',
      meta: 'WNL',
    },
  },
  lewy: {
    critical: {
      location: 'Locus coeruleus',
      name: 'Signal loss',
      description:
        'Reduced neuromelanin signal in the locus coeruleus on neuromelanin-sensitive MRI, more prominent caudally. Pattern overlaps with Lewy-body spectrum disorders. Clinical correlation with sleep history and autonomic symptoms recommended.',
      meta: 'NM-MRI',
    },
    benign: {
      location: 'Dorsal motor nucleus',
      name: 'Subtle asymmetry',
      description:
        'Minimal asymmetry of the dorsal motor nucleus signal without volume loss. Likely within range of normal anatomic variation. No pathologic significance in isolation.',
      meta: 'Δ vs prior: stable',
    },
    normal: {
      location: 'Anterior cingulate cortex',
      name: 'Normal signal and thickness',
      description:
        'Anterior cingulate cortex is symmetric in thickness and signal. No focal lesion or abnormal enhancement.',
      meta: 'WNL',
    },
  },
};

const CATEGORIES = Object.keys(FINDING_LIBRARY);

function categoryForSection(sectionId: string, fallbackIndex: number): string {
  const id = sectionId.toLowerCase();
  if (/parkinson|basal|nigra|putamen|caudate|striatum/.test(id))
    return 'parkinson';
  if (/alzheimer|hippocampus|temporal|memory|entorhinal/.test(id))
    return 'alzheimer';
  if (/temporal|auditory|language|gyrus/.test(id)) return 'temporal';
  if (/lewy|coeruleus|brainstem|cingulate/.test(id)) return 'lewy';
  return CATEGORIES[fallbackIndex % CATEGORIES.length];
}

export function findingsForSection(
  sectionId: string,
  sectionIndex: number,
  counts: Record<Severity, number>,
): Finding[] {
  const category = categoryForSection(sectionId, sectionIndex);
  const library = FINDING_LIBRARY[category];
  const severities: Severity[] = ['critical', 'benign', 'normal'];
  const findings: Finding[] = [];

  for (const severity of severities) {
    if (counts[severity] > 0) {
      const template = library[severity];
      findings.push({
        id: `${sectionId}-${severity}`,
        severity,
        location: template.location,
        name: template.name,
        description: template.description,
        meta: template.meta,
        quantitative: template.quantitative,
        recommendation: template.recommendation,
        keyImages: template.keyImages,
      });
    }
  }

  return findings;
}

type RegionTemplate = {
  name: string;
  label: string;
  pct: number;
  severity: Severity;
};

const REGION_LIBRARY: Record<string, RegionTemplate[]> = {
  parkinson: [
    { name: 'Substantia nigra', label: '−6.2%', pct: 78, severity: 'critical' },
    { name: 'Putamen', label: '−2.1%', pct: 42, severity: 'benign' },
    { name: 'Caudate nucleus', label: '+0.4%', pct: 18, severity: 'normal' },
    { name: 'Globus pallidus', label: '+0.1%', pct: 12, severity: 'normal' },
  ],
  alzheimer: [
    { name: 'Hippocampus', label: '−5.8%', pct: 72, severity: 'critical' },
    { name: 'Entorhinal cortex', label: '−1.4%', pct: 38, severity: 'benign' },
    { name: 'Parietal lobe', label: '−1.2%', pct: 32, severity: 'benign' },
    { name: 'Post. cingulate', label: '+0.3%', pct: 14, severity: 'normal' },
  ],
  temporal: [
    {
      name: 'Sup. temporal gyrus',
      label: '42 mL',
      pct: 68,
      severity: 'critical',
    },
    { name: 'Amygdala', label: '51 mL', pct: 36, severity: 'benign' },
    {
      name: 'Parahippocampal gyrus',
      label: '62 mL',
      pct: 20,
      severity: 'normal',
    },
  ],
  lewy: [
    { name: 'Locus coeruleus', label: '−4.9%', pct: 74, severity: 'critical' },
    {
      name: 'Dorsal motor nucleus',
      label: '−1.8%',
      pct: 40,
      severity: 'benign',
    },
    {
      name: 'Ant. cingulate cortex',
      label: '+0.2%',
      pct: 15,
      severity: 'normal',
    },
  ],
};

export function regionsForSection(
  sectionId: string,
  sectionIndex: number,
): RegionReading[] {
  const category = categoryForSection(sectionId, sectionIndex);
  return REGION_LIBRARY[category] ?? [];
}
