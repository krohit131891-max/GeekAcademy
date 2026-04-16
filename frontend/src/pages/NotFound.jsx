import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon">404</div>
        <h1>Page Not Found</h1>
        <p>Sorry, the page you're looking for doesn't exist or has been moved.</p>
        <div className="not-found-actions">
          <Link to="/" className="action-button primary">
            Go Home
          </Link>
          <Link to="/courses" className="action-button secondary">
            Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
