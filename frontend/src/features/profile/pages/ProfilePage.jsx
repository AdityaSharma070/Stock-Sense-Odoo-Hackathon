import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import PageWrapper from '../../../components/layout/PageWrapper';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [form, setForm] = useState({ name: user?.name ?? '', email: user?.email ?? '' });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setSaved(false);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: call updateProfile(form) once the endpoint exists; for now just reflect locally
    setSaved(true);
  };

  const initials = (form.name || 'A')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <PageWrapper title="My profile">
      <div className="bg-surface border border-border p-6 max-w-lg">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-full bg-accent text-accent-ink flex items-center justify-center font-display font-bold text-lg">
            {initials}
          </div>
          <div>
            <div className="font-semibold text-[15px]">{form.name || 'Your name'}</div>
            <div className="text-ink-soft text-xs">{user?.role ?? 'Staff'}</div>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <Input label="Full name" name="name" value={form.name} onChange={handleChange} />
          <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
          <Input label="Role" value={user?.role ?? 'Staff'} disabled />

          {saved && <p className="text-xs text-good mb-3">Saved.</p>}
          <div className="flex gap-2.5">
            <Button type="submit" variant="accent">Save changes</Button>
            <Button type="button" variant="outline" onClick={logout}>Log out</Button>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
}
