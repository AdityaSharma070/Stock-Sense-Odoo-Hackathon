import { useNavigate } from 'react-router-dom';
import Table from '../../../components/ui/Table';

// Mock rows for the UI pass — remove once getProducts() is wired in ProductListPage.
export const MOCK_PRODUCTS = [
  { id: 'p1', sku: 'STL-ROD-12', name: 'Steel Rods 12mm', category: 'Raw Materials', unit: 'kg', onHand: 930, free: 880 },
  { id: 'p2', sku: 'ZNC-SHT-04', name: 'Zinc Coating Sheet', category: 'Raw Materials', unit: 'pcs', onHand: 60, free: 52 },
  { id: 'p3', sku: 'BLT-M8-40', name: 'Hex Bolt M8x40', category: 'Hardware', unit: 'pcs', onHand: 4200, free: 4200 },
  { id: 'p4', sku: 'BOX-CB-L', name: 'Corrugated Box, Large', category: 'Packaging', unit: 'pcs', onHand: 18, free: 18 },
];

export default function ProductTable({ products }) {
  const navigate = useNavigate();
  const columns = [
    { key: 'sku', header: 'SKU', render: (r) => <span className="font-mono">{r.sku}</span> },
    { key: 'name', header: 'Name' },
    { key: 'category', header: 'Category', render: (r) => <span className="text-ink-soft">{r.category}</span> },
    { key: 'unit', header: 'Unit', render: (r) => <span className="text-ink-soft">{r.unit}</span> },
    { key: 'onHand', header: 'On Hand' },
    { key: 'free', header: 'Free to Use' },
  ];
  return (
    <Table
      columns={columns}
      rows={products}
      onRowClick={(row) => navigate(`/products/${row.id}`)}
      emptyLabel="No products match your search"
    />
  );
}
