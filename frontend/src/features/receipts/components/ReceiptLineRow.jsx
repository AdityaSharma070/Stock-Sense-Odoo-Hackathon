export default function ReceiptLineRow({ line, onChange, onRemove, products = [], locations = [] }) {
  const set = (key) => (e) => onChange({ ...line, [key]: e.target.value });
  return (
    <div className="grid grid-cols-[2.2fr_1fr_1fr_auto] gap-2.5 items-center mb-2">
      <select value={line.productId} onChange={set('productId')} className="border border-line rounded px-2.5 py-1.5 text-[12.5px]">
        {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      <input value={line.quantity} onChange={set('quantity')} placeholder="Quantity" className="border border-line rounded px-2.5 py-1.5 text-[12.5px]" />
      <select value={line.locationId} onChange={set('locationId')} className="border border-line rounded px-2.5 py-1.5 text-[12.5px]">
        {locations.map((l) => <option key={l} value={l}>{l}</option>)}
      </select>
      <button type="button" onClick={onRemove} className="text-bad text-[12px] font-semibold px-1.5">✕ remove</button>
    </div>
  );
}
