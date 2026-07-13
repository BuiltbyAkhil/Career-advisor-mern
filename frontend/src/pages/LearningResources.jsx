import { Link } from 'react-router-dom';

const RESOURCES = [
  { title: 'CS50: Introduction to Computer Science', url: 'https://pll.harvard.edu/course/cs50', type: 'course' },
  { title: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/', type: 'course' },
  { title: 'Machine Learning by Andrew Ng', url: 'https://www.coursera.org/', type: 'course' },
  { title: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', type: 'course' },
  { title: 'The Odin Project', url: 'https://www.theodinproject.com/', type: 'course' },
  { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/', type: 'article' },
  { title: 'LeetCode', url: 'https://leetcode.com/', type: 'article' },
  { title: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/', type: 'article' },
  { title: 'Pluralsight', url: 'https://www.pluralsight.com/', type: 'video' },
  { title: 'Clean Code', url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882', type: 'book' },
];

const ICONS = { course: '🎓', article: '📄', video: '▶️', book: '📚' };

export default function LearningResources() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-glass fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/dashboard">
            CAREER<span className="text-pink">AI</span> <span className="fs-6 text-muted">| DATABANKS</span>
          </Link>
          <div className="ms-auto">
            <Link className="nav-link text-white" to="/dashboard">← BACK TO HUB</Link>
          </div>
        </div>
      </nav>

      <div className="container mt-6 py-4">
        <h2 className="text-center mb-5 border-bottom border-dark pb-3">
          KNOWLEDGE <span className="text-cyan">REPOSITORIES</span>
        </h2>

        <div className="row g-4">
          {RESOURCES.map((res) => (
            <div className="col-md-6 col-lg-4" key={res.title}>
              <a href={res.url} target="_blank" rel="noreferrer" className="text-decoration-none">
                <div className="glass-card h-100 glow-border d-flex align-items-center p-4">
                  <div className="fs-1 me-4">{ICONS[res.type] || '🔗'}</div>
                  <div>
                    <span className="badge badge-cyan text-uppercase mb-2">{res.type}</span>
                    <h5 className="text-white m-0">{res.title}</h5>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
