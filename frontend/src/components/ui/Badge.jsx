import { getStatusClasses } from '../../utils/statusColors';

// Status pill: Draft / Waiting / Ready / Done / Cancelled.
export default function Badge({ status }) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold
        tracking-wide capitalize ${getStatusClasses(status)}`}
    >
      {status}
    </span>
  );
}
