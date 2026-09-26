import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import PageWrapper from '../../../components/layout/PageWrapper';
import Table from '../../../components/ui/Table';
import Badge from '../../../components/ui/Badge';

// TODO: replace all MOCK_* below with getDashboardStats(filters) from dashboardApi.js
const MOCK_KPIS = [
  { label: 'Total products in stock', value: '1,284', alert: false },
  { label: 'Low / out of stock items', value: '17', alert: true },
  { label: 'Pending receipts', value: '6', alert: false },
  { label: 'Pending deliveries', value: '4', alert: false },
];

const MOCK_RECEIPTS = [
  { id: 'r1', ref: 'WH/IN/0001', from: 'Steel Traders Co.', status: 'ready' },
  { id: 'r2', ref: 'WH/IN/0002', from: 'Anna Interior', status: 'waiting' },
  { id: 'r3', ref: 'WH/IN/0003', from: 'Anna Interior', status: 'ready' },
];

const MOCK_DELIVERIES = [
  { id: 'd1', ref: 'WH/OUT/0001', to: 'Vendor Retail', status: 'ready' },
  { id: 'd2', ref: 'WH/OUT/0002', to: 'Rapid Furnish', status: 'ready' },
  { id: 'd3', ref: 'WH/OUT/0003', to: 'Anna Interior', status: 'done' },
];

const STATUS_FILTERS = ['All', 'Draft', 'Waiting', 'Ready', 'Done'];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('All');

  const receipts = useMemo(
    () => (statusFilter === 'All' ? MOCK_RECEIPTS : MOCK_RECEIPTS.filter((r) => r.status === statusFilter.toLowerCase())),
    [statusFilter]
  );
  const deliveries = useMemo(
    () => (statusFilter === 'All' ? MOCK_DELIVERIES : MOCK_DELIVERIES.filter((d) => d.status === statusFilter.toLowerCase())),
    [statusFilter]
  );

  return (
    <PageWrapper title="Dashboard" description="Snapshot of inventory operations across all warehouses.">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-5">
        {MOCK_KPIS.map((kpi) => (
          <div
            key={kpi.label}
            className={['bg-surface border border-border border-l-[3px] p-4', kpi.alert ? 'border-l-bad' : 'border-l-line'].join(' ')}
          >
            <div className="font-display text-2xl font-semibold">{kpi.value}</div>
            <div className="text-xs text-ink-soft mt-0.5">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setStatusFilter(f)}
            className={[
              'border rounded px-3 py-1.5 text-xs',
              f === statusFilter ? 'bg-ink text-white border-ink' : 'bg-surface text-ink-soft border-line',
            ].join(' ')}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-surface border border-border">
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
            <h3 className="text-sm font-semibold">Receipts</h3>
            <button onClick={() => navigate('/receipts')} className="text-xs text-ink-soft">View all</button>
          </div>
          <Table
            columns={[
              { key: 'ref', label: 'Reference', mono: true },
              { key: 'from', label: 'Supplier' },
              { key: 'status', label: 'Status', render: (r) => <Badge status={r.status} /> },
            ]}
            rows={receipts}
            onRowClick={(row) => navigate(`/receipts/${row.id}`)}
            emptyLabel="No receipts match this filter"
          />
        </div>

        <div className="bg-surface border border-border">
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
            <h3 className="text-sm font-semibold">Delivery orders</h3>
            <button onClick={() => navigate('/deliveries')} className="text-xs text-ink-soft">View all</button>
          </div>
          <Table
            columns={[
              { key: 'ref', label: 'Reference', mono: true },
              { key: 'to', label: 'Customer' },
              { key: 'status', label: 'Status', render: (r) => <Badge status={r.status} /> },
            ]}
            rows={deliveries}
            emptyLabel="No deliveries match this filter"
          />
        </div>
      </div>
    </PageWrapper>
  );
}
