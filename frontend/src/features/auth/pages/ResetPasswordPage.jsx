import { useRef, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import AuthLayout from '../components/AuthLayout';
// import { verifyOtp, resetPassword } from '../api/authApi'; // TODO: swap the mock submit below for these

export default function ResetPasswordPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email ?? '';
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [passwords, setPasswords] = useState({ next: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleOtpChange = (i, val) => {
    if (val && !/^\d$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Enter the full 6-digit code.');
      return;
    }
    if (passwords.next.length < 8) {
      setError('New password must be at least 8 characters.');
      return;
    }
    if (passwords.next !== passwords.confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      // TODO: await verifyOtp({ email, code });
      // TODO: await resetPassword({ email, code, password: passwords.next });
      navigate('/login');
    } catch (err) {
      setError(err?.response?.data?.message ?? 'Could not reset your password. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout tagline={`Code sent to ${email || 'your email'}. It expires in 10 minutes.`}>
      <h1 className="font-display text-xl font-bold mb-1">Enter code</h1>
      <p className="text-ink-soft text-[13.5px] mb-5">Then set a new password.</p>

      <form onSubmit={handleSubmit}>
        <label className="mb-1.5 block text-xs font-semibold text-ink">6-digit code</label>
        <div className="flex gap-2 mb-1.5">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(i, e.target.value)}
              className="w-10 h-12 text-center text-lg font-mono !px-0"
            />
          ))}
        </div>
        <p className="text-xs text-ink-soft mb-5">Didn't get it? <span className="font-semibold text-ink cursor-pointer">Resend code</span></p>

        <Input label="New password" type="password" hint="At least 8 characters"
          value={passwords.next} onChange={(e) => setPasswords({ ...passwords, next: e.target.value })} />
        <Input label="Confirm new password" type="password"
          value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} />

        {error && <p className="text-xs text-bad mb-3">{error}</p>}
        <Button type="submit" fullWidth disabled={loading}>{loading ? 'Saving…' : 'Set new password'}</Button>
      </form>

      <div className="mt-4.5 text-[13px]">
        <Link to="/login" className="font-semibold text-ink">Back to log in</Link>
      </div>
    </AuthLayout>
  );
}
