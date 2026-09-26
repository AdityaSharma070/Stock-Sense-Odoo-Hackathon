// src/features/deliveries/components/DeliveryList.jsx
import { useNavigate } from 'react-router-dom';
import Table from '../../../components/ui/Table';
import Badge from '../../../components/ui/Badge';
import EmptyState from '../../../components/ui/EmptyState';
import { formatDate } from '../../../utils/formatDate';

const columns = [
  { key: 'reference', label: 'Reference' },
  { key: 'warehouseName', label: 'To' },
  { key: 'customer', label: 'Contact' },
  { key: 'scheduledDate', label: 'Schedule date' },
  { key: 'status', label: 'Status' },
];

export default function DeliveryList({ deliveries = [], loading = false }) {
  const navigate = useNavigate();

  if (!loading && deliveries.length === 0) {
    return <EmptyState message="No delivery orders match these filters." />;
  }

  const rows = deliveries.map((d) => ({
    id: d.id,
    reference: <span className="font-mono text-ink">{d.reference}</span>,
    warehouseName: d.warehouseName,
    customer: d.customer,
    scheduledDate: formatDate(d.scheduledDate),
    status: <Badge status={d.status} />,
  }));

  return (
    <Table
      columns={columns}
      rows={rows}
      loading={loading}
      onRowClick={(row) => navigate(`/deliveries/${row.id}`)}
    />
  );
}
