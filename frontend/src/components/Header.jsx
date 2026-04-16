import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';
import { useState } from 'react';

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();

  return (
    <header className="header">
      {/* Top Navigation Bar */}
      <div className="header-top">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🧑‍💻</span>
            <span className="logo-text">Geek Academy</span>
          </Link>
          <nav className="nav">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className={`nav-link ${location.pathname === '/courses' ? 'active' : ''}`}
            >
              Courses
            </Link>
            <Link
              to="/instructors"
              className={`nav-link ${location.pathname === '/instructors' ? 'active' : ''
                }`}
            >
              Instructors
            </Link>
          </nav>

          <div className="auth-buttons">
            {isAuthenticated && user ? (
              <div className="user-menu">
                <button
                  className="user-button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  👤 {user.fullName}
                </button>
                {showUserMenu && (
                  <div className="dropdown-menu">
                    <div className="menu-item menu-email">{user.email}</div>
                    <Link to="/dashboard" className="menu-item">
                      My Courses
                    </Link>
                    <button
                      className="menu-item logout-btn"
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Secondary Navigation with Categories */}
      <div className="header-secondary">
        <div className="header-content">
          <nav className="categories-nav">
            <Link
              to="/courses?category=Web Development"
              className="category-link"
            >
              Web Development
            </Link>
            <Link to="/courses?category=Mobile" className="category-link">
              Mobile Apps
            </Link>
            <Link to="/courses?category=Data Science" className="category-link">
              Data Science
            </Link>
            <Link to="/courses?category=AI/ML" className="category-link">
              AI & ML
            </Link>
            <Link to="/courses?category=Cloud" className="category-link">
              Cloud
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
