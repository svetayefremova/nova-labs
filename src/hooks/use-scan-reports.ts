import testDicom from '@/assets/test.dcm';
import { mockScanReports, PATIENT } from '@/src/data/scan-reports';
import type { ScanReport } from '@/src/types/domain';

export type { ScanReport };
export { PATIENT };

export function useScanReports(): ScanReport[] {
  return mockScanReports.map((r) => ({ ...r, src: r.src ?? testDicom }));
}
