import Table from '../../../components/ui/Table';

export default function StockByLocation({ stock }) {
  const columns = [
    { key: 'warehouse', header: 'Warehouse' },
    { key: 'location', header: 'Location' },
    { key: 'onHand', header: 'On Hand' },
    { key: 'free', header: 'Free to Use' },
  ];
  return <Table columns={columns} rows={stock} emptyLabel="No stock recorded for this product yet" />;
}
