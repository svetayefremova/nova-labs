export const DOC_TYPES = ['report', 'imaging', 'referral', 'lab', 'other'] as const;
export type DocType = (typeof DOC_TYPES)[number];
