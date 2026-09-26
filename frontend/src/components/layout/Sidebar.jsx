// src/components/layout/Sidebar.jsx
import { NavLink } from 'react-router';

const NAV_SECTIONS = [
  { label: null, items: [
      { to: '/dashboard', text: 'Dashboard' },
  ]},
  { label: 'Catalog', items: [
      { to: '/products', text: 'Products' },
  ]},
  { label: 'Operations', items: [
      { to: '/receipts', text: 'Receipts' },
      { to: '/deliveries', text: 'Delivery orders' },
      { to: '/adjustments', text: 'Adjustments' },
  ]},
  { label: 'Records', items: [
      { to: '/move-history', text: 'Move history' },
      { to: '/alerts', text: 'Alerts' },
  ]},
  { label: 'Settings', items: [
      { to: '/settings/warehouses', text: 'Warehouses' },
      { to: '/settings/locations', text: 'Locations' },
  ]},
];

export default function Sidebar() {
  return (
    <aside className="w-56 flex-shrink-0 flex flex-col bg-side text-side-ink h-screen sticky top-0 overflow-y-auto py-4.5">
      <div className="px-4.5 pb-4 border-b border-side-line mb-2.5">
        <div className="font-display font-bold text-[16px]">StockSense</div>
        <div className="text-[11px] text-side-soft mt-0.5">inventory manifest</div>
      </div>

      {NAV_SECTIONS.map((section, i) => (
        <div key={i} className="py-2.5">
          {section.label && (
            <div className="px-4.5 pb-1 pt-3 text-[10.5px] uppercase tracking-wider text-side-soft">
              {section.label}
            </div>
          )}
          {section.items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                ['flex items-center gap-2 px-4.5 py-2 text-[13px]',
                 isActive ? 'bg-[#2A302B] font-semibold text-white' : 'text-[#C6CBC1] hover:text-white'].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  <span className={['h-1 w-1 rounded-full', isActive ? 'bg-accent' : 'bg-[#5A6158]'].join(' ')} />
                  {item.text}
                </>
              )}
            </NavLink>
          ))}
        </div>
      ))}
    </aside>
  );
}