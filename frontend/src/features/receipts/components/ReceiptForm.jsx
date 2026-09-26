import { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import ReceiptLineRow from './ReceiptLineRow';

const PRODUCTS = [
  { id: 'p1', name: 'Steel Rods 12mm' },
  { id: 'p2', name: 'Zinc Coating Sheet' },
  { id: 'p3', name: 'Hex Bolt M8x40' },
];
const LOCATIONS = ['Rack A', 'Rack B', 'Floor'];
let lineSeq = 0;
const newLine = () => ({ id: `l${lineSeq++}`, productId: PRODUCTS[0].id, quantity: '', locationId: LOCATIONS[0] });

export default function ReceiptForm({ onSubmit, onCancel }) {
  const [header, setHeader] = useState({ supplier: '', warehouse: 'Main Warehouse', scheduledDate: '' });
  const [lines, setLines] = useState([newLine(), newLine()]);

  const updateLine = (id, updated) => setLines((ls) => ls.map((l) => (l.id === id ? updated : l)));
  const removeLine = (id) => setLines((ls) => ls.filter((l) => l.id !== id));

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit?.({ header, lines }); }}
      className="bg-surface border border-border rounded p-5"
    >
      <div className="grid grid-cols-2 gap-4">
        <Input label="Supplier" placeholder="e.g. Vendor Steel Co." value={header.supplier}
          onChange={(e) => setHeader((h) => ({ ...h, supplier: e.target.value }))} />
        <Select label="Warehouse" value={header.warehouse}
          onChange={(e) => setHeader((h) => ({ ...h, warehouse: e.target.value }))}
          options={['Main Warehouse', 'Warehouse 2']} />
        <Input label="Scheduled Date" type="date" value={header.scheduledDate}
          onChange={(e) => setHeader((h) => ({ ...h, scheduledDate: e.target.value }))} />
        <Input label="Responsible" value="Logged-in user" disabled />
      </div>

      <div className="flex items-center justify-between mt-5 mb-2.5">
        <h3 className="text-[12.5px] font-bold text-ink-soft tracking-wide">PRODUCT LINES</h3>
        <Button type="button" variant="ghost" onClick={() => setLines((ls) => [...ls, newLine()])}>+ Add product</Button>
      </div>
      {lines.map((line) => (
        <ReceiptLineRow key={line.id} line={line} products={PRODUCTS} locations={LOCATIONS}
          onChange={(updated) => updateLine(line.id, updated)} onRemove={() => removeLine(line.id)} />
      ))}

      <div className="flex gap-2.5 pt-4 mt-3 border-t border-border">
        <Button type="submit" variant="accent">Save as Draft</Button>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
