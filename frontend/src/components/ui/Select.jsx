export default function Select({ label, options = [], className = '', ...props }) {
  return (
    <label className="block mb-3.5">
      {label && <span className="block text-[11px] font-semibold text-ink-soft mb-1">{label}</span>}
      <select
        className={`w-full bg-surface border border-line rounded px-2.5 py-2 text-[13px] font-body
          focus:outline-none focus:ring-2 focus:ring-accent/25 focus:border-accent ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
    </label>
  );
}
