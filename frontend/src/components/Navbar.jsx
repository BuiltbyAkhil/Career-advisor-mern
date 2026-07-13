import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar({ tag }) {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-glass fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          CAREER<span className="text-pink">AI</span>{' '}
          {tag && <span className="fs-6 text-muted">| {tag}</span>}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/dashboard')}`} to="/dashboard">DASHBOARD</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/quiz')}`} to="/quiz">ASSESSMENTS</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/roadmap')}`} to="/roadmap">ROADMAPS</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/colleges')}`} to="/colleges">COLLEGES</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/learning-resources')}`} to="/learning-resources">RESOURCES</Link>
            </li>
            <li className="nav-item ms-lg-3 dropdown">
              <a
                className="nav-link dropdown-toggle text-cyan"
                href="#"
                id="profileDropdown"
                role="button"
                data-bs-toggle="dropdown"
              >
                SYSTEM USER
              </a>
              <ul className="dropdown-menu dropdown-menu-end glass-card p-2" style={{ background: 'rgba(10,10,26,0.95)' }}>
                <li>
                  <Link className="dropdown-item text-light border-bottom border-secondary mb-1" to="/profile">
                    Profile Settings
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-light border-bottom border-secondary mb-1" to="/subscription">
                    Subscription Status
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item text-pink" href="#" onClick={handleLogout}>
                    Terminate Session
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
