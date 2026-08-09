import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image } from 'react-native';

import { uint8ToBase64 } from '@/src/helpers/uint8-to-base64';
import { VIEWER_HTML } from '@/src/helpers/viewer-html';
import type { DicomSeries } from '@/src/types/domain';

export function useIframeViewer(series: DicomSeries, instanceUrls?: string[]) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [totalFrames, setTotalFrames] = useState(0);
  const lastInjectedRef = useRef('');

  const htmlUrl = useMemo(() => {
    const blob = new Blob([VIEWER_HTML], { type: 'text/html' });
    return URL.createObjectURL(blob);
  }, []);

  useEffect(() => () => URL.revokeObjectURL(htmlUrl), [htmlUrl]);

  const handleMessage = useCallback((e: MessageEvent) => {
    if (e.source !== iframeRef.current?.contentWindow) return;
    try {
      const data = JSON.parse(e.data);
      if (data.type === 'ready') setReady(true);
      if (data.type === 'frameChange') {
        setCurrentFrame(data.index);
        setTotalFrames(data.total);
      }
    } catch {}
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  useEffect(() => {
    setCurrentFrame(0);
    setTotalFrames(0);
    lastInjectedRef.current = '';
  }, [series.id]);

  // Send instance URLs to the viewer when available (takes priority over base64).
  useEffect(() => {
    if (!ready || !instanceUrls?.length || !iframeRef.current) return;
    const key = JSON.stringify(instanceUrls);
    if (lastInjectedRef.current === key) return;
    lastInjectedRef.current = key;
    iframeRef.current.contentWindow?.postMessage(
      JSON.stringify({ type: 'loadUrls', urls: instanceUrls }),
      '*',
    );
  }, [ready, instanceUrls]);

  // Base64 fallback — only used when no instance URLs are provided.
  useEffect(() => {
    if (!ready || !series.src || instanceUrls?.length || !iframeRef.current) return;

    let cancelled = false;
    const controller = new AbortController();
    const src =
      typeof series.src === 'string'
        ? series.src
        : Image.resolveAssetSource(series.src as number).uri;

    (async () => {
      try {
        const r = await fetch(src, { signal: controller.signal });
        const buf = await r.arrayBuffer();
        if (cancelled) return;
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ type: 'load64', data: uint8ToBase64(new Uint8Array(buf)) }),
          '*',
        );
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error('[DicomViewer web] fetch error:', err);
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [ready, series.src, instanceUrls]);

  const sendMessage = useCallback((msg: object) => {
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify(msg), '*');
  }, []);

  return { iframeRef, htmlUrl, currentFrame, totalFrames, sendMessage };
}
