import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await api.post('/auth/login', { email, password });

    if (res && res.success) {
      login(res.data);
      navigate('/dashboard');
    } else {
      setError(res ? res.message : 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="text-center mb-4">
              <Link to="/" className="text-decoration-none">
                <h2 className="brand-text">CAREER<span className="text-pink">AI</span></h2>
              </Link>
            </div>
            <div className="glass-card glow-border p-5">
              <h3 className="text-center mb-4">SYSTEM <span className="text-cyan">LOGIN</span></h3>
              {error && (
                <div className="alert alert-danger bg-transparent border-danger text-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label text-muted">IDENTIFIER (Email)</label>
                  <input
                    type="email"
                    className="glass-input"
                    required
                    placeholder="user@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-muted">PASSCODE</label>
                  <input
                    type="password"
                    className="glass-input"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-neon-cyan w-100 py-2 mt-3 fw-bold" disabled={loading}>
                  {loading ? (
                    <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</>
                  ) : 'INITIATE SESSION'}
                </button>
              </form>
              <div className="text-center mt-4">
                <p className="text-muted">
                  Unregistered user?{' '}
                  <Link to="/signup" className="text-pink text-decoration-none border-bottom border-pink">
                    Create Account
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
