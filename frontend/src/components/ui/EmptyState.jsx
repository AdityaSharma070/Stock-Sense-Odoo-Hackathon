export default function EmptyState({ label = 'No records found', hint }) {
  return (
    <div className="py-10 px-5 text-center">
      <div className="text-[12.5px] text-ink-soft">{label}</div>
      {hint && <div className="text-[11px] text-ink-soft/70 mt-1">{hint}</div>}
    </div>
  );
}
