// SHARED — variants: primary (dark, for auth submits), accent (amber, for
// save/create/validate actions), ghost (secondary), danger (destructive/cancel).
const VARIANTS = {
  primary: 'bg-ink text-white border-ink hover:bg-[#333a35]',
  accent: 'bg-accent text-accent-ink border-accent hover:bg-[#d6952f]',
  ghost: 'bg-transparent text-ink border-line hover:border-ink-soft',
  danger: 'bg-transparent text-bad border-bad hover:bg-[#F5DAD4]',
};

export default function Button({ variant = 'ghost', className = '', children, ...props }) {
  return (
    <button
      className={`px-3.5 py-2 text-[12.5px] font-semibold font-body border rounded
        transition-colors disabled:opacity-35 disabled:cursor-not-allowed
        ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
