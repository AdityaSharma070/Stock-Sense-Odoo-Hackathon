import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../../hooks/useAuth';
import AuthLayout from '../components/AuthLayout';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
// import { login as loginApi } from '../api/authApi'; // TODO: swap the mock submit below for this

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Enter your email and password.');
      return;
    }
    setLoading(true);
    try {
      // TODO: const { user, token } = await loginApi(form);
      const user = { name: form.email.split('@')[0], email: form.email, role: 'staff' };
      const token = 'mock-token';
      login(user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message ?? 'Could not log in. Check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      tagline="One ledger for every unit that moves — received, shelved, shipped or corrected."
      stat={{ value: '3', label: 'warehouses tracked in real time' }}
    >
      <h1 className="font-display text-xl font-bold mb-1">Log in</h1>
      <p className="text-ink-soft text-[13.5px] mb-6">Enter your work email to continue.</p>

      <form onSubmit={handleSubmit}>
        <Input label="Email" type="email" name="email" placeholder="you@company.com" value={form.email} onChange={handleChange} />
        <Input label="Password" type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} />
        {error && <p className="text-xs text-bad mb-3">{error}</p>}
        <Button type="submit" fullWidth disabled={loading}>{loading ? 'Logging in…' : 'Log in'}</Button>
      </form>

      <div className="flex justify-between mt-4.5 text-[13px] text-ink-soft">
        <Link to="/forgot-password" className="font-semibold text-ink">Forgot password?</Link>
        <Link to="/signup" className="font-semibold text-ink">Create account</Link>
      </div>
    </AuthLayout>
  );
}
