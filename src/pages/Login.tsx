import { useState } from 'react';
import { Lock, Mail, ArrowRight, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Check if env vars are configured
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      setError('Konfigurasi Supabase belum diatur di file .env');
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (authError) {
        throw authError;
      }

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Email atau password salah. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page" id="login-page">
      <div className="login-container">
        <div className="login-card animate-fade-in">
          <div className="login-header">
            <span className="brand-icon" style={{ fontSize: '2.5rem' }}>🏥</span>
            <h1>Admin Login</h1>
            <p>Masuk ke dashboard admin KlinikSehat</p>
          </div>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label"><Mail size={14} /> Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="admin@kliniksehat.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label className="form-label"><Lock size={14} /> Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
              {loading ? <Loader size={16} className="animate-spin" /> : 'Masuk'} <ArrowRight size={16} />
            </button>
          </form>

          <p className="login-hint">
             Pastikan file <code>.env</code> sudah dikonfigurasi dengan URL & Anon Key Supabase Anda.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
