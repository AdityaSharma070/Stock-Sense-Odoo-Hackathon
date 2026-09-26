// src/components/ui/Table.jsx
import EmptyState from './EmptyState';

export default function Table({ columns, rows, renderCell, onRowClick, emptyLabel = 'No records found' }) {
  if (!rows?.length) return <EmptyState label={emptyLabel} />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="border-b border-border px-3.5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-ink-soft whitespace-nowrap"
              >
                {col.label ?? col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.id ?? i}
              onClick={() => onRowClick?.(row)}
              className={onRowClick ? 'cursor-pointer hover:bg-bg' : ''}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={['border-b border-border px-3.5 py-2.5 whitespace-nowrap', col.mono ? 'font-mono' : ''].join(' ')}
                >
                  {col.render ? col.render(row) : renderCell ? renderCell(row, col) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}