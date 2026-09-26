// src/components/ui/EmptyState.jsx
export default function EmptyState({ label = 'No records found', hint, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-14 text-center">
      <p className="text-sm text-ink-soft">{label}</p>
      {hint && <p className="text-xs text-ink-soft/70">{hint}</p>}
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}