// src/features/adjustments/components/AdjustmentForm.jsx
import { useState, useEffect } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

/**
 * @param {Array} productOptions
 * @param {Array} locationOptions
 * @param {function} onLookupCurrentQuantity - (productId, locationId) => Promise<number>
 * @param {function} onSubmit - (payload) => void
 */
export default function AdjustmentForm({
  productOptions = [],
  locationOptions = [],
  onLookupCurrentQuantity,
  onSubmit,
  submitting = false,
}) {
  const [productId, setProductId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [recordedQuantity, setRecordedQuantity] = useState(null);
  const [countedQuantity, setCountedQuantity] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (productId && locationId && onLookupCurrentQuantity) {
      onLookupCurrentQuantity(productId, locationId).then(setRecordedQuantity);
    } else {
      setRecordedQuantity(null);
    }
  }, [productId, locationId, onLookupCurrentQuantity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      productId,
      locationId,
      oldQuantity: recordedQuantity,
      newQuantity: Number(countedQuantity),
      reason,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-sm border border-border bg-surface p-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Select
          label="Product"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          options={productOptions}
          placeholder="Select a product…"
          required
        />
        <Select
          label="Location"
          value={locationId}
          onChange={(e) => setLocationId(e.target.value)}
          options={locationOptions}
          placeholder="Select a location…"
          required
        />
        <div>
          <p className="mb-1.5 text-[11px] font-semibold text-ink-soft">Recorded quantity</p>
          <p className="rounded-sm bg-[#F8F9F6] px-3 py-2 text-sm text-ink-soft">
            {recordedQuantity === null ? '—' : recordedQuantity}
          </p>
        </div>
        <Input
          label="Counted quantity"
          type="number"
          min="0"
          value={countedQuantity}
          onChange={(e) => setCountedQuantity(e.target.value)}
          placeholder="Enter physical count"
          required
        />
      </div>

      <h3 className="mt-8 mb-3 border-t border-border pt-5 text-xs font-semibold text-ink-soft">Reason</h3>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Why does the count differ — damage, shrinkage, miscount…"
        className="min-h-[80px] w-full rounded-sm border border-line bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        required
      />

      <div className="mt-6 flex justify-end">
        <Button type="submit" variant="accent" loading={submitting} disabled={recordedQuantity === null}>
          Submit Adjustment
        </Button>
      </div>
    </form>
  );
}
