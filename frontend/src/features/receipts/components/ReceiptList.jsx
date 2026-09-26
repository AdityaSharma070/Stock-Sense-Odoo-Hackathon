import { useNavigate } from 'react-router';
import Table from '../../../components/ui/Table';
import Badge from '../../../components/ui/Badge';

export const MOCK_RECEIPTS = [
  { id: 'r1', ref: 'REC/2026/0001', supplier: 'Vendor Steel Co.', warehouse: 'Main Warehouse', date: '12 Oct 2026', status: 'draft' },
  { id: 'r2', ref: 'REC/2026/0002', supplier: 'Zinc Traders Ltd.', warehouse: 'Main Warehouse', date: '09 Oct 2026', status: 'ready' },
  { id: 'r3', ref: 'REC/2025/0114', supplier: 'BoltWorks Inc.', warehouse: 'Warehouse 2', date: '28 Sep 2026', status: 'done' },
];

export default function ReceiptList({ receipts }) {
  const navigate = useNavigate();
  const columns = [
    { key: 'ref', header: 'Reference', render: (r) => <span className="font-mono">{r.ref}</span> },
    { key: 'supplier', header: 'Supplier' },
    { key: 'warehouse', header: 'Warehouse', render: (r) => <span className="text-ink-soft">{r.warehouse}</span> },
    { key: 'date', header: 'Scheduled', render: (r) => <span className="text-ink-soft">{r.date}</span> },
    { key: 'status', header: 'Status', render: (r) => <Badge status={r.status} /> },
  ];
  return (
    <Table
      columns={columns}
      rows={receipts}
      onRowClick={(row) => navigate(`/receipts/${row.id}`)}
      emptyLabel="No receipts match your filters"
    />
  );
}
