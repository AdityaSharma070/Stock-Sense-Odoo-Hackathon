// src/features/deliveries/components/DeliveryDetail.jsx
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { formatDate } from '../../../utils/formatDate';

const STEPS = ['draft', 'waiting', 'ready', 'done'];

function Stepper({ status }) {
  const currentIndex = STEPS.indexOf(status);
  return (
    <div className="mb-6 flex items-center">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center">
          <div
            className={
              'flex h-5 w-5 items-center justify-center border font-mono text-[10px] ' +
              (i < currentIndex
                ? 'border-good bg-good-bg text-good'
                : i === currentIndex
                ? 'border-accent bg-accent text-accent-ink font-semibold'
                : 'border-line text-ink-soft')
            }
          >
            {i < currentIndex ? '✓' : i + 1}
          </div>
          <span className={'ml-2 mr-8 text-xs capitalize ' + (i <= currentIndex ? 'text-ink' : 'text-ink-soft')}>
            {step}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function DeliveryDetail({ delivery, onValidate, onCancel, validating = false }) {
  if (!delivery) return null;
  const isDone = delivery.status === 'done';
  const isCancelled = delivery.status === 'cancelled';

  return (
    <div className="rounded-sm border border-border bg-surface p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-lg font-semibold text-ink">{delivery.reference}</h2>
          <p className="text-xs text-ink-soft">
            To {delivery.warehouseName} · Contact {delivery.customer}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.print()}>Print</Button>
          {!isDone && !isCancelled && (
            <Button variant="outline" onClick={onCancel}>Cancel</Button>
          )}
          {!isDone && !isCancelled && (
            <Button variant="accent" onClick={onValidate} loading={validating}>
              Validate
            </Button>
          )}
        </div>
      </div>

      <Stepper status={delivery.status} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-[11px] font-semibold text-ink-soft">Delivery address</p>
          <p className="rounded-sm bg-[#F8F9F6] px-3 py-2 text-sm text-ink-soft">{delivery.deliveryAddress}</p>
        </div>
        <div>
          <p className="mb-1.5 text-[11px] font-semibold text-ink-soft">Schedule date</p>
          <p className="rounded-sm bg-[#F8F9F6] px-3 py-2 text-sm text-ink-soft">{formatDate(delivery.scheduledDate)}</p>
        </div>
        <div>
          <p className="mb-1.5 text-[11px] font-semibold text-ink-soft">Responsible</p>
          <p className="rounded-sm bg-[#F8F9F6] px-3 py-2 text-sm text-ink-soft">{delivery.responsible || '—'}</p>
        </div>
        <div>
          <p className="mb-1.5 text-[11px] font-semibold text-ink-soft">Status</p>
          <Badge status={delivery.status} />
        </div>
      </div>

      <h3 className="mt-8 mb-3 border-t border-border pt-5 text-xs font-semibold text-ink-soft">Products</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[10.5px] font-semibold text-ink-soft">
            <th className="pb-2">Product</th>
            <th className="pb-2">Location</th>
            <th className="pb-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {delivery.lines?.map((line) => (
            <tr key={line.id} className="border-b border-border">
              <td className="py-2.5">{line.productName}</td>
              <td className="py-2.5 text-ink-soft">{line.locationName}</td>
              <td className="py-2.5 font-mono">{line.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {!isDone && !isCancelled && (
        <p className="mt-4 rounded-sm border border-dashed border-line px-3 py-2.5 text-[11.5px] text-ink-soft">
          Validating checks available stock at each location before reducing quantities.
        </p>
      )}
    </div>
  );
}
