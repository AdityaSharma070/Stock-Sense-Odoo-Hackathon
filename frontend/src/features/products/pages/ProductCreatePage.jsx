import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../../components/layout/PageWrapper';
import ProductForm from '../components/ProductForm';

export default function ProductCreatePage() {
  const navigate = useNavigate();
  return (
    <PageWrapper tag="CATALOG · NEW" title="New Product" description="Add a SKU to the catalog. Initial stock is optional.">
      {/* TODO: onSubmit -> createProduct(form) from productApi.js, then navigate to the new product */}
      <ProductForm onSubmit={() => navigate('/products')} onCancel={() => navigate('/products')} />
    </PageWrapper>
  );
}
