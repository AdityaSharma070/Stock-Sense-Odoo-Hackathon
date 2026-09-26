import Modal from './Modal';
import Button from './Button';

// Used before irreversible actions — validating a receipt, cancelling an order.
export default function ConfirmDialog({ open, title = 'Are you sure?', message, confirmLabel = 'Confirm', onConfirm, onCancel }) {
  return (
    <Modal open={open} onClose={onCancel} title={title}>
      {message && <p className="text-[13px] text-ink-soft mb-5">{message}</p>}
      <div className="flex gap-2.5 justify-end">
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button variant="accent" onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </Modal>
  );
}
