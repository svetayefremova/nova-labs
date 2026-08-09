import type { Severity } from '@/src/constants/severity';

export type SeverityCounts = Record<Severity, number>;

export type QuantitativeRow = {
  label: string;
  value: string;
  highlight?: boolean;
};

export type Finding = {
  id: string;
  severity: Severity;
  name: string;
  description: string;
  location?: string;
  meta?: string;
  quantitative?: QuantitativeRow[];
  recommendation?: string;
  keyImages?: number[];
};

export type OncoRadsScore = 1 | 2 | 3 | 4 | 5;

export type Section = {
  id: string;
  name: string;
  subtitle: string;
  counts: SeverityCounts;
  oncoRads?: OncoRadsScore;
  oncoRadsHistory?: OncoRadsScore[];
  recommendation?: string;
};

export type ScanData = {
  patientName: string;
  mrn: string;
  scanInfo: string;
  sections: Section[];
};

export type DocumentSection = {
  title: string;
  body: string;
};

export type Document = {
  id: string;
  title: string;
  type: string;
  date: string;
  size: string;
  author?: string;
  pages?: string;
  sections?: DocumentSection[];
  uri?: string;
  mimeType?: string;
};

export type DicomModality = 'MRI' | 'CT' | 'PET' | 'XR';

export type ScanReport = DicomSeries & {
  scanInfo: string;
  sections: Section[];
};

export type ScanType = 'brain' | 'whole-body';

export type DicomSeries = {
  id: string;
  modality: DicomModality;
  region: string;
  scanType: ScanType;
  description: string;
  date: string;
  studyCode: string;
  seriesCount: number;
  sliceCount: number;
  src?: string | number;
};

export type RegionReading = {
  name: string;
  label: string;
  pct: number;
  severity: Severity;
};

export type PickedFile = {
  uri: string;
  name: string;
  size: number;
  mimeType?: string;
};
