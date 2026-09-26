// src/components/ui/Button.jsx
const variants = {
  primary: 'bg-ink text-white border-ink hover:opacity-90',
  accent: 'bg-accent text-accent-ink border-accent hover:opacity-90',
  outline: 'bg-transparent text-ink border-line hover:bg-bg',
  ghost: 'bg-transparent text-ink-soft border-transparent hover:text-ink',
  danger: 'bg-bad text-white border-bad hover:opacity-90',
};

export default function Button({
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-1.5 rounded border px-4 py-2.5',
        'text-sm font-semibold font-sans transition-opacity',
        variants[variant],
        fullWidth ? 'w-full' : '',
        disabled ? 'opacity-50 cursor-not-allowed hover:opacity-50' : 'cursor-pointer',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
}