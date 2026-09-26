// src/components/ui/Modal.jsx
// Usage: <Modal open={isOpen} onClose={() => setOpen(false)} title="Add warehouse">...</Modal>

export default function Modal({ open, onClose, title, children, width = 'max-w-md' }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <div className={['w-full rounded bg-surface border border-border', width].join(' ')}>
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <h3 className="font-display text-sm font-semibold">{title}</h3>
          <button onClick={onClose} className="text-ink-soft hover:text-ink" aria-label="Close">
            ✕
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}