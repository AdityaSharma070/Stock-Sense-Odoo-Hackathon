import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import AuthLayout from '../components/AuthLayout';
// import { signup } from '../api/authApi'; // TODO: swap the mock submit below for this

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password) {
      setError('Fill in all fields to continue.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      // TODO: await signup(form);
      navigate('/login');
    } catch (err) {
      setError(err?.response?.data?.message ?? 'Could not create your account. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout tagline="Set up your account to manage receipts, deliveries and stock across locations.">
      <h1 className="font-display text-xl font-bold mb-1">Create account</h1>
      <p className="text-ink-soft text-[13.5px] mb-6">You'll be added as staff — a manager can promote your role later.</p>

      <form onSubmit={handleSubmit}>
        <Input label="Full name" name="name" placeholder="Neha Sharma" value={form.name} onChange={handleChange} />
        <Input label="Work email" type="email" name="email" placeholder="you@company.com" value={form.email} onChange={handleChange} />
        <Input label="Password" type="password" name="password" hint="At least 8 characters" value={form.password} onChange={handleChange} />
        {error && <p className="text-xs text-bad mb-3">{error}</p>}
        <Button type="submit" fullWidth disabled={loading}>{loading ? 'Creating account…' : 'Sign up'}</Button>
      </form>

      <div className="flex justify-between mt-4.5 text-[13px] text-ink-soft">
        <span>Already have an account?</span>
        <Link to="/login" className="font-semibold text-ink">Log in</Link>
      </div>
    </AuthLayout>
  );
}
