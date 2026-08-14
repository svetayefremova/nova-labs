export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function fileExtLabel(name: string, mimeType?: string): string {
  if (mimeType?.includes('pdf')) return 'PDF';
  if (mimeType?.includes('png')) return 'PNG';
  if (mimeType?.includes('jpeg') || mimeType?.includes('jpg')) return 'JPG';
  if (mimeType?.includes('dicom') || name.toLowerCase().endsWith('.dcm'))
    return 'DCM';
  const ext = name.split('.').pop()?.toUpperCase();
  return ext ?? 'FILE';
}
