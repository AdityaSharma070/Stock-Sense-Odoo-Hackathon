// src/features/deliveries/components/DeliveryLineRow.jsx
import Select from '../../../components/ui/Select';
import StockWarning from './StockWarning';

/**
 * Controlled row — all state lives in the parent DeliveryForm.
 * line: { productId, productName, locationId, quantity, availableAtLocation }
 */
export default function DeliveryLineRow({ line, productOptions, locationOptions, onChange, onRemove }) {
  const handleField = (field) => (e) => {
    onChange({ ...line, [field]: e.target.value });
  };

  return (
    <tr className="border-b border-line">
      <td className="py-2 pr-3">
        <Select
          value={line.productId}
          onChange={handleField('productId')}
          options={productOptions}
          placeholder="Select product…"
        />
      </td>
      <td className="py-2 pr-3">
        <Select
          value={line.locationId}
          onChange={handleField('locationId')}
          options={locationOptions}
          placeholder="Source location…"
        />
      </td>
      <td className="py-2 pr-3 w-28">
        <input
          type="number"
          min="0"
          value={line.quantity}
          onChange={handleField('quantity')}
          className="w-full rounded-sm border border-line bg-surface px-2.5 py-1.5 font-mono text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <StockWarning requested={Number(line.quantity) || 0} available={line.availableAtLocation ?? 0} />
      </td>
      <td className="py-2 text-right">
        <button
          type="button"
          onClick={onRemove}
          className="text-xs font-medium text-ink-soft hover:text-bad"
        >
          Remove
        </button>
      </td>
    </tr>
  );
}
