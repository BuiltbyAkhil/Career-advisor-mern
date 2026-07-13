import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api.js';
import Navbar from '../components/Navbar.jsx';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await api.get('/dashboard');
      if (res && res.success) {
        setData(res.data);
        const cRes = await api.get('/colleges');
        if (cRes && cRes.success) setColleges(cRes.data.slice(0, 3));
      }
      setLoading(false);
    })();
  }, []);

  const latest = data?.activeRoadmaps?.[0];
  const completedCount = latest ? latest.steps.filter((s) => s.status === 'completed').length : 0;
  const totalSteps = latest ? latest.steps.length : 0;
  const progressPct = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  return (
    <>
      <Navbar tag="HUB" />
      <div className="container mt-6 py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>COMMAND <span className="text-white">CENTER</span></h2>
          {data && (
            data.subscription !== 'free' ? (
              <span className="badge badge-glass text-uppercase">PRO TIER ACTIVE</span>
            ) : (
              <span>
                <span className="badge bg-secondary text-uppercase border border-secondary">BASE LAYER</span>{' '}
                <Link to="/subscription" className="small text-pink text-decoration-none ms-2">UPGRADE</Link>
              </span>
            )
          )}
        </div>

        <div className="dashboard-grid mb-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          <div className="glass-card glow-border d-flex align-items-center justify-content-between">
            <div>
              <h5 className="text-muted">ACTIVE ROADMAPS</h5>
              <h2 className="mb-0">{data?.activeRoadmaps?.length ?? 0}</h2>
            </div>
            <div className="text-cyan fs-1">🗺️</div>
          </div>
          <div className="glass-card glow-border d-flex align-items-center justify-content-between">
            <div>
              <h5 className="text-muted">ASSESSMENTS TAKEN</h5>
              <h2 className="mb-0">{data?.latestQuizResult ? '1+' : '0'}</h2>
            </div>
            <div className="text-pink fs-1">📊</div>
          </div>
          <div className="glass-card glow-border d-flex align-items-center justify-content-between">
            <div>
              <h5 className="text-muted">ACHIEVEMENTS</h5>
              <h2 className="mb-0">{data?.achievements?.length ?? 0}</h2>
            </div>
            <div className="text-warning fs-1">🏆</div>
          </div>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-lg-8">
            <div className="glass-card h-100 position-relative">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="m-0">Current Progression</h4>
                <Link to="/career-tree" className="btn btn-sm btn-neon-cyan">VIEW FULL TREE</Link>
              </div>
              {loading ? (
                <div className="text-center py-4 text-muted">
                  <div className="spinner-border mb-3"></div>
                  <p>Syncing core data...</p>
                </div>
              ) : latest ? (
                <>
                  <h5 className="text-cyan mb-2">{latest.targetCareer}</h5>
                  <div className="progress mb-2" style={{ height: 10, background: 'rgba(255,255,255,0.1)' }}>
                    <div className="progress-bar bg-info" role="progressbar" style={{ width: `${progressPct}%` }}></div>
                  </div>
                  <p className="text-muted small mb-3">{completedCount} / {totalSteps} steps completed ({progressPct}%)</p>
                  <Link to="/roadmap" className="btn btn-outline-info btn-sm">VIEW ROADMAP</Link>
                </>
              ) : (
                <>
                  <p className="mb-3 text-muted">No career tracks initiated yet.</p>
                  <Link to="/roadmap" className="btn btn-sm btn-neon-pink">GENERATE NEW TRACK</Link>
                </>
              )}
            </div>
          </div>

          <div className="col-lg-4">
            <div
              className="glass-card h-100 d-flex flex-column align-items-center justify-content-center text-center p-4"
              style={{ background: 'linear-gradient(135deg, rgba(255,0,127,0.1), rgba(0,255,255,0.1))' }}
            >
              <h4 className="mb-3 text-pink">AI ADVISOR</h4>
              <p className="text-muted mb-4 small">
                Discuss your career path, resume, or interview prep directly with our intelligent assistant.
              </p>
              <Link to="/chat" className="btn btn-neon-pink pulse-anim w-100">INITIATE CHAT</Link>
            </div>
          </div>
        </div>

        <h4 className="mb-3">TOP MATCH <span className="text-cyan">INSTITUTIONS</span></h4>
        <div className="row g-3">
          {loading ? (
            <div className="col-12 text-center py-3 text-muted">Loading database clusters...</div>
          ) : colleges.length > 0 ? (
            colleges.map((c) => (
              <div className="col-md-4" key={c._id}>
                <div className="glass-card mb-3 border-secondary" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <h6 className="text-white">{c.name}</h6>
                  <p className="small text-muted mb-0">{c.location.city}, {c.location.state}</p>
                  <span className="badge bg-dark mt-2 border border-secondary">{c.type}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-muted">No institutions available right now.</div>
          )}
        </div>
      </div>
    </>
  );
}
