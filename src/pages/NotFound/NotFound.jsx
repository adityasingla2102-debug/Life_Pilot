import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="notfound-page">
      <header className="page-header">
        <h1 className="page-title">404</h1>
        <p className="page-subtitle">Page not found.</p>
      </header>

      <div className="notfound-content">
        <p>The page you're looking for doesn't exist or hasn't been implemented yet.</p>
        <Link to="/" className="notfound-link">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
