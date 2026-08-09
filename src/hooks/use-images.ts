import type { DicomSeries } from '@/src/types/domain';

import { useScanReports } from './use-scan-reports';

export function useImages(): DicomSeries[] {
  return useScanReports();
}
