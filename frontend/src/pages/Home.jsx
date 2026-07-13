import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-glass fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">CAREER<span className="text-pink">AI</span></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item"><a className="nav-link" href="#features">FEATURES</a></li>
              <li className="nav-item"><a className="nav-link" href="#about">ABOUT AI</a></li>
              <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
                <Link to="/signin" className="btn btn-neon-cyan px-4">LOGIN</Link>
              </li>
              <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                <Link to="/signup" className="btn btn-neon-pink px-4">GET STARTED</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="min-vh-100 d-flex align-items-center mt-6">
        <div className="container text-center">
          <h1 className="display-3 fw-bold mb-4">MAP YOUR <span className="text-pink">FUTURE</span> WITH AI</h1>
          <p className="lead text-muted mb-5 mx-auto" style={{ maxWidth: 600 }}>
            Discover your perfect career path through AI-powered assessments, get customized learning
            roadmaps, and chat with our intelligent advisor to unlock your full potential.
          </p>
          <div className="pulse-anim d-inline-block" style={{ borderRadius: 30 }}>
            <Link to="/signup" className="btn btn-neon-cyan btn-lg px-5 py-3 rounded-pill fw-bold">
              START VOYAGE
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="py-5 mb-6">
        <div className="container">
          <h2 className="text-center mb-5">SYSTEM <span className="text-pink">CAPABILITIES</span></h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="glass-card h-100 text-center glow-border">
                <h4 className="mb-3">AI Skill Assessment</h4>
                <p className="text-muted">
                  Take our dynamically generated quiz to evaluate your technical, creative, and analytical strengths.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="glass-card h-100 text-center glow-border">
                <h4 className="mb-3">Dynamic Roadmaps</h4>
                <p className="text-muted">
                  Receive a personalized, step-by-step career progression tree tailored exactly to your goals.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="glass-card h-100 text-center glow-border">
                <h4 className="mb-3">24/7 Advisor Hub</h4>
                <p className="text-muted">
                  Chat directly with our Career AI to answer specific questions, review resumes, or seek interview prep.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
