import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 text-center">
      <div>
        <h1 className="display-1">404</h1>
        <p className="text-muted mb-4">This sector of the network does not exist.</p>
        <Link to="/" className="btn btn-neon-cyan px-4">RETURN TO BASE</Link>
      </div>
    </div>
  );
}
