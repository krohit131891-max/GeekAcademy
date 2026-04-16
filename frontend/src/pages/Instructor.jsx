import { useParams, Link } from 'react-router-dom';
import { useCallback } from 'react';
import CourseCard from '../components/CourseCard';
import { getInstructorById, getCoursesByInstructor } from '../data/coursesData';
import { useUserPreferences } from '../hooks/useUserPreferences';
import './Instructor.css';

function Instructor() {
  const { id } = useParams();
  const { toggleInterested, toggleEnrolled, isInterested, isEnrolled } =
    useUserPreferences();

  const handleToggleInterested = useCallback(
    (courseId) => toggleInterested(courseId),
    [toggleInterested]
  );

  const handleToggleEnrolled = useCallback(
    (courseId) => toggleEnrolled(courseId),
    [toggleEnrolled]
  );

  const instructor = getInstructorById(id);

  if (!instructor) {
    return (
      <div className="error-page">
        <div className="error-content">
          <h1>Instructor Not Found</h1>
          <p>Sorry, the instructor profile you're looking for doesn't exist.</p>
          <Link to="/courses" className="back-button">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const courses = getCoursesByInstructor(instructor.id);

  return (
    <div className="instructor-page">
      {/* Instructor Header */}
      <section className="instructor-header">
        <div className="instructor-header-content">
          <div className="instructor-avatar-large">{instructor.avatar}</div>
          <div className="instructor-header-info">
            <h1>{instructor.name}</h1>
            <p className="instructor-bio-large">{instructor.bio}</p>

            <div className="instructor-stats">
              <div className="stat">
                <span className="stat-value">{instructor.followers.toLocaleString()}</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat">
                <span className="stat-value">{courses.length}</span>
                <span className="stat-label">Courses</span>
              </div>
              <div className="stat">
                <span className="stat-value">⭐ 4.8</span>
                <span className="stat-label">Avg Rating</span>
              </div>
            </div>

            {instructor.email && (
              <div className="instructor-contact">
                <span>📧</span>
                <a href={`mailto:${instructor.email}`}>{instructor.email}</a>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="instructor-container">
        {/* Expertise & About */}
        <aside className="instructor-sidebar">
          <div className="sidebar-card">
            <h3>Expertise</h3>
            <div className="expertise-list">
              {instructor.expertise.map((skill) => (
                <span key={skill} className="skill-badge">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="instructor-main">
          {/* Courses Section */}
          <section className="instructor-courses-section">
            <h2>Courses by {instructor.name}</h2>
            <p className="section-description">
              Explore all {courses.length} course{courses.length !== 1 ? 's' : ''} offered by this
              instructor
            </p>

            {courses.length > 0 ? (
              <div className="instructor-courses-grid">
                {courses.map((course) => (
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
            ) : (
              <div className="empty-state">
                <p>No courses available yet</p>
              </div>
            )}
          </section>

          {/* About Instructor Section */}
          <section className="about-section">
            <h2>About {instructor.name}</h2>
            <div className="about-content">
              <p>{instructor.bio}</p>
              <div className="about-highlights">
                <div className="highlight">
                  <h4>Teaching Style</h4>
                  <p>
                    {instructor.name} is dedicated to making complex topics accessible through
                    practical examples and hands-on projects.
                  </p>
                </div>
                <div className="highlight">
                  <h4>Student Focus</h4>
                  <p>
                    With a focus on career development, {instructor.name} ensures every course
                    includes real-world applications.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Instructor;
