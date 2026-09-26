import { useState } from 'react';
import Button from '../../../components/ui/Button';
import ConfirmDialog from '../../../components/ui/ConfirmDialog';

// Confirm dialog before validation — validating applies the stock update and can't be undone.
export default function ValidateButton({ onValidate, disabled }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="accent" disabled={disabled} onClick={() => setOpen(true)}>Validate</Button>
      <ConfirmDialog
        open={open}
        title="Validate this receipt?"
        message="Stock will increase for every line on this receipt and the move is logged to the ledger. This can't be undone."
        confirmLabel="Validate"
        onConfirm={() => { onValidate?.(); setOpen(false); }}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
