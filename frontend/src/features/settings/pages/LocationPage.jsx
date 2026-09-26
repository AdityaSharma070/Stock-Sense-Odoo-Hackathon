import { useState } from 'react';
import PageWrapper from '../../../components/layout/PageWrapper';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import EmptyState from '../../../components/ui/EmptyState';
// import { getLocations, createLocation } from '../api/warehouseApi'; // TODO: swap mock state for these

const MOCK_WAREHOUSES = [
  { value: 'w1', label: 'Main Warehouse' },
  { value: 'w2', label: 'Production Floor' },
  { value: 'w3', label: 'Overflow Store' },
];

const MOCK_LOCATIONS = [
  { id: 'l1', name: 'Rack A', code: 'RA-01', warehouse: 'Main Warehouse' },
  { id: 'l2', name: 'Rack B', code: 'RA-02', warehouse: 'Main Warehouse' },
  { id: 'l3', name: 'Receiving Bay', code: 'RB-01', warehouse: 'Main Warehouse' },
];

export default function LocationPage() {
  const [locations, setLocations] = useState(MOCK_LOCATIONS);
  const [form, setForm] = useState({ warehouse: MOCK_WAREHOUSES[0].value, name: '', code: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.code) return;
    const warehouseLabel = MOCK_WAREHOUSES.find((w) => w.value === form.warehouse)?.label ?? '';
    // TODO: await createLocation(form); then refetch getLocations()
    setLocations([...locations, { id: `l${locations.length + 1}`, name: form.name, code: form.code, warehouse: warehouseLabel }]);
    setForm({ warehouse: MOCK_WAREHOUSES[0].value, name: '', code: '' });
  };

  return (
    <PageWrapper tag="SETTINGS" title="Locations" description="Sub-locations inside a warehouse — racks, bays, floors.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-surface border border-border p-5">
          <h3 className="text-sm font-semibold mb-3 pb-2.5 border-b border-border">All locations</h3>
          {locations.length === 0 ? (
            <EmptyState label="No locations yet" />
          ) : (
            locations.map((l) => (
              <div key={l.id} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                <div>
                  <div className="font-semibold text-[13px]">{l.name}</div>
                  <div className="text-[11.5px] text-ink-soft font-mono">{l.code} — {l.warehouse}</div>
                </div>
                <button className="border border-line rounded px-2.5 py-1 text-[11.5px] text-ink-soft">Edit</button>
              </div>
            ))
          )}
        </div>

        <div className="bg-surface border border-border p-5">
          <h3 className="text-sm font-semibold mb-3 pb-2.5 border-b border-border">Add location</h3>
          <form onSubmit={handleSubmit}>
            <Select label="Warehouse" name="warehouse" options={MOCK_WAREHOUSES} value={form.warehouse} onChange={handleChange} />
            <Input label="Name" name="name" placeholder="e.g. Rack A" value={form.name} onChange={handleChange} />
            <Input label="Short code" name="code" mono placeholder="e.g. RA-01" value={form.code} onChange={handleChange} />
            <Button type="submit" variant="accent">Save location</Button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
}
