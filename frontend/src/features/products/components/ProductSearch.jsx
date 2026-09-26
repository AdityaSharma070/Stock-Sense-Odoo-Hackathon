import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

export default function ProductSearch({ query, onQueryChange, category, onCategoryChange }) {
  return (
    <div className="flex gap-2.5 items-center flex-wrap mb-3.5">
      <Input
        className="flex-1 min-w-[180px]"
        placeholder="Search by name or SKU…"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <Select
        className="w-auto"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        options={['All categories', 'Raw Materials', 'Hardware', 'Packaging']}
      />
    </div>
  );
}
