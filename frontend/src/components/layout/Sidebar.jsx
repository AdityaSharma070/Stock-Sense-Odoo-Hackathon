import { NavLink } from 'react-router-dom';

// Full app nav per the route map in StockSense_Frontend_Structure.md.
// Each person's routes light up automatically once their pages exist —
// nothing here needs to change as folders get filled in.
const GROUPS = [
  { label: 'OVERVIEW', items: [{ to: '/dashboard', label: 'Dashboard' }] },
  { label: 'CATALOG', items: [{ to: '/products', label: 'Products' }] },
  {
    label: 'OPERATIONS',
    items: [
      { to: '/receipts', label: 'Receipts' },
      { to: '/deliveries', label: 'Delivery Orders' },
      { to: '/adjustments', label: 'Adjustments' },
    ],
  },
  {
    label: 'RECORDS',
    items: [
      { to: '/move-history', label: 'Move History' },
      { to: '/alerts', label: 'Alerts' },
    ],
  },
  { label: 'SYSTEM', items: [{ to: '/settings/warehouses', label: 'Settings' }] },
];

export default function Sidebar() {
  return (
    <nav className="w-[200px] shrink-0 bg-side-bg border-r border-side-line h-screen sticky top-0 overflow-y-auto py-4.5">
      <div className="px-4.5 pb-4 border-b border-side-line mb-2.5">
        <div className="font-heading font-bold text-[16px] text-side-ink">◧ STOCKSENSE</div>
        <div className="text-[11px] text-[#8B9389] mt-0.5">inventory manifest</div>
      </div>
      {GROUPS.map((group) => (
        <div key={group.label} className="py-2.5">
          <div className="px-4.5 py-1 text-[10px] tracking-wider text-[#6E766B]">{group.label}</div>
          {group.items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4.5 py-2 text-[13px] border-l-[3px] ${
                  isActive
                    ? 'text-accent border-accent bg-[#262B27]'
                    : 'text-[#B7BCB1] border-transparent hover:text-side-ink'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      ))}
    </nav>
  );
}
