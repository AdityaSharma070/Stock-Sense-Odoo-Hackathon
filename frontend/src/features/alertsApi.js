// src/features/alerts/components/LowStockBanner.jsx
// Small warning shown on the Dashboard (Person 1 imports this into DashboardPage).
import { Link } from 'react-router';

export default function LowStockBanner({ count = 0, outOfStockCount = 0 }) {
  if (count === 0) return null;

  return (
    <Link
      to="/alerts"
      className="mb-5 flex items-center justify-between border-l-[3px] border-warn bg-warn-bg px-4 py-3 text-[12.5px] font-medium text-accent-ink"
    >
      <span>
        {count} product{count === 1 ? '' : 's'} need attention
        {outOfStockCount > 0 && ` · ${outOfStockCount} fully out of stock`}
      </span>
      <span className="font-semibold">View alerts</span>
    </Link>
  );
}
