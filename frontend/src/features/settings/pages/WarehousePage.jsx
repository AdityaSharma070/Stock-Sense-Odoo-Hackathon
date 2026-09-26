import { useState } from 'react';
import PageWrapper from '../../../components/layout/PageWrapper';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import EmptyState from '../../../components/ui/EmptyState';
// import { getWarehouses, createWarehouse } from '../api/warehouseApi'; // TODO: swap mock state for these

const MOCK_WAREHOUSES = [
  { id: 'w1', name: 'Main Warehouse', code: 'WH', address: 'Sector 82, Mohali' },
  { id: 'w2', name: 'Production Floor', code: 'PF', address: 'Sector 82, Mohali' },
  { id: 'w3', name: 'Overflow Store', code: 'OS', address: 'Baddi' },
];

export default function WarehousePage() {
  const [warehouses, setWarehouses] = useState(MOCK_WAREHOUSES);
  const [form, setForm] = useState({ name: '', code: '', address: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.code) return;
    // TODO: await createWarehouse(form); then refetch getWarehouses()
    setWarehouses([...warehouses, { id: `w${warehouses.length + 1}`, ...form }]);
    setForm({ name: '', code: '', address: '' });
  };

  return (
    <PageWrapper tag="SETTINGS" title="Warehouses" description="Top-level storage sites. Add locations inside each one from the Locations page.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-surface border border-border p-5">
          <h3 className="text-sm font-semibold mb-3 pb-2.5 border-b border-border">All warehouses</h3>
          {warehouses.length === 0 ? (
            <EmptyState label="No warehouses yet" />
          ) : (
            warehouses.map((w) => (
              <div key={w.id} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                <div>
                  <div className="font-semibold text-[13px]">{w.name}</div>
                  <div className="text-[11.5px] text-ink-soft font-mono">{w.code} — {w.address}</div>
                </div>
                <button className="border border-line rounded px-2.5 py-1 text-[11.5px] text-ink-soft">Edit</button>
              </div>
            ))
          )}
        </div>

        <div className="bg-surface border border-border p-5">
          <h3 className="text-sm font-semibold mb-3 pb-2.5 border-b border-border">Add warehouse</h3>
          <form onSubmit={handleSubmit}>
            <Input label="Name" name="name" placeholder="e.g. Main Warehouse" value={form.name} onChange={handleChange} />
            <Input label="Short code" name="code" mono placeholder="e.g. WH" value={form.code} onChange={handleChange} />
            <Input label="Address" name="address" placeholder="Street, city, state" value={form.address} onChange={handleChange} />
            <Button type="submit" variant="accent">Save warehouse</Button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
}
