import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api.js';

const STATUS_COLOR = {
  completed: 'text-cyan',
  'in-progress': 'text-pink',
  pending: 'text-muted',
};

export default function CareerTree() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await api.get('/roadmap');
      if (res && res.success) setRoadmaps(res.data);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-glass fixed-top" style={{ zIndex: 50 }}>
        <div className="container-fluid px-4">
          <Link className="navbar-brand" to="/dashboard">
            CAREER<span className="text-pink">AI</span> <span className="fs-6 text-muted">| CAREER TREE</span>
          </Link>
          <div className="ms-auto d-flex gap-3 align-items-center">
            <span className="text-muted small d-none d-md-inline">A branch-by-branch view of every roadmap you've generated</span>
            <Link className="nav-link text-white" to="/dashboard">← BACK TO HUB</Link>
          </div>
        </div>
      </nav>

      <div className="container mt-6 py-4">
        {loading ? (
          <div className="text-center py-5 text-muted">
            <div className="spinner-border mb-3 text-cyan"></div>
            <p>Loading career tree...</p>
          </div>
        ) : roadmaps.length === 0 ? (
          <div className="glass-card text-center py-5 text-muted">
            No branches yet. <Link to="/roadmap" className="text-cyan">Generate a roadmap</Link> to grow your career tree.
          </div>
        ) : (
          roadmaps.map((r) => (
            <div className="glass-card glow-border mb-4 p-4" key={r._id}>
              <h4 className="text-pink mb-3">🌳 {r.targetCareer}</h4>
              <div className="d-flex flex-wrap gap-3">
                {r.steps.map((step, idx) => (
                  <div
                    key={step._id}
                    className="glass-card p-3"
                    style={{ minWidth: 220, maxWidth: 260, borderColor: step.status === 'completed' ? 'var(--accent-cyan)' : undefined }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge badge-cyan">STEP {idx + 1}</span>
                      <span className={`small fw-bold text-uppercase ${STATUS_COLOR[step.status]}`}>{step.status}</span>
                    </div>
                    <h6 className="text-white">{step.title}</h6>
                    <p className="text-muted small mb-0">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
