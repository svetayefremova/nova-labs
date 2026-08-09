import { File } from 'expo-file-system';
import { useEffect, useState } from 'react';
import { Image } from 'react-native';

import { uint8ToBase64 } from '@/src/helpers/uint8-to-base64';

export function useBase64(src: string | number | undefined): string | null {
  const [base64, setBase64] = useState<string | null>(null);

  useEffect(() => {
    if (!src) {
      setBase64(null);
      return;
    }

    let cancelled = false;
    const controller = new AbortController();
    setBase64(null);
    const uri = typeof src === 'string' ? src : Image.resolveAssetSource(src).uri;

    (async () => {
      try {
        if (uri.startsWith('file://')) {
          const bytes = await new File(uri).bytes();
          if (!cancelled) setBase64(uint8ToBase64(bytes));
        } else {
          const r = await fetch(uri, { signal: controller.signal });
          const buf = await r.arrayBuffer();
          if (!cancelled) setBase64(uint8ToBase64(new Uint8Array(buf)));
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error('[DicomViewer] load error:', err);
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [src]);

  return base64;
}
