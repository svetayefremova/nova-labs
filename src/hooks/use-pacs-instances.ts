import { useEffect, useState } from 'react';

import { createDicomWebClient, resolveWadoUri } from '@/src/data-sources/dicomweb/client';
import { searchForInstances } from '@/src/data-sources/dicomweb/qido';

type PacsInstancesState = {
  urls: string[];
  sopUIDs: string[];
  isLoading: boolean;
  error: Error | null;
};

export function usePacsInstances(
  studyInstanceUID: string | undefined,
  seriesInstanceUID: string | undefined,
): PacsInstancesState {
  const [state, setState] = useState<PacsInstancesState>({
    urls: [],
    sopUIDs: [],
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    if (!studyInstanceUID || !seriesInstanceUID) {
      setState({ urls: [], sopUIDs: [], isLoading: false, error: null });
      return;
    }

    let cancelled = false;
    setState({ urls: [], sopUIDs: [], isLoading: true, error: null });

    const handle = createDicomWebClient();

    (async () => {
      try {
        const wadoUri = resolveWadoUri();
        const sopUIDs = await searchForInstances(handle.client, studyInstanceUID, seriesInstanceUID);
        const urls = sopUIDs.map(
          (sop) =>
            `${wadoUri}?requestType=WADO&studyUID=${studyInstanceUID}&seriesUID=${seriesInstanceUID}&objectUID=${sop}&contentType=application%2Fdicom`,
        );
        if (!cancelled) setState({ urls, sopUIDs, isLoading: false, error: null });
      } catch (err) {
        if (!cancelled) setState({ urls: [], sopUIDs: [], isLoading: false, error: err as Error });
      }
    })();

    return () => {
      cancelled = true;
      handle.abortAll();
    };
  }, [studyInstanceUID, seriesInstanceUID]);

  return state;
}
