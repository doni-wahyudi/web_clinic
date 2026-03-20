import { useState } from 'react';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo login
    if (form.email === 'admin@kliniksehat.com' && form.password === 'admin123') {
      navigate('/dashboard');
    } else {
      setError('Email atau password salah. Coba: admin@kliniksehat.com / admin123');
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
              />
            </div>
            <button type="submit" className="btn btn-primary login-btn">
              Masuk <ArrowRight size={16} />
            </button>
          </form>

          <p className="login-hint">
            Demo: <code>admin@kliniksehat.com</code> / <code>admin123</code>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
