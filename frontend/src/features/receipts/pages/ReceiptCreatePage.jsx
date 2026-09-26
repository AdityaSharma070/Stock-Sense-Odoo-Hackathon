import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../../components/layout/PageWrapper';
import ReceiptForm from '../components/ReceiptForm';

export default function ReceiptCreatePage() {
  const navigate = useNavigate();
  return (
    <PageWrapper tag="DRAFT" title="New Receipt" description="Reference auto-generates on save — REC/2026/0003.">
      {/* TODO: onSubmit -> createReceipt(payload) from receiptApi.js, then navigate to the new receipt */}
      <ReceiptForm onSubmit={() => navigate('/receipts')} onCancel={() => navigate('/receipts')} />
    </PageWrapper>
  );
}
