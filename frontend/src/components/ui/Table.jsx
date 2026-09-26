import EmptyState from './EmptyState';

// Generic table. columns: [{ key, header, render?(row) }]. Pass onRowClick to
// make rows navigable (used everywhere a list links to a detail page).
export default function Table({ columns, rows, onRowClick, emptyLabel }) {
  if (!rows?.length) return <EmptyState label={emptyLabel} />;
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left text-[11px] font-semibold tracking-wide text-ink-soft
                  px-3.5 py-2.5 border-b border-border whitespace-nowrap"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.id ?? i}
              onClick={() => onRowClick?.(row)}
              className={onRowClick ? 'cursor-pointer hover:bg-[#F7F8F5]' : ''}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-3.5 py-2.5 text-[13px] border-b border-border whitespace-nowrap"
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
