import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    const res = await api.post('/auth/register', { name, email, password });

    if (res && res.success) {
      login(res.data);
      navigate('/profile');
    } else {
      setError(res ? res.message : 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6">
            <div className="text-center mb-4">
              <Link to="/" className="text-decoration-none">
                <h2 className="brand-text">CAREER<span className="text-pink">AI</span></h2>
              </Link>
            </div>
            <div className="glass-card glow-border p-5">
              <h3 className="text-center mb-4">INITIALIZE <span className="text-pink">ACCOUNT</span></h3>
              {error && (
                <div className="alert alert-danger bg-transparent border-danger text-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-muted">FULL DESIGNATION (Name)</label>
                  <input type="text" className="glass-input" required placeholder="Akhil M"
                    value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted">IDENTIFIER (Email)</label>
                  <input type="email" className="glass-input" required placeholder="user@domain.com"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted">SECURITY PASSCODE</label>
                  <input type="password" className="glass-input" required placeholder="••••••••"
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-4">
                  <label className="form-label text-muted">VERIFY PASSCODE</label>
                  <input type="password" className="glass-input" required placeholder="••••••••"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-neon-pink w-100 py-2 mt-2 fw-bold" disabled={loading}>
                  {loading ? (
                    <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</>
                  ) : 'ESTABLISH CONNECTION'}
                </button>
              </form>
              <div className="text-center mt-4">
                <p className="text-muted">
                  Already registered?{' '}
                  <Link to="/signin" className="text-cyan text-decoration-none border-bottom border-cyan">
                    Return to Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
