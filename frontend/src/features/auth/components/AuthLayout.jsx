// src/features/auth/components/AuthLayout.jsx
// Public-side layout (login/signup/forgot/reset) — separate from AppLayout,
// which is only for authenticated pages.

export default function AuthLayout({ tagline, stat, children }) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex flex-1 flex-col justify-between bg-side text-side-ink p-12">
        <div className="font-display text-xl font-bold">StockSense</div>
        <div>
          <p className="max-w-xs text-side-soft text-sm leading-relaxed">{tagline}</p>
          {stat && (
            <div className="border-t border-side-line pt-3.5 mt-3.5">
              <b className="block text-2xl font-display text-accent">{stat.value}</b>
              <span className="text-side-soft text-xs">{stat.label}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-8 bg-bg">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
