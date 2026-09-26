// src/features/alerts/components/LowStockTable.jsx
import EmptyState from '../../../components/ui/EmptyState';

function StatusTag({ onHand }) {
  const isOut = onHand === 0;
  return (
    <span
      className={
        'rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold ' +
        (isOut ? 'bg-bad-bg text-bad' : 'bg-warn-bg text-warn')
      }
    >
      {isOut ? 'Out' : 'Low'}
    </span>
  );
}

export default function LowStockTable({ items = [], loading = false }) {
  if (!loading && items.length === 0) {
    return <EmptyState message="Nothing below its reorder threshold right now." />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const pct = item.threshold ? Math.min(100, Math.round((item.onHand / item.threshold) * 100)) : 0;
        const isOut = item.onHand === 0;
        return (
          <div
            key={item.id}
            className={'border border-border bg-surface p-4 ' + (isOut ? 'border-l-[3px] border-l-bad' : 'border-l-[3px] border-l-warn')}
          >
            <div className="mb-3 flex items-start justify-between">
              <div>
                <p className="font-heading text-sm font-semibold text-ink">{item.productName}</p>
                <p className="font-mono text-[11px] text-ink-soft">{item.sku}</p>
              </div>
              <StatusTag onHand={item.onHand} />
            </div>
            <div className="mb-2 h-[5px] overflow-hidden bg-[#EAEBE6]">
              <div className={'h-full ' + (isOut ? 'bg-bad' : 'bg-warn')} style={{ width: `${pct}%` }} />
            </div>
            <div className="flex justify-between text-[11.5px] text-ink-soft">
              <span>
                On hand <b className="font-mono font-semibold text-ink">{item.onHand}</b>
              </span>
              <span>
                Threshold <b className="font-mono font-semibold text-ink">{item.threshold}</b>
              </span>
            </div>
            <p className="mt-2.5 text-[11px] text-ink-soft">
              {item.locationName} · {item.warehouseName}
            </p>
          </div>
        );
      })}
    </div>
  );
}
