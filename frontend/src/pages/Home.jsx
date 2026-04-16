import { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { courses } from '../data/coursesData';
import { useUserPreferences } from '../hooks/useUserPreferences';
import './Home.css';

function Home() {
  const { toggleInterested, toggleEnrolled, isInterested, isEnrolled, recommendations } = useUserPreferences();

  // Get featured courses (top rated)
  const featuredCourses = useMemo(() => {
    return [...courses].sort((a, b) => b.rating - a.rating).slice(0, 6);
  }, []);

  // Get new courses (last 4)
  const newCourses = useMemo(() => {
    return courses.slice(-4);
  }, []);

  const handleToggleInterested = useCallback(
    (courseId) => toggleInterested(courseId),
    [toggleInterested]
  );

  const handleToggleEnrolled = useCallback(
    (courseId) => toggleEnrolled(courseId),
    [toggleEnrolled]
  );

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">Welcome to Geek Academy</h1>
          <p className="hero-subtitle">Master programming, data science, and cloud technologies with comprehensive, expert-led courses</p>
          <div className="hero-cta">
            <Link to="/courses" className="btn-primary">
              Explore All Courses
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{courses.length}+</span>
              <span className="stat-label">Courses</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4.8★</span>
              <span className="stat-label">Avg Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="courses-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Featured Courses</h2>
            <p>Our highest-rated courses, recommended by thousands of learners</p>
          </div>
          <div className="courses-grid">
            {featuredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isInterested={isInterested}
                isEnrolled={isEnrolled}
                onToggleInterested={handleToggleInterested}
                onToggleEnrolled={handleToggleEnrolled}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <section className="recommendations-section">
          <div className="section-container">
            <div className="section-header">
              <h2>Recommended For You</h2>
              <p>Based on your interests and enrollments</p>
            </div>
            <div className="courses-grid">
              {recommendations.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isInterested={isInterested}
                  isEnrolled={isEnrolled}
                  onToggleInterested={handleToggleInterested}
                  onToggleEnrolled={handleToggleEnrolled}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Courses Section */}
      <section className="courses-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Latest Additions</h2>
            <p>Just released: New courses from expert instructors</p>
          </div>
          <div className="courses-grid">
            {newCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isInterested={isInterested}
                isEnrolled={isEnrolled}
                onToggleInterested={handleToggleInterested}
                onToggleEnrolled={handleToggleEnrolled}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
