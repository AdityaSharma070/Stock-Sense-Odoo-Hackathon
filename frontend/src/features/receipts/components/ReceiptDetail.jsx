import Button from '../../../components/ui/Button';
import ValidateButton from './ValidateButton';

const STEPS = ['Draft', 'Waiting', 'Ready', 'Done'];

export default function ReceiptDetail({ receipt }) {
  const currentIndex = STEPS.findIndex((s) => s.toLowerCase() === receipt.status);
  return (
    <section>
      <div className="flex items-start justify-between flex-wrap gap-3.5 mb-4.5">
        <div>
          <span className="inline-block bg-[#EFE3C9] text-accent-ink px-2.5 py-1 rounded text-[11px] font-semibold font-mono">{receipt.ref}</span>
          <h1 className="font-heading font-bold text-[20px] mt-1.5">{receipt.supplier}</h1>
          <p className="text-ink-soft text-[12.5px] mt-0.5">Warehouse: {receipt.warehouse} · Scheduled {receipt.date}</p>
        </div>
        <div className="flex gap-1.5 items-center text-[11px]">
          {STEPS.map((step, i) => (
            <span key={step} className="flex items-center gap-1.5">
              <span className={`px-2.5 py-1 rounded font-semibold ${i === currentIndex ? 'border border-accent text-accent-ink bg-[#EFE3C9]' : 'border border-line text-ink-soft'}`}>
                {step}
              </span>
              {i < STEPS.length - 1 && <span className="text-line">→</span>}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-2.5 mb-5">
        <ValidateButton disabled={receipt.status === 'done'} />
        <Button variant="ghost">Print</Button>
        <Button variant="danger">Cancel</Button>
      </div>
      <div className="bg-surface border border-border rounded overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {['Product', 'Quantity', 'Location'].map((h) => (
                <th key={h} className="text-left text-[11px] font-semibold text-ink-soft px-3.5 py-2.5 border-b border-border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {receipt.lines.map((l, i) => (
              <tr key={i}>
                <td className="px-3.5 py-2.5 text-[13px] border-b border-border">{l.product}</td>
                <td className="px-3.5 py-2.5 text-[13px] border-b border-border">{l.quantity}</td>
                <td className="px-3.5 py-2.5 text-[13px] border-b border-border">{l.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
