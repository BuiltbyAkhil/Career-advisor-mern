import { useState } from 'react';
import api from '../api/api.js';
import Navbar from '../components/Navbar.jsx';

export default function Subscription() {
  const [message, setMessage] = useState(null); // { type: 'success' | 'danger', text }
  const [processing, setProcessing] = useState(false);

  const subscribe = async () => {
    setProcessing(true);
    setMessage(null);
    // Mock payment flow — no external gateway keys required.
    const res = await api.post('/payments/subscribe', { plan: 'pro', amount: 499 });
    if (res && res.success) {
      setMessage({ type: 'success', text: 'Uplink established successfully. Welcome to Pro Tier.' });
    } else {
      setMessage({ type: 'danger', text: res ? res.message : 'Failed to activate subscription.' });
    }
    setProcessing(false);
  };

  return (
    <>
      <Navbar tag="HUB" />
      <div className="container mt-6 py-4">
        <div className="text-center mb-5">
          <h2>UPLINK <span className="text-cyan">MODULES</span></h2>
          <p className="text-muted lead">Upgrade your access privileges for unlimited AI queries and priority processing.</p>
        </div>

        {message && (
          <div className={`alert alert-${message.type} glass-card bg-transparent border-${message.type} text-${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="row justify-content-center g-4">
          <div className="col-md-4">
            <div className="glass-card h-100 position-relative text-center">
              <h3 className="mb-3">BASE LAYER</h3>
              <h1 className="display-4 fw-bold text-white mb-3">₹0<span className="fs-6 text-muted fw-normal">/mo</span></h1>
              <hr className="border-secondary" />
              <ul className="list-unstyled text-start text-muted my-4 px-3" style={{ fontSize: '1.1rem', lineHeight: 2 }}>
                <li>✓ 1 AI Assessment / Month</li>
                <li>✓ 1 Career Roadmap</li>
                <li>✓ College Database Access</li>
                <li>✗ AI Advisor Chat</li>
                <li>✗ Priority Sync</li>
              </ul>
              <button className="btn btn-outline-secondary w-100 disabled" style={{ marginTop: 'auto' }}>ACTIVE BY DEFAULT</button>
            </div>
          </div>

          <div className="col-md-4">
            <div className="glass-card h-100 position-relative text-center glow-border" style={{ transform: 'scale(1.05)', zIndex: 10 }}>
              <div className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-pink">RECOMMENDED</div>
              <h3 className="mb-3 text-pink">PRO TIER</h3>
              <h1 className="display-4 fw-bold text-pink mb-3">₹499<span className="fs-6 text-muted fw-normal">/mo</span></h1>
              <hr className="border-pink opacity-25" />
              <ul className="list-unstyled text-start text-light my-4 px-3" style={{ fontSize: '1.1rem', lineHeight: 2 }}>
                <li>✓ <strong>Unlimited</strong> AI Assessments</li>
                <li>✓ <strong>Unlimited</strong> Career Roadmaps</li>
                <li>✓ College Database Access</li>
                <li>✓ <strong>24/7 AI Advisor Chat</strong></li>
                <li>✓ Priority Sync</li>
              </ul>
              <button className="btn btn-neon-pink w-100 font-heading" onClick={subscribe} disabled={processing}>
                {processing ? <span className="spinner-border spinner-border-sm"></span> : 'ACTIVATE PRO TIER'}
              </button>
              <p className="text-muted small mt-2 mb-0">Demo checkout — no real payment gateway wired up.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
