import { getStatusEntry } from '../../utils/statusColors';

export default function Badge({ status, children }) {
  const entry = getStatusEntry(status);
  return (
    <span className={['inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold', entry.className].join(' ')}>
      {children ?? entry.label}
    </span>
  );
}