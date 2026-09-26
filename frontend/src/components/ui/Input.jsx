// src/components/ui/Input.jsx
// Usage: <Input label="Name" mono={false} error={errors.name} {...register} />
// Set mono for SKU / reference / OTP fields.

export default function Input({
  label,
  hint,
  error,
  mono = false,
  disabled = false,
  className = '',
  id,
  ...rest
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-xs font-semibold text-ink">
          {label}
        </label>
      )}
      <input
        id={inputId}
        disabled={disabled}
        className={[
          'w-full',
          mono ? 'font-mono' : 'font-sans',
          error ? 'border-bad focus:ring-bad focus:border-bad' : '',
          disabled ? 'bg-bg text-ink-soft cursor-not-allowed' : '',
          className,
        ].join(' ')}
        {...rest}
      />
      {error ? (
        <p className="mt-1.5 text-xs text-bad">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-ink-soft">{hint}</p>
      ) : null}
    </div>
  );
}