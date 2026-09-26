// src/features/adjustments/components/AdjustmentList.jsx
import { useNavigate } from 'react-router-dom';
import Table from '../../../components/ui/Table';
import EmptyState from '../../../components/ui/EmptyState';
import { formatDate } from '../../../utils/formatDate';
import QuantityDiff from './QuantityDiff';

const columns = [
  { key: 'reference', label: 'Reference' },
  { key: 'productName', label: 'Product' },
  { key: 'locationName', label: 'Location' },
  { key: 'change', label: 'Change' },
  { key: 'reason', label: 'Reason' },
  { key: 'createdAt', label: 'Date' },
];

export default function AdjustmentList({ adjustments = [], loading = false }) {
  const navigate = useNavigate();

  if (!loading && adjustments.length === 0) {
    return <EmptyState message="No adjustments logged yet." />;
  }

  const rows = adjustments.map((a) => ({
    id: a.id,
    reference: <span className="font-mono text-ink">{a.reference}</span>,
    productName: a.productName,
    locationName: <span className="text-ink-soft">{a.locationName}</span>,
    change: <QuantityDiff oldQuantity={a.oldQuantity} newQuantity={a.newQuantity} />,
    reason: <span className="text-ink-soft">{a.reason}</span>,
    createdAt: <span className="text-ink-soft">{formatDate(a.createdAt)}</span>,
  }));

  return (
    <Table
      columns={columns}
      rows={rows}
      loading={loading}
      onRowClick={(row) => navigate(`/adjustments/${row.id}`)}
    />
  );
}
