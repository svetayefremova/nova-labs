export type DicomWebDataSourceConfig = {
  name: string;
  qidoRoot: string;
  wadoRoot: string;
  wadoUri?: string;
  supportsFuzzyMatching?: boolean;
  qidoSupportsIncludeField?: boolean;
};

export type QidoStudyResult = {
  studyInstanceUid: string;
  date: string;
  time: string;
  accession: string;
  mrn: string;
  patientName: string;
  instanceCount: number;
  description: string;
  modalities: string;
};

export type QidoSeriesResult = {
  studyInstanceUid: string;
  seriesInstanceUid: string;
  modality: string;
  seriesNumber: string;
  seriesDate: string;
  instanceCount: number;
  description: string;
  src?: string | number;
};

export type StudyWithSeries = {
  study: QidoStudyResult;
  series: QidoSeriesResult[];
};
