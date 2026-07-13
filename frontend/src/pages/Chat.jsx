import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api.js';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [historyError, setHistoryError] = useState('');
  const chatWindowRef = useRef(null);

  useEffect(() => {
    (async () => {
      const res = await api.get('/chat');
      if (res && res.success && res.data.messages) {
        if (res.data.messages.length === 0) {
          setMessages([{ role: 'assistant', content: 'Greeting. I am your personal Career AI Advisor. How may I assist your trajectory today?' }]);
        } else {
          setMessages(res.data.messages.filter((m) => m.role !== 'system'));
        }
      } else {
        setHistoryError('Failed to sync communication history.');
      }
      setLoadingHistory(false);
    })();
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInput('');
    setSending(true);

    const res = await api.post('/chat', { message: text });

    if (res && res.success) {
      const msgs = res.data.messages.filter((m) => m.role !== 'system');
      setMessages((prev) => [...prev, msgs[msgs.length - 1]]);
    } else {
      setMessages((prev) => [...prev, { role: 'assistant', content: '[SYSTEM ERROR: Unable to parse query. Try again.]', error: true }]);
    }
    setSending(false);
  };

  return (
    <div className="d-flex flex-column" style={{ height: '100vh' }}>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-glass">
        <div className="container">
          <Link className="navbar-brand" to="/dashboard">
            CAREER<span className="text-pink">AI</span> <span className="fs-6 text-muted">| COMMUNICATION PROTOCOL</span>
          </Link>
          <div className="ms-auto">
            <Link className="nav-link text-white" to="/dashboard">← DISCONNECT</Link>
          </div>
        </div>
      </nav>

      <div className="container flex-grow-1 py-4 d-flex flex-column justify-content-between" style={{ maxWidth: 800 }}>
        <div className="text-center mb-3">
          <span className="badge badge-cyan pulse-anim px-3 py-2">LIVE CONNECTION IDENTIFIED</span>
        </div>

        <div className="chat-container glass-card mb-4 flex-grow-1" ref={chatWindowRef}>
          {loadingHistory && (
            <div className="text-center text-muted my-auto">
              <span className="spinner-border text-pink mb-2"></span><br />Syncing Chat History...
            </div>
          )}
          {historyError && <div className="text-center text-danger my-auto">{historyError}</div>}
          {messages.map((msg, idx) => (
            <div className={`chat-bubble ${msg.role === 'user' ? 'user' : 'ai'}`} key={idx}>
              <strong className={msg.role === 'user' ? 'text-cyan' : 'text-pink'}>
                {msg.role === 'user' ? 'USER:' : 'AI ADVISOR:'}
              </strong>
              <br />
              <span className={msg.error ? 'text-danger' : ''}>{msg.content}</span>
            </div>
          ))}
        </div>

        <div className="glass-card p-3">
          <form className="d-flex gap-2" onSubmit={handleSend}>
            <input
              type="text"
              className="glass-input"
              placeholder="Initiate query or dictate response..."
              required
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="btn btn-neon-pink px-4 fw-bold" disabled={sending}>
              {sending ? <span className="spinner-border spinner-border-sm"></span> : 'TRANSMIT'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
