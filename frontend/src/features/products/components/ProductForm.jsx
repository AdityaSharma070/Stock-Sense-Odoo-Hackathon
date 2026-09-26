import { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

// Shared by ProductCreatePage now; pass `initial` + a different onSubmit label
// later to reuse this for editing.
export default function ProductForm({ initial = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: initial.name || '',
    sku: initial.sku || '',
    category: initial.category || 'Raw Materials',
    unit: initial.unit || 'kg',
    initialStock: initial.initialStock || '',
    location: initial.location || 'Main Warehouse · Rack A',
  });
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit?.(form); }}
      className="bg-surface border border-border rounded p-5 max-w-xl"
    >
      <div className="grid grid-cols-2 gap-4">
        <Input label="Product Name" placeholder="e.g. Steel Rods 12mm" value={form.name} onChange={set('name')} />
        <Input label="SKU / Code" placeholder="e.g. STL-ROD-12" value={form.sku} onChange={set('sku')} className="font-mono" />
        <Select label="Category" value={form.category} onChange={set('category')} options={['Raw Materials', 'Hardware', 'Packaging']} />
        <Select label="Unit of Measure" value={form.unit} onChange={set('unit')} options={['kg', 'pcs', 'litre', 'box']} />
        <Input label="Initial Stock (optional)" placeholder="0" value={form.initialStock} onChange={set('initialStock')} />
        <Select
          label="Location"
          value={form.location}
          onChange={set('location')}
          options={['Main Warehouse · Rack A', 'Warehouse 2 · Floor']}
        />
      </div>
      <div className="flex gap-2.5 pt-4 mt-1 border-t border-border">
        <Button type="submit" variant="accent">Save Product</Button>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
