// src/features/deliveries/components/StockWarning.jsx
// Shown inline on a DeliveryLineRow when requested qty > available stock at that location.

export default function StockWarning({ requested, available }) {
  if (requested <= available) return null;

  return (
    <p className="mt-1 text-xs font-medium text-bad">
      Only {available} available at this location — {requested - available} short.
    </p>
  );
}
