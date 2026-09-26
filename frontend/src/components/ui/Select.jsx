// src/components/ui/Select.jsx
// Usage: <Select label="Warehouse" options={[{value:'wh1', label:'Main Warehouse'}]} {...register} />
// Also accepts plain string options: options={['Main Warehouse', 'Overflow Store']}

export default function Select({ label, error, options = [], id, className = '', ...rest }) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-xs font-semibold text-ink">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={['w-full', error ? 'border-bad focus:ring-bad focus:border-bad' : '', className].join(' ')}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-xs text-bad">{error}</p>}
    </div>
  );
}