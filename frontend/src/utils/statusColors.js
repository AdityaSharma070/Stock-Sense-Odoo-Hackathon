// Maps a lifecycle status to the Tailwind classes used by <Badge />.
// Every feature (receipts, deliveries, adjustments) shares this — don't
// redefine status colors locally, import from here.
export const STATUS_STYLES = {
  draft: 'bg-border text-ink-soft',
  waiting: 'bg-[#F7E7C6] text-warn',
  ready: 'bg-[#DCEFE1] text-good',
  done: 'bg-[#D8E6E0] text-[#2F5C46]',
  cancelled: 'bg-[#F5DAD4] text-bad',
};

export const getStatusClasses = (status) =>
  STATUS_STYLES[String(status).toLowerCase()] || STATUS_STYLES.draft;
