import { useEffect, useState } from 'react';
import api from '../api/api.js';
import Navbar from '../components/Navbar.jsx';

export default function Roadmap() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [targetCareer, setTargetCareer] = useState('');
  const [educationLevel, setEducationLevel] = useState('Undergraduate');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [active, setActive] = useState(null);

  const load = async () => {
    setLoading(true);
    const res = await api.get('/roadmap');
    if (res && res.success) {
      setRoadmaps(res.data);
      if (res.data.length > 0) setActive(res.data[0]);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const generate = async (e) => {
    e.preventDefault();
    if (!targetCareer.trim()) return;
    setGenerating(true);
    setError('');
    const res = await api.post('/roadmap/generate', { targetCareer, educationLevel });
    if (res && res.success) {
      setRoadmaps((prev) => [res.data, ...prev]);
      setActive(res.data);
      setTargetCareer('');
    } else {
      setError(res ? res.message : 'Failed to generate roadmap');
    }
    setGenerating(false);
  };

  const updateStep = async (stepId, status) => {
    if (!active) return;
    const res = await api.put(`/roadmap/${active._id}/step/${stepId}`, { status });
    if (res && res.success) {
      setActive(res.data);
      setRoadmaps((prev) => prev.map((r) => (r._id === res.data._id ? res.data : r)));
    }
  };

  return (
    <>
      <Navbar tag="ROADMAP" />
      <div className="container mt-6 py-4">
        <h2 className="text-center mb-4">CAREER <span className="text-cyan">ROADMAP</span></h2>

        <div className="glass-card glow-border p-4 mb-4">
          <h5 className="mb-3">Generate a New Roadmap</h5>
          {error && <div className="alert alert-danger bg-transparent border-danger text-danger">{error}</div>}
          <form className="row g-3 align-items-end" onSubmit={generate}>
            <div className="col-md-5">
              <label className="form-label text-muted">TARGET CAREER</label>
              <input
                type="text"
                className="glass-input"
                placeholder="e.g. Data Scientist"
                value={targetCareer}
                onChange={(e) => setTargetCareer(e.target.value)}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label text-muted">EDUCATION LEVEL</label>
              <select
                className="form-select glass-input text-white bg-dark"
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
              >
                <option value="High School">High School</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="Professional">Professional</option>
              </select>
            </div>
            <div className="col-md-3">
              <button className="btn btn-neon-pink w-100" disabled={generating}>
                {generating ? <span className="spinner-border spinner-border-sm"></span> : 'GENERATE'}
              </button>
            </div>
          </form>
        </div>

        {loading ? (
          <div className="text-center py-5 text-muted">
            <div className="spinner-border mb-3 text-cyan"></div>
            <p>Loading roadmap data...</p>
          </div>
        ) : roadmaps.length === 0 ? (
          <div className="glass-card text-center py-5 text-muted">No roadmaps yet. Generate one above to get started.</div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-3">
              <div className="glass-card">
                <h6 className="text-muted mb-3">YOUR ROADMAPS</h6>
                {roadmaps.map((r) => (
                  <button
                    key={r._id}
                    className={`btn w-100 text-start mb-2 ${active?._id === r._id ? 'btn-neon-cyan' : 'btn-outline-light'}`}
                    onClick={() => setActive(r)}
                  >
                    {r.targetCareer}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-lg-9">
              {active && (
                <div className="glass-card p-4">
                  <h4 className="text-cyan mb-4">{active.targetCareer}</h4>
                  <div className="tree-line">
                    {active.steps.map((step) => (
                      <div className={`tree-node ${step.status}`} key={step._id}>
                        <div className="d-flex justify-content-between align-items-start flex-wrap">
                          <div>
                            <h5 className="mb-1">{step.title}</h5>
                            <p className="text-muted mb-1">{step.description}</p>
                            {step.duration && <span className="badge badge-cyan mb-2">{step.duration}</span>}
                          </div>
                          <select
                            className="form-select glass-input text-white bg-dark"
                            style={{ maxWidth: 160 }}
                            value={step.status}
                            onChange={(e) => updateStep(step._id, e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                        {step.resources && step.resources.length > 0 && (
                          <ul className="list-unstyled mt-2 mb-0">
                            {step.resources.map((res, i) => (
                              <li key={i} className="small">
                                <a href={res.url} target="_blank" rel="noreferrer" className="text-pink text-decoration-none">
                                  ↳ {res.title} ({res.type})
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
