import Table from '../../../components/ui/Table';

export const MOCK_LEDGER = [
  { id: 'm1', date: '26 Sep 2026 09:14', type: 'receipt', ref: 'REC/2025/0113', product: 'Steel Rods 12mm', from: '—', to: 'Rack A', qty: '+100 kg' },
  { id: 'm2', date: '26 Sep 2026 10:02', type: 'transfer', ref: 'TRF/2026/0031', product: 'Steel Rods 12mm', from: 'Rack A', to: 'Production Floor', qty: '50 kg' },
  { id: 'm3', date: '25 Sep 2026 16:40', type: 'delivery', ref: 'DEL/2026/0087', product: 'Hex Bolt M8x40', from: 'Rack C', to: '—', qty: '-300 pcs' },
  { id: 'm4', date: '25 Sep 2026 11:05', type: 'adjustment', ref: 'ADJ/2026/0012', product: 'Zinc Coating Sheet', from: '—', to: 'Rack B', qty: '-3 kg' },
];

const TYPE_COLOR = { receipt: 'text-good', delivery: 'text-bad', adjustment: 'text-warn', transfer: 'text-ink' };

// Ledger is append-only — this table is read-only by design, no row click, no edit.
export default function MoveHistoryTable({ rows }) {
  const columns = [
    { key: 'date', header: 'Date', render: (r) => <span className="text-ink-soft font-mono">{r.date}</span> },
    { key: 'type', header: 'Type', render: (r) => <span className={`font-semibold capitalize ${TYPE_COLOR[r.type]}`}>{r.type}</span> },
    { key: 'ref', header: 'Reference', render: (r) => <span className="font-mono">{r.ref}</span> },
    { key: 'product', header: 'Product' },
    { key: 'from', header: 'From', render: (r) => <span className="text-ink-soft">{r.from}</span> },
    { key: 'to', header: 'To', render: (r) => <span className="text-ink-soft">{r.to}</span> },
    { key: 'qty', header: 'Qty', render: (r) => <span className="font-mono">{r.qty}</span> },
  ];
  return <Table columns={columns} rows={rows} emptyLabel="No stock movements match your filters" />;
}
