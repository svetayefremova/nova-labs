import type { QidoSeriesResult } from '@/src/types/dicomweb';

// Placeholder series list for the DICOM viewer until the DICOMweb backend
// (PACS client + QIDO/WADO config) is wired up — see usePacsInstances.
export const mockSeries: QidoSeriesResult[] = [
  {
    studyInstanceUid: 'STU-04221',
    seriesInstanceUid: 'SER-04221-1',
    modality: 'MRI',
    seriesNumber: '1',
    seriesDate: '20260422',
    instanceCount: 92,
    description: 'T1 Axial',
  },
  {
    studyInstanceUid: 'STU-04221',
    seriesInstanceUid: 'SER-04221-2',
    modality: 'MRI',
    seriesNumber: '2',
    seriesDate: '20260422',
    instanceCount: 92,
    description: 'T2 Axial',
  },
  {
    studyInstanceUid: 'STU-04221',
    seriesInstanceUid: 'SER-04221-3',
    modality: 'MRI',
    seriesNumber: '3',
    seriesDate: '20260422',
    instanceCount: 88,
    description: 'T2 Coronal',
  },
  {
    studyInstanceUid: 'STU-04221',
    seriesInstanceUid: 'SER-04221-4',
    modality: 'MRI',
    seriesNumber: '4',
    seriesDate: '20260422',
    instanceCount: 88,
    description: 'FLAIR Axial',
  },
  {
    studyInstanceUid: 'STU-04221',
    seriesInstanceUid: 'SER-04221-5',
    modality: 'MRI',
    seriesNumber: '5',
    seriesDate: '20260422',
    instanceCount: 76,
    description: 'DWI Axial',
  },
  {
    studyInstanceUid: 'STU-04221',
    seriesInstanceUid: 'SER-04221-7',
    modality: 'MRI',
    seriesNumber: '7',
    seriesDate: '20260422',
    instanceCount: 64,
    description: 'T1 Post-Contrast Axial',
  },
  {
    studyInstanceUid: 'STU-04221',
    seriesInstanceUid: 'SER-04221-8',
    modality: 'MRI',
    seriesNumber: '8',
    seriesDate: '20260422',
    instanceCount: 60,
    description: 'T1 Post-Contrast Sagittal',
  },
];
