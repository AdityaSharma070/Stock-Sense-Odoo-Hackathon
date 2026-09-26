export default function Input({ label, error, className = '', ...props }) {
  return (
    <label className="block mb-3.5">
      {label && <span className="block text-[11px] font-semibold text-ink-soft mb-1">{label}</span>}
      <input
        className={`w-full bg-surface border rounded px-2.5 py-2 text-[13px] font-body
          focus:outline-none focus:ring-2 focus:ring-accent/25 focus:border-accent
          ${error ? 'border-bad' : 'border-line'} ${className}`}
        {...props}
      />
      {error && <span className="block text-[11px] text-bad mt-1">{error}</span>}
    </label>
  );
}
