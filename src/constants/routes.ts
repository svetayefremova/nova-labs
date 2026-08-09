export const Routes = {
  home: '/(tabs)/(home)',
  images: '/(tabs)/(images)',
  documents: '/(tabs)/(documents)',
  documentDetail: '/document-detail',
  sectionDetail: '/section-detail',
  imageViewer: '/image-viewer',
  fileViewer: '/(tabs)/(documents)/file-viewer',
  overview: '/(tabs)/(home)/overview',
  profile: '/(tabs)/(home)/update-profile',
} as const;

export type Route = (typeof Routes)[keyof typeof Routes];
