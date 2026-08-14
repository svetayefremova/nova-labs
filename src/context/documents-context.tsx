import { createContext, type ReactNode, useContext, useState } from 'react';

import type { DocType } from '@/src/constants/document';
import { mockDocuments } from '@/src/data/mock-documents';
import { formatBytes } from '@/src/helpers/file';
import type { Document, PickedFile } from '@/src/types/domain';

type DocumentsContextValue = {
  documents: Document[];
  addFromUpload: (files: PickedFile[], type: DocType) => void;
};

const DocumentsContext = createContext<DocumentsContextValue | null>(null);

export function DocumentsProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);

  function addFromUpload(files: PickedFile[], type: DocType) {
    const today = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const newDocs: Document[] = files.map((file) => ({
      id: `uploaded-${file.uri}`,
      title: file.name,
      type,
      date: today,
      size: formatBytes(file.size),
      uri: file.uri,
    }));
    setDocuments((prev) => [...newDocs, ...prev]);
  }

  return (
    <DocumentsContext.Provider value={{ documents, addFromUpload }}>
      {children}
    </DocumentsContext.Provider>
  );
}

export function useDocumentsContext() {
  const ctx = useContext(DocumentsContext);
  if (!ctx)
    throw new Error(
      'useDocumentsContext must be used within DocumentsProvider',
    );
  return ctx;
}
