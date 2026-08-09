import { mockDocuments } from '@/src/data/mock-documents';
import type { Document } from '@/src/types/domain';

export function useDocuments(): Document[] {
  return mockDocuments;
}
