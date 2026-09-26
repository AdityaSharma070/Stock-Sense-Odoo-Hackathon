// Display-only formatting. The real reference (REC/2026/0001 etc.) is
// generated server-side by referenceGen.js — this just renders it consistently
// if we ever need to build one client-side before the server responds.
export const REFERENCE_PREFIX = {
  receipt: 'REC',
  delivery: 'DEL',
  adjustment: 'ADJ',
  transfer: 'TRF',
};

export const formatReference = (type, year, seq) =>
  `${REFERENCE_PREFIX[type] || 'REF'}/${year}/${String(seq).padStart(4, '0')}`;
