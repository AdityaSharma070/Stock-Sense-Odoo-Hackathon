import { useParams, useNavigate } from 'react-router-dom';
import ReceiptDetail from '../components/ReceiptDetail';
import { MOCK_RECEIPTS } from '../components/ReceiptList';

// TODO: replace lookup with getReceipt(id) from receiptApi.js
const MOCK_LINES = {
  r1: [
    { product: 'Steel Rods 12mm', quantity: '50 kg', location: 'Main Warehouse · Rack A' },
    { product: 'Zinc Coating Sheet', quantity: '20 pcs', location: 'Main Warehouse · Rack B' },
  ],
};

export default function ReceiptDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const base = MOCK_RECEIPTS.find((r) => r.id === id) || MOCK_RECEIPTS[0];
  const receipt = { ...base, lines: MOCK_LINES[base.id] || [] };

  return (
    <div>
      <div onClick={() => navigate('/receipts')} className="text-ink-soft text-[11px] font-semibold mb-1 cursor-pointer hover:text-accent-ink">
        ← Receipts
      </div>
      <ReceiptDetail receipt={receipt} />
    </div>
  );
}
