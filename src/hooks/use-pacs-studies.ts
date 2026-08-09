import { useEffect, useState } from 'react';

import { DEBUG_PATIENT_ID } from '@/src/data-sources/config';
import { createDicomWebClient } from '@/src/data-sources/dicomweb/client';
import { searchForSeriesInStudy, searchForStudies } from '@/src/data-sources/dicomweb/qido';
import type { StudyWithSeries } from '@/src/types/dicomweb';
import type { DicomModality, DicomSeries } from '@/src/types/domain';

const SUPPORTED_MODALITIES: DicomModality[] = ['MRI', 'CT', 'PET', 'XR'];

function toModality(raw: string): DicomModality {
  const upper = raw.toUpperCase() as DicomModality;
  return SUPPORTED_MODALITIES.includes(upper) ? upper : 'MRI';
}

export type PacsStudiesState = {
  studies: StudyWithSeries[];
  series: DicomSeries[];
  isLoading: boolean;
  error: Error | null;
};

export function usePacsStudies(patientID?: string): PacsStudiesState {
  const [state, setState] = useState<PacsStudiesState>({
    studies: [],
    series: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const resolvedPatientID = patientID ?? DEBUG_PATIENT_ID;
    let cancelled = false;
    const handle = createDicomWebClient();

    (async () => {
      try {
        const rawStudies = await searchForStudies(handle.client, { patientID: resolvedPatientID });

        const studiesWithSeries: StudyWithSeries[] = await Promise.all(
          rawStudies.map(async (study) => ({
            study,
            series: await searchForSeriesInStudy(handle.client, study.studyInstanceUid),
          })),
        );

        const series: DicomSeries[] = studiesWithSeries.flatMap(({ series: s }) =>
          s.map((sr, i) => ({
            id: sr.seriesInstanceUid || String(i),
            modality: toModality(sr.modality),
            region: '',
            scanType: 'brain' as const,
            description: sr.description,
            date: sr.seriesDate,
            studyCode: sr.studyInstanceUid,
            seriesCount: 1,
            sliceCount: sr.instanceCount,
          })),
        );

        if (!cancelled)
          setState({ studies: studiesWithSeries, series, isLoading: false, error: null });
      } catch (err) {
        if (!cancelled)
          setState({ studies: [], series: [], isLoading: false, error: err as Error });
      }
    })();

    return () => {
      cancelled = true;
      handle.abortAll();
    };
  }, [patientID]);

  return state;
}
