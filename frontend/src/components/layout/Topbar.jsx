// src/components/layout/Topbar.jsx
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

export default function Topbar({ showSearch = true }) {
  const { user, logout } = useAuth() || {};
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between border-b border-border bg-surface px-7 py-3.5">
      {showSearch ? (
        <input placeholder="Search SKU or reference" className="w-56 !py-1.5 font-mono text-xs text-ink-soft" />
      ) : <div />}

      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={() => navigate('/profile')}>
          {user?.name ?? 'Account'}
        </Button>
        <Button variant="ghost" onClick={logout}>
          Log out
        </Button>
      </div>
    </div>
  );
}