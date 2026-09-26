import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import AuthLayout from '../components/AuthLayout';
// import { forgotPassword } from '../api/authApi'; // TODO: swap the mock submit below for this

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Enter the email linked to your account.');
      return;
    }
    setLoading(true);
    try {
      // TODO: await forgotPassword(email);
      navigate('/reset-password', { state: { email } });
    } catch (err) {
      setError(err?.response?.data?.message ?? 'Could not send the code. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout tagline="We'll send a one-time code to your registered email.">
      <h1 className="font-display text-xl font-bold mb-1">Reset password</h1>
      <p className="text-ink-soft text-[13.5px] mb-6">Enter the email linked to your account.</p>

      <form onSubmit={handleSubmit}>
        <Input label="Email" type="email" name="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        {error && <p className="text-xs text-bad mb-3">{error}</p>}
        <Button type="submit" fullWidth disabled={loading}>{loading ? 'Sending…' : 'Send code'}</Button>
      </form>

      <div className="mt-4.5 text-[13px]">
        <Link to="/login" className="font-semibold text-ink">Back to log in</Link>
      </div>
    </AuthLayout>
  );
}
