import type { ScanData } from '@/src/types/domain';

export const mockScanData: ScanData = {
  patientName: 'Svitlana Yefremova',
  mrn: 'MRN-20481',
  scanInfo: 'MRI Brain · 1.5T · 2024-11-14 · 312 slices',
  sections: [
    {
      id: 'frontal',
      name: 'Frontal Lobe',
      subtitle: 'Bilateral assessment',
      counts: { critical: 0, benign: 2, normal: 14 },
    },
    {
      id: 'temporal',
      name: 'Temporal Lobe',
      subtitle: 'Bilateral assessment',
      counts: { critical: 1, benign: 0, normal: 11 },
    },
    {
      id: 'parietal',
      name: 'Parietal Lobe',
      subtitle: 'Bilateral assessment',
      counts: { critical: 0, benign: 1, normal: 9 },
    },
    {
      id: 'occipital',
      name: 'Occipital Lobe',
      subtitle: 'Bilateral assessment',
      counts: { critical: 0, benign: 0, normal: 8 },
    },
    {
      id: 'cerebellum',
      name: 'Cerebellum',
      subtitle: 'Including vermis',
      counts: { critical: 0, benign: 1, normal: 6 },
    },
  ],
};
