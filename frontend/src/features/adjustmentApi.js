// src/features/adjustments/components/QuantityDiff.jsx
// Visual: was 50 → now 47 (−3). Reused in both the list and detail views.

export default function QuantityDiff({ oldQuantity, newQuantity, size = 'sm' }) {
  const delta = newQuantity - oldQuantity;
  const isPositive = delta > 0;
  const textSize = size === 'lg' ? 'text-lg' : 'text-sm';

  return (
    <span className={`inline-flex items-center gap-2 font-mono ${textSize}`}>
      <span className="text-ink-soft line-through">{oldQuantity}</span>
      <span className="text-ink">{newQuantity}</span>
      <span
        className={
          'rounded-full px-2 py-0.5 text-[11px] font-semibold ' +
          (isPositive ? 'bg-good-bg text-good' : 'bg-bad-bg text-bad')
        }
      >
        {isPositive ? '+' : ''}
        {delta}
      </span>
    </span>
  );
}
