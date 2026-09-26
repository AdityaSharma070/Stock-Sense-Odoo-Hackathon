// src/features/adjustments/components/AdjustmentDetail.jsx
import { formatDate } from '../../../utils/formatDate';
import QuantityDiff from './QuantityDiff';

export default function AdjustmentDetail({ adjustment }) {
  if (!adjustment) return null;

  return (
    <div className="rounded-sm border border-border bg-surface p-6">
      <div className="mb-5">
        <h2 className="font-heading text-lg font-semibold text-ink">{adjustment.reference}</h2>
        <p className="text-xs text-ink-soft">
          Logged {formatDate(adjustment.createdAt)} · by {adjustment.adjustedByName}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-[11px] font-semibold text-ink-soft">Product</p>
          <p className="rounded-sm bg-[#F8F9F6] px-3 py-2 text-sm text-ink-soft">{adjustment.productName}</p>
        </div>
        <div>
          <p className="mb-1.5 text-[11px] font-semibold text-ink-soft">Location</p>
          <p className="rounded-sm bg-[#F8F9F6] px-3 py-2 text-sm text-ink-soft">{adjustment.locationName}</p>
        </div>
      </div>

      <h3 className="mt-8 mb-3 border-t border-border pt-5 text-xs font-semibold text-ink-soft">Change</h3>
      <QuantityDiff oldQuantity={adjustment.oldQuantity} newQuantity={adjustment.newQuantity} size="lg" />

      <h3 className="mt-8 mb-3 border-t border-border pt-5 text-xs font-semibold text-ink-soft">Reason</h3>
      <p className="text-sm text-ink-soft">{adjustment.reason}</p>
    </div>
  );
}
