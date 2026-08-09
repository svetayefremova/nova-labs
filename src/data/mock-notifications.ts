export type NotificationType =
  | 'critical'
  | 'study'
  | 'document'
  | 'care-team'
  | 'appointment'
  | 'security';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

export const NOTIFICATIONS_NEW: Notification[] = [
  {
    id: '1',
    type: 'critical',
    title: 'New OR-4 finding · Liver',
    body: "A probably-malignant lesion was flagged in Maya R. Ellis' whole-body study. Tissue sampling advised.",
    time: '2m',
    unread: true,
  },
  {
    id: '2',
    type: 'study',
    title: 'MRI Brain processed · 40 findings',
    body: 'Analysis of the 18 Mar 2026 study is complete and ready for review.',
    time: '1h',
    unread: true,
  },
  {
    id: '3',
    type: 'document',
    title: 'Radiology report uploaded',
    body: 'Dr. R. Mehta added "MRI Brain with & without Contrast" to your records.',
    time: '3h',
    unread: true,
  },
];

export const NOTIFICATIONS_EARLIER: Notification[] = [
  {
    id: '4',
    type: 'care-team',
    title: 'Dr. R. Mehta added a recommendation',
    body: 'Neurology referral and DAT-SPECT correlation advised for the nigrosome-1 finding.',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: '5',
    type: 'appointment',
    title: 'Neurology follow-up · 24 Apr',
    body: '10:30 AM with Dr. R. Mehta. Tap to add to calendar.',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: '6',
    type: 'security',
    title: 'New sign-in detected',
    body: 'Your account was accessed from a new device on iPhone 15 Pro · iOS 18.',
    time: '2d',
    unread: false,
  },
];
