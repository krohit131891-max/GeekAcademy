import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import CourseCard from '../components/CourseCard';
import InstructorCard from '../components/InstructorCard';
import { getCourseById, getInstructorById, getSimilarCourses, getCoursesByInstructor } from '../data/coursesData';
import { useUserPreferences } from '../hooks/useUserPreferences';
import { useAuth } from '../context/AuthContext';
import './CourseDetails.css';

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, enrollCourse, toggleInterested } = useAuth();
  const { toggleInterested: localToggleInterested, toggleEnrolled, isInterested, isEnrolled, recommendations } =
    useUserPreferences();
  const [expandedModule, setExpandedModule] = useState(null);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [enrollError, setEnrollError] = useState('');

  const handleToggleInterested = useCallback(
    (courseId) => {
      if (!isAuthenticated) {
        navigate(`/login?returnTo=/course/${courseId}`);
        return;
      }
      localToggleInterested(courseId);
      toggleInterested(courseId).catch(() => { });
    },
    [isAuthenticated, localToggleInterested, toggleInterested, navigate]
  );

  const handleEnroll = useCallback(
    async (courseId) => {
      if (!isAuthenticated) {
        navigate(`/login?returnTo=/course/${courseId}`);
        return;
      }

      setEnrollLoading(true);
      setEnrollError('');
      try {
        await enrollCourse(courseId);
        // User data will be synced automatically through AuthContext
      } catch (error) {
        setEnrollError(error.response?.data?.message || 'Failed to enroll');
      } finally {
        setEnrollLoading(false);
      }
    },
    [isAuthenticated, enrollCourse, navigate]
  );

  const course = getCourseById(id);

  if (!course) {
    return (
      <div className="error-page">
        <div className="error-content">
          <h1>Course Not Found</h1>
          <p>Sorry, the course you're looking for doesn't exist.</p>
          <Link to="/courses" className="back-button">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const instructor = getInstructorById(course.instructor_id);
  const similarCourses = getSimilarCourses(course.id, 3);
  const instructorCourses = instructor ? getCoursesByInstructor(instructor.id) : [];

  return (
    <div className="course-details-page">
      {/* Course Header */}
      <section className="course-header">
        <div className="course-header-content">
          <div className="course-header-left">
            <div className="course-image-large">{course.image}</div>
          </div>
          <div className="course-header-right">
            <div className="breadcrumb">
              <Link to="/courses">Courses</Link>
              <span> / {course.category}</span>
            </div>
            <h1>{course.title}</h1>
            <p className="course-description-detailed">{course.description}</p>

            <div className="course-meta-detailed">
              <span className="rating">⭐ {course.rating} ({course.reviews} reviews)</span>
              <span className="duration">⏱️ {course.duration}</span>
              <span className="difficulty">{course.difficulty}</span>
            </div>

            <div className="course-instructor">
              {instructor && (
                <>
                  <span>By:</span>
                  <Link to={`/instructor/${instructor.id}`} className="instructor-link">
                    {instructor.name}
                  </Link>
                </>
              )}
            </div>

            {enrollError && <div className="error-message">{enrollError}</div>}

            <div className="course-actions">
              <button
                className={`btn btn-secondary ${isInterested(course.id) ? 'active' : ''}`}
                onClick={() => handleToggleInterested(course.id)}
              >
                {isInterested(course.id) ? '❤️' : '🤍'} Interested
              </button>
              <button
                className={`btn btn-primary ${isEnrolled(course.id) ? 'active' : ''}`}
                onClick={() => handleEnroll(course.id)}
                disabled={enrollLoading}
              >
                {enrollLoading
                  ? '⏳ Enrolling...'
                  : isEnrolled(course.id)
                    ? '✓ Enrolled'
                    : '+ Enroll Now'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="course-content-container">
        {/* Main Content */}
        <main className="course-content-main">
          {/* What You'll Learn */}
          <section className="content-section">
            <h2>What You'll Learn</h2>
            <ul className="learning-list">
              {course.learnings.map((learning, index) => (
                <li key={index}>
                  <span className="check-mark">✓</span>
                  {learning}
                </li>
              ))}
            </ul>
          </section>

          {/* Key Points */}
          <section className="content-section">
            <h2>Course Highlights</h2>
            <div className="key-points">
              {course.keyPoints.map((point, index) => (
                <div key={index} className="key-point">
                  <span className="point-icon">📌</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Prerequisites */}
          <section className="content-section">
            <h2>Prerequisites</h2>
            <ul className="prerequisites-list">
              {course.prerequisites.map((prereq, index) => (
                <li key={index}>{prereq}</li>
              ))}
            </ul>
          </section>

          {/* Course Modules */}
          {course.modules && course.modules.length > 0 && (
            <section className="content-section">
              <h2>Course Content</h2>
              <div className="modules-list">
                {course.modules.map((module) => (
                  <div key={module.id} className="module">
                    <button
                      className="module-header"
                      onClick={() =>
                        setExpandedModule(
                          expandedModule === module.id ? null : module.id
                        )
                      }
                    >
                      <span className="module-icon">
                        {expandedModule === module.id ? '▼' : '▶'}
                      </span>
                      <span className="module-title">{module.title}</span>
                      <span className="lesson-count">
                        {module.lessons.length} lessons
                      </span>
                    </button>
                    {expandedModule === module.id && (
                      <div className="module-lessons">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div key={lesson.id} className="lesson">
                            <div className="lesson-number">{lessonIndex + 1}</div>
                            <div className="lesson-info">
                              <div className="lesson-title">{lesson.title}</div>
                              <div className="lesson-description">
                                {lesson.description}
                              </div>
                              {lesson.resources && lesson.resources.length > 0 && (
                                <div className="lesson-resources">
                                  <strong>Resources:</strong>{' '}
                                  {lesson.resources.join(', ')}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Instructor Section */}
          {instructor && (
            <section className="content-section instructor-section">
              <h2>About the Instructor</h2>
              <InstructorCard instructor={instructor} courseCount={instructorCourses.length} />
            </section>
          )}

          {/* Similar Courses */}
          {similarCourses.length > 0 && (
            <section className="content-section">
              <h2>Similar Courses</h2>
              <div className="related-courses">
                {similarCourses.map((relatedCourse) => (
                  <CourseCard
                    key={relatedCourse.id}
                    course={relatedCourse}
                    isInterested={isInterested}
                    isEnrolled={isEnrolled}
                    onToggleInterested={handleToggleInterested}
                    onToggleEnrolled={handleEnroll}
                  />
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Sidebar */}
        <aside className="course-sidebar">
          <div className="sidebar-card">
            <h3>Quick Info</h3>
            <div className="quick-info">
              <div className="info-item">
                <span className="label">Duration:</span>
                <span className="value">{course.duration}</span>
              </div>
              <div className="info-item">
                <span className="label">Level:</span>
                <span className="value">{course.difficulty}</span>
              </div>
              <div className="info-item">
                <span className="label">Category:</span>
                <span className="value">{course.category}</span>
              </div>
              <div className="info-item">
                <span className="label">Rating:</span>
                <span className="value">⭐ {course.rating}</span>
              </div>
            </div>
          </div>

          {instructor && instructorCourses.length > 0 && (
            <div className="sidebar-card">
              <h3>More by {instructor.name}</h3>
              <div className="instructor-courses">
                {instructorCourses
                  .filter((c) => c.id !== course.id)
                  .slice(0, 3)
                  .map((c) => (
                    <Link key={c.id} to={`/course/${c.id}`} className="course-link">
                      {c.title}
                    </Link>
                  ))}
              </div>
            </div>
          )}

          {recommendations.length > 0 && (
            <div className="sidebar-card">
              <h3>For You</h3>
              <p className="sidebar-text">Based on your interests</p>
              <div className="recommended-courses-sidebar">
                {recommendations.slice(0, 2).map((rec) => (
                  <Link key={rec.id} to={`/course/${rec.id}`} className="course-link">
                    {rec.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default CourseDetails;
