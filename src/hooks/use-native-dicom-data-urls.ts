import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { api } from 'dicomweb-client';

import { createDicomWebClient } from '@/src/data-sources/dicomweb/client';
import { uint8ToBase64 } from '@/src/helpers/uint8-to-base64';

type State = {
  dataUrls: string[];
  isLoading: boolean;
  error: Error | null;
};

const MAX_CONCURRENT = 4;

async function fetchWithConcurrency(
  dicomClient: api.DICOMwebClient,
  studyInstanceUID: string,
  seriesInstanceUID: string,
  sopUIDs: string[],
): Promise<ArrayBuffer[]> {
  const results: ArrayBuffer[] = new Array(sopUIDs.length);
  let index = 0;

  async function worker() {
    while (index < sopUIDs.length) {
      const i = index++;
      results[i] = await dicomClient.retrieveInstance({
        studyInstanceUID,
        seriesInstanceUID,
        sopInstanceUID: sopUIDs[i],
      });
    }
  }

  await Promise.all(Array.from({ length: Math.min(MAX_CONCURRENT, sopUIDs.length) }, worker));
  return results;
}

/**
 * Fetches all SOP instances via dicomweb-client WADO-RS (same /rs path as QIDO),
 * converts each to a data: URL, and returns them for use with loadFromUrls.
 *
 * Data URLs are same-origin inside the WebView so cornerstone can XHR-fetch them
 * without hitting iOS WKWebView's null-origin CORS block.
 * Requests are capped at MAX_CONCURRENT to avoid overwhelming the PACS over VPN.
 */
export function useNativeDicomDataUrls(
  studyInstanceUID: string | undefined,
  seriesInstanceUID: string | undefined,
  sopUIDs: string[],
): State {
  const [state, setState] = useState<State>({ dataUrls: [], isLoading: false, error: null });

  // sopUIDs.join(',') is a stable string dep: compares by value, not reference.
  // This fires when the series changes AND when sopUIDs loads ([] → ['uid1',...]).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sopUIDsKey = sopUIDs.join(',');

  useEffect(() => {
    if (Platform.OS === 'web' || !studyInstanceUID || !seriesInstanceUID || sopUIDs.length === 0) {
      setState({ dataUrls: [], isLoading: false, error: null });
      return;
    }

    let cancelled = false;
    setState({ dataUrls: [], isLoading: true, error: null });

    const { client: dicomClient } = createDicomWebClient();

    (async () => {
      try {
        const buffers = await fetchWithConcurrency(
          dicomClient,
          studyInstanceUID,
          seriesInstanceUID,
          sopUIDs,
        );
        const dataUrls = buffers.map(
          (buf) => `data:application/dicom;base64,${uint8ToBase64(new Uint8Array(buf))}`,
        );
        if (!cancelled) setState({ dataUrls, isLoading: false, error: null });
      } catch (err) {
        if (!cancelled) {
          console.error('[DicomViewer] retrieveInstance error:', err);
          setState({ dataUrls: [], isLoading: false, error: err as Error });
        }
      }
    })();

    return () => {
      // Only set cancelled — aborting mid-request causes dicomweb-client to log
      // internally which Metro's HMR client surfaces as errors. In-flight requests
      // complete naturally; results are discarded via the cancelled flag.
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studyInstanceUID, seriesInstanceUID, sopUIDsKey]);

  return state;
}
