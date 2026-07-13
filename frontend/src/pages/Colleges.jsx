import { useEffect, useState } from 'react';
import api from '../api/api.js';
import Navbar from '../components/Navbar.jsx';

export default function Colleges() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [type, setType] = useState('');
  const [selected, setSelected] = useState(null);

  const loadColleges = async (params = '') => {
    setLoading(true);
    setErrorMsg('');
    const res = await api.get(`/colleges${params}`);
    if (res && res.success) {
      setColleges(res.data);
    } else {
      setErrorMsg('Failed to load institution database.');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadColleges();
  }, []);

  const handleSearch = () => {
    const queryParams = [];
    if (city) queryParams.push(`city=${encodeURIComponent(city)}`);
    if (state) queryParams.push(`state=${encodeURIComponent(state)}`);
    if (type) queryParams.push(`type=${encodeURIComponent(type)}`);
    const pStr = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    loadColleges(pStr);
  };

  return (
    <>
      <Navbar tag="DIRECTORY" />
      <div className="container mt-6 py-4">
        <h2 className="mb-4 text-center">INSTITUTION <span className="text-cyan">DATABASE</span></h2>

        <div className="glass-card mb-4 p-3 d-flex flex-wrap gap-3 align-items-center justify-content-center">
          <input
            type="text"
            className="glass-input flex-grow-1"
            style={{ maxWidth: 250 }}
            placeholder="Filter by City..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            className="glass-input flex-grow-1"
            style={{ maxWidth: 250 }}
            placeholder="Filter by State..."
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <select
            className="form-select glass-input flex-grow-1 text-white bg-dark"
            style={{ maxWidth: 250 }}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
            <option value="Deemed">Deemed</option>
          </select>
          <button className="btn btn-neon-cyan px-4" onClick={handleSearch}>SCAN DATA</button>
        </div>

        <div className="row justify-content-center g-4">
          {loading && (
            <div className="col-12 text-center py-5 text-muted">
              <div className="spinner-border mb-3 text-cyan"></div>
              <h4>Querying Servers...</h4>
            </div>
          )}
          {!loading && errorMsg && <div className="col-12 text-center text-danger py-5">{errorMsg}</div>}
          {!loading && !errorMsg && colleges.length === 0 && (
            <div className="col-12 text-center text-muted py-5">No institutions matched your query.</div>
          )}
          {!loading && colleges.map((c) => (
            <div className="col-md-6 col-lg-4" key={c._id}>
              <div className="glass-card h-100 d-flex flex-column">
                <div className="mb-3 d-flex justify-content-between align-items-start">
                  <span className="badge badge-cyan text-uppercase">{c.type}</span>
                  <span className="badge bg-dark border border-secondary text-muted">RANK #{c.ranking || 'N/A'}</span>
                </div>
                <h5 className="text-white mb-2">{c.name}</h5>
                <p className="text-muted small mb-4">📍 {c.location.city}, {c.location.state}</p>
                <button className="btn btn-outline-info w-100 mt-auto" onClick={() => setSelected(c)}>
                  VIEW DETAILS
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="modal fade show"
          style={{ display: 'block', background: 'rgba(0,0,0,0.7)' }}
          onClick={() => setSelected(null)}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content glass-card" style={{ background: 'rgba(10,10,26,0.95)', borderColor: 'var(--accent-cyan)' }}>
              <div className="modal-header border-bottom border-secondary">
                <h4 className="modal-title font-heading text-cyan">{selected.name}</h4>
                <button type="button" className="btn-close btn-close-white" onClick={() => setSelected(null)}></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-sm-6 text-muted">TYPE: <span className="text-white">{selected.type.toUpperCase()}</span></div>
                  <div className="col-sm-6 text-muted text-sm-end">ESTABLISHED: <span className="text-white">{selected.established || 'Unknown'}</span></div>
                </div>
                <div className="mb-4 text-muted">LOCATION: <span className="text-white">{selected.location.city}, {selected.location.state}</span></div>
                <p className="mb-4" style={{ lineHeight: 1.6 }}>
                  {selected.description || 'A premier engineering institution dedicated to pushing the boundaries of technology and research.'}
                </p>

                <h5 className="text-pink border-bottom border-secondary pb-2 mb-3">Top Programs</h5>
                <ul className="list-unstyled">
                  {selected.courses && selected.courses.length > 0 ? (
                    selected.courses.map((c, i) => (
                      <li className="mb-2 text-white" key={i}>
                        <span className="text-cyan">↳</span> {c.name}{' '}
                        <span className="text-muted small ms-2">({c.duration || 'N/A'})</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-muted">General Engineering Disciplines Available</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
