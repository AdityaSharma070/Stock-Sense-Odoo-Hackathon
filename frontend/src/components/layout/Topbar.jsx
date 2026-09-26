import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';

export default function Topbar({ title }) {
  const { user, logout } = useAuth() || {};
  return (
    <div className="flex items-center justify-between border-b border-border bg-surface px-6 py-3">
      <div className="font-heading font-semibold text-[14px]">{title}</div>
      <div className="flex items-center gap-3">
        <span className="text-[12.5px] text-ink-soft">{user?.name || 'Guest'}</span>
        <Button variant="ghost" onClick={logout}>Log out</Button>
      </div>
    </div>
  );
}
