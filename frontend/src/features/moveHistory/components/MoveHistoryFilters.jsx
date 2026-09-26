import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

export default function MoveHistoryFilters({ query, onQueryChange, type, onTypeChange, warehouse, onWarehouseChange }) {
  return (
    <div className="flex gap-2.5 flex-wrap mb-3.5">
      <Input className="flex-1 min-w-[180px]" placeholder="Search by product or reference…" value={query} onChange={(e) => onQueryChange(e.target.value)} />
      <Select className="w-auto" value={type} onChange={(e) => onTypeChange(e.target.value)} options={['All types', 'Receipt', 'Delivery', 'Adjustment', 'Transfer']} />
      <Select className="w-auto" value={warehouse} onChange={(e) => onWarehouseChange(e.target.value)} options={['All warehouses', 'Main Warehouse', 'Warehouse 2']} />
    </div>
  );
}
