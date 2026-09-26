// Consistent page heading used across every feature: a small tag, an h1,
// a one-line description, and an optional action slot (e.g. "+ New Product").
export default function PageWrapper({ tag, title, description, actions, children }) {
  return (
    <section>
      <div className="flex items-baseline justify-between flex-wrap gap-2.5 mb-4">
        <div>
          {tag && (
            <span className="inline-block bg-[#EFE3C9] text-accent-ink px-2.5 py-1 rounded text-[11px] font-semibold tracking-wide">
              {tag}
            </span>
          )}
          <h1 className="font-heading font-bold text-[20px] mt-1.5">{title}</h1>
          {description && <p className="text-ink-soft text-[12.5px] mt-0.5">{description}</p>}
        </div>
        {actions && <div className="flex gap-2.5">{actions}</div>}
      </div>
      {children}
    </section>
  );
}
