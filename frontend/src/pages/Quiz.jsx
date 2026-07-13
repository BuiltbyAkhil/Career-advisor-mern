import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api.js';
import Navbar from '../components/Navbar.jsx';

const CATEGORIES = [
  'Software Engineering',
  'Data Science',
  'Product Management',
  'Digital Marketing',
  'UX/UI Design',
  'General Career Aptitude',
];

export default function Quiz() {
  const [stage, setStage] = useState('setup'); // setup | active | results
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const generateQuiz = async () => {
    setLoading(true);
    setError('');
    const res = await api.post('/quiz/generate', { category });
    if (res && res.success) {
      setQuestions(res.data.questions);
      setAnswers(new Array(res.data.questions.length).fill(null));
      setCurrentIndex(0);
      setStage('active');
    } else {
      setError(res ? res.message : 'Error generating quiz');
    }
    setLoading(false);
  };

  const selectAnswer = (opt) => {
    const next = [...answers];
    next[currentIndex] = opt;
    setAnswers(next);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const submitQuiz = async () => {
    setSubmitting(true);
    const res = await api.post('/quiz/submit', { questions, answers });
    if (res && res.success) {
      setResult(res.data);
      setStage('results');
    } else {
      alert('Failed to submit results');
    }
    setSubmitting(false);
  };

  const currentQuestion = questions[currentIndex];
  const hasAnswer = !!answers[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  return (
    <>
      <Navbar tag="ASSESS" />
      <div className="container mt-6 py-4">
        <h2 className="text-center mb-4">DYNAMIC <span className="text-cyan">ASSESSMENT</span></h2>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            {stage === 'setup' && (
              <div className="glass-card glow-border p-4 text-center">
                <p className="lead mb-4">
                  Our AI agent will generate a custom 5-question evaluation based on your selected domain
                  to analyze your core competencies.
                </p>
                {error && <div className="alert alert-danger bg-transparent border-danger text-danger">{error}</div>}
                <div className="row justify-content-center mb-4">
                  <div className="col-md-8">
                    <select
                      className="form-select glass-input text-white bg-dark"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button className="btn btn-neon-pink px-5 py-2 fw-bold fs-5" onClick={generateQuiz} disabled={loading}>
                  GENERATE PROMPT
                </button>
                {loading && (
                  <div className="mt-3 text-cyan">
                    <span className="spinner-border spinner-border-sm"></span> Calibrating AI Neural Net...
                  </div>
                )}
              </div>
            )}

            {stage === 'active' && currentQuestion && (
              <div className="glass-card p-4">
                <div className="d-flex justify-content-between text-muted mb-3 border-bottom border-secondary pb-2">
                  <span>QUESTION <span className="text-cyan fw-bold">{currentIndex + 1}</span> OF <span>{questions.length}</span></span>
                  <span>DOMAIN: <span className="text-pink">{category.toUpperCase()}</span></span>
                </div>

                <h4 className="mb-4 my-4" style={{ lineHeight: 1.5 }}>{currentQuestion.question}</h4>

                <div className="d-flex flex-column gap-3 mb-4">
                  {currentQuestion.options.map((opt, idx) => {
                    const active = answers[currentIndex] === opt;
                    return (
                      <button
                        key={idx}
                        className={`btn btn-outline-light text-start p-3 w-100 ${active ? 'active border-cyan text-cyan' : ''}`}
                        style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem' }}
                        onClick={() => selectAnswer(opt)}
                      >
                        <span className="fw-bold me-3 text-muted">{['A', 'B', 'C', 'D'][idx]}.</span> {opt}
                      </button>
                    );
                  })}
                </div>

                <div className="text-end mt-4 pt-3 border-top border-secondary">
                  {!isLast ? (
                    <button className="btn btn-neon-cyan px-4" onClick={nextQuestion} disabled={!hasAnswer}>
                      NEXT ITERATION
                    </button>
                  ) : (
                    <button className="btn btn-neon-pink px-4" onClick={submitQuiz} disabled={!hasAnswer || submitting}>
                      {submitting ? (
                        <><span className="spinner-border spinner-border-sm"></span> Processing...</>
                      ) : 'ANALYZE RESULTS'}
                    </button>
                  )}
                </div>
              </div>
            )}

            {stage === 'results' && result && (
              <div className="glass-card glow-border p-5 text-center">
                <h2 className="text-pink mb-4">ANALYSIS COMPLETE</h2>
                <div className="row justify-content-center mb-4">
                  {[
                    ['ANALYTICAL', result.scores.analytical, 'text-cyan'],
                    ['CREATIVE', result.scores.creative, 'text-pink'],
                    ['TECHNICAL', result.scores.technical, 'text-cyan'],
                    ['COMMUNICATION', result.scores.communication, 'text-pink'],
                  ].map(([label, score, color]) => (
                    <div className="col-6 col-md-3 mb-3" key={label}>
                      <div className="p-3 border rounded border-secondary" style={{ background: 'rgba(0,0,0,0.3)' }}>
                        <h6 className="text-muted small">{label}</h6>
                        <h2 className={`${color} mb-0`}>{score}</h2>
                      </div>
                    </div>
                  ))}
                </div>

                <h5 className="text-muted mb-3">RECOMMENDED VECTORS</h5>
                <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                  {result.recommendedCareers.map((c) => (
                    <span className="badge badge-cyan fs-6 p-2" key={c}>{c}</span>
                  ))}
                </div>

                <Link to="/roadmap" className="btn btn-neon-cyan mt-3 px-4">GENERATE ROADMAP FROM RESULTS</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
