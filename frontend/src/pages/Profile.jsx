import { useEffect, useState } from 'react';
import api from '../api/api.js';
import Navbar from '../components/Navbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Profile() {
  const { updateUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [interests, setInterests] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await api.get('/profile');
      if (res && res.success) {
        setName(res.data.name || '');
        setEmail(res.data.email || '');
        setEducationLevel(res.data.educationLevel || '');
        setInterests((res.data.interests || []).join(', '));
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    setErrorMsg('');

    const data = {
      name,
      educationLevel,
      interests: interests.split(',').map((i) => i.trim()).filter((i) => i !== ''),
    };

    const res = await api.put('/profile', data);

    if (res && res.success) {
      setSuccessMsg('Identity Configuration synced successfully.');
      updateUser({ name: res.data.name });
    } else {
      setErrorMsg(res ? res.message : 'Sync failed.');
    }
    setSaving(false);
  };

  return (
    <>
      <Navbar tag="HUB" />
      <div className="container mt-6 py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 className="mb-4 text-center">IDENTITY <span className="text-pink">CONFIGURATION</span></h2>

            <div className="glass-card glow-border p-4 mb-4">
              <h4 className="mb-4 border-bottom border-secondary pb-2">Core Parameters</h4>
              {successMsg && <div className="alert alert-success bg-transparent border-success text-success">{successMsg}</div>}
              {errorMsg && <div className="alert alert-danger bg-transparent border-danger text-danger">{errorMsg}</div>}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label text-muted">FULL DESIGNATION</label>
                    <input type="text" className="glass-input" required value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted">IDENTIFIER (Email - Locked)</label>
                    <input type="email" className="glass-input" disabled value={email} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted">CURRENT EDUCATION LEVEL</label>
                    <select
                      className="form-select glass-input text-white"
                      style={{ backgroundColor: 'var(--bg-color)' }}
                      value={educationLevel}
                      onChange={(e) => setEducationLevel(e.target.value)}
                    >
                      <option value="">Select Level...</option>
                      <option value="High School">High School</option>
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Postgraduate">Postgraduate</option>
                      <option value="Professional">Professional</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted">PRIMARY INTERESTS (Comma separated)</label>
                    <input
                      type="text"
                      className="glass-input"
                      placeholder="e.g. Technology, Design, Finance"
                      value={interests}
                      onChange={(e) => setInterests(e.target.value)}
                    />
                  </div>
                  <div className="col-12 mt-4 text-end">
                    <button type="submit" className="btn btn-neon-cyan px-4" disabled={saving}>
                      {saving ? <><span className="spinner-border spinner-border-sm"></span> Syncing...</> : 'SYNC DATA'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
