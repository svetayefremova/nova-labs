import { mockScanReports, PATIENT } from '@/src/data/scan-reports';
import type { ScanData } from '@/src/types/domain';

// Aggregates all sections across all scans — used by useFindings / section-detail.
export function useScanData(): ScanData {
  return {
    patientName: PATIENT.patientName,
    mrn: PATIENT.mrn,
    scanInfo: mockScanReports[0]?.scanInfo ?? '',
    sections: mockScanReports.flatMap((r) => r.sections),
  };
}
