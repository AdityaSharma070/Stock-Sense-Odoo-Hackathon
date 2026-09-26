// src/components/ui/ConfirmDialog.jsx
import Modal from './Modal';
import Button from './Button';

export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  danger = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal open={open} onClose={onCancel} title={title} width="max-w-sm">
      {message && <p className="mb-5 text-sm text-ink-soft">{message}</p>}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button variant={danger ? 'danger' : 'accent'} onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </Modal>
  );
}