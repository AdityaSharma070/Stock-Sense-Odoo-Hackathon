import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import StockByLocation from '../components/StockByLocation';
import { MOCK_PRODUCTS } from '../components/ProductTable';

// TODO: replace lookup with getProduct(id) + getProductStock(id) from productApi.js
const MOCK_STOCK = {
  p1: [
    { warehouse: 'Main Warehouse', location: 'Rack A', onHand: 700, free: 660 },
    { warehouse: 'Main Warehouse', location: 'Production Floor', onHand: 150, free: 140 },
    { warehouse: 'Warehouse 2', location: 'Floor', onHand: 80, free: 80 },
  ],
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = MOCK_PRODUCTS.find((p) => p.id === id) || MOCK_PRODUCTS[0];
  const stock = MOCK_STOCK[id] || [];

  return (
    <section>
      <div onClick={() => navigate('/products')} className="text-ink-soft text-[11px] font-semibold mb-1 cursor-pointer hover:text-accent-ink">
        ← Products
      </div>
      <div className="flex items-start justify-between flex-wrap gap-3.5 mb-4.5">
        <div>
          <span className="inline-block bg-[#EFE3C9] text-accent-ink px-2.5 py-1 rounded text-[11px] font-semibold font-mono">{product.sku}</span>
          <h1 className="font-heading font-bold text-[20px] mt-1.5">{product.name}</h1>
        </div>
        <Button variant="ghost">Edit</Button>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4.5">
        <div className="bg-surface border border-border border-l-[3px] border-l-accent p-3.5">
          <div className="font-heading font-bold text-[22px]">{product.onHand} {product.unit}</div>
          <div className="text-[11px] text-ink-soft mt-1">Total On Hand</div>
        </div>
        <div className="bg-surface border border-border border-l-[3px] border-l-accent p-3.5">
          <div className="font-heading font-bold text-[22px]">{stock.length}</div>
          <div className="text-[11px] text-ink-soft mt-1">Locations Stocked</div>
        </div>
        <div className="bg-surface border border-border border-l-[3px] border-l-accent p-3.5">
          <div className="font-heading font-bold text-[22px]">{product.unit}</div>
          <div className="text-[11px] text-ink-soft mt-1">Unit of Measure</div>
        </div>
      </div>
      <h3 className="text-[12.5px] font-bold text-ink-soft tracking-wide mb-2.5">STOCK BY LOCATION</h3>
      <div className="bg-surface border border-border rounded">
        <StockByLocation stock={stock} />
      </div>
    </section>
  );
}
