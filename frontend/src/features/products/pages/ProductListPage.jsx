import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import PageWrapper from '../../../components/layout/PageWrapper';
import Button from '../../../components/ui/Button';
import ProductSearch from '../components/ProductSearch';
import ProductTable, { MOCK_PRODUCTS } from '../components/ProductTable';

export default function ProductListPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All categories');

  // TODO: replace MOCK_PRODUCTS with getProducts({ query, category }) from productApi.js
  const products = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => {
      const matchesQuery = !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.sku.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'All categories' || p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <PageWrapper
      tag="CATALOG"
      title="Products"
      description="All SKUs across warehouses. Click a row to view stock by location."
      actions={<Button variant="accent" onClick={() => navigate('/products/new')}>+ New Product</Button>}
    >
      <ProductSearch query={query} onQueryChange={setQuery} category={category} onCategoryChange={setCategory} />
      <div className="bg-surface border border-border rounded">
        <ProductTable products={products} />
      </div>
    </PageWrapper>
  );
}
