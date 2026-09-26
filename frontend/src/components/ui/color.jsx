export const STATUS_MAP = {
  draft: { label: 'Draft', className: 'bg-border text-ink-soft' },
  waiting: { label: 'Waiting', className: 'bg-[#FBF0DB] text-warn' },
  ready: { label: 'Ready', className: 'bg-[#E7F0E8] text-good' },
  done: { label: 'Done', className: 'bg-[#E9EAE7] text-ink-soft' },
  cancelled: { label: 'Cancelled', className: 'bg-[#F3DCD8] text-bad' },
};

export function getStatusEntry(status) {
  return STATUS_MAP[status?.toLowerCase()] ?? { label: status, className: 'bg-border text-ink-soft' };
}