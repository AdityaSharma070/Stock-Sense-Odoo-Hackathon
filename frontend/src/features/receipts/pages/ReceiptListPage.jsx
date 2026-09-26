import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../../components/layout/PageWrapper';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import ReceiptList, { MOCK_RECEIPTS } from '../components/ReceiptList';

export default function ReceiptListPage() {
  const navigate = useNavigate();
  // TODO: replace MOCK_RECEIPTS with getReceipts(filters) from receiptApi.js
  return (
    <PageWrapper
      tag="OPERATIONS · IN"
      title="Receipts"
      description="Incoming goods from suppliers. Validate to apply stock."
      actions={<Button variant="accent" onClick={() => navigate('/receipts/new')}>+ New Receipt</Button>}
    >
      <div className="flex gap-2.5 flex-wrap mb-3.5">
        <Input className="flex-1 min-w-[180px]" placeholder="Search by reference or supplier…" />
        <Select className="w-auto" options={['All statuses', 'Draft', 'Waiting', 'Ready', 'Done', 'Cancelled']} />
      </div>
      <div className="bg-surface border border-border rounded">
        <ReceiptList receipts={MOCK_RECEIPTS} />
      </div>
    </PageWrapper>
  );
}
