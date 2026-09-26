import { useMemo, useState } from 'react';
import PageWrapper from '../../../components/layout/PageWrapper';
import MoveHistoryFilters from '../components/MoveHistoryFilters';
import MoveHistoryTable, { MOCK_LEDGER } from '../components/MoveHistoryTable';

export default function MoveHistoryPage() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All types');
  const [warehouse, setWarehouse] = useState('All warehouses');

  // TODO: replace MOCK_LEDGER with getMoveHistory({ query, type, warehouse }) from moveHistoryApi.js
  const rows = useMemo(() => {
    return MOCK_LEDGER.filter((r) => {
      const matchesQuery = !query || r.product.toLowerCase().includes(query.toLowerCase()) || r.ref.toLowerCase().includes(query.toLowerCase());
      const matchesType = type === 'All types' || r.type === type.toLowerCase();
      return matchesQuery && matchesType;
    });
  }, [query, type, warehouse]);

  return (
    <PageWrapper
      tag="LEDGER · READ ONLY"
      title="Move History"
      description="Full stock ledger. Every receipt, delivery, transfer and adjustment lands here — nothing here is editable."
    >
      <MoveHistoryFilters query={query} onQueryChange={setQuery} type={type} onTypeChange={setType} warehouse={warehouse} onWarehouseChange={setWarehouse} />
      <div className="bg-surface border border-border rounded">
        <MoveHistoryTable rows={rows} />
      </div>
    </PageWrapper>
  );
}
