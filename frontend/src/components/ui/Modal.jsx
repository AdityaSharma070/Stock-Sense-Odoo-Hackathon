export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <div className="bg-surface border border-border rounded w-full max-w-md p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-[15px]">{title}</h3>
          <button onClick={onClose} className="text-ink-soft hover:text-ink text-sm">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
