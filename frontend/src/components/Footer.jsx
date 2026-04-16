import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About CourseHub</h3>
          <p>Learn from industry experts and master new skills with our comprehensive online courses. Start your learning journey today.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/instructors">Instructors</Link></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li><Link to="/courses?category=Web Development">Web Development</Link></li>
            <li><Link to="/courses?category=Mobile">Mobile Apps</Link></li>
            <li><Link to="/courses?category=Data Science">Data Science</Link></li>
            <li><Link to="/courses?category=AI/ML">AI & Machine Learning</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} CourseHub. All rights reserved. | Learning made simple</p>
      </div>
    </footer>
  );
}

export default Footer;
