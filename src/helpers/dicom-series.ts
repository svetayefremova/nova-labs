import { format, isValid, parse } from 'date-fns';

import type { QidoSeriesResult } from '@/src/types/dicomweb';

export function formatDicomDate(raw: string): string {
  if (!raw) return '';
  const parsed = parse(raw, 'yyyyMMdd', new Date());
  return isValid(parsed) ? format(parsed, 'd MMM yyyy') : raw;
}

export function isKeyImage(s: QidoSeriesResult): boolean {
  return (
    s.instanceCount === 1 ||
    s.description?.toLowerCase().includes('key') === true
  );
}
