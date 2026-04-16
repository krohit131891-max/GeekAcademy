import { memo } from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';

const CourseCard = memo(function CourseCard({
  course,
  isInterested,
  isEnrolled,
  onToggleInterested,
  onToggleEnrolled,
  showActions = true,
}) {
  return (
    <div className="course-card">
      {/* Banner Image */}
      <div className="course-banner">
        <div className="banner-icon">{course.image}</div>
        <div className="rating-badge">{course.rating}</div>
      </div>

      {/* Card Content */}
      <div className="course-card-content">
        {/* Course Title & Category */}
        <div className="course-header">
          <Link to={`/course/${course.id}`} className="course-title">
            {course.title}
          </Link>
          <span className="difficulty-badge">{course.difficulty}</span>
        </div>

        {/* Description */}
        <p className="course-description">{course.description}</p>

        {/* Metadata */}
        <div className="course-metadata">
          <span className="metadata-item">
            <span className="metadata-icon">⏱️</span>
            {course.duration}
          </span>
          <span className="metadata-item">
            <span className="metadata-icon">👥</span>
            {(course.reviews / 1000).toFixed(0)}k interested
          </span>
          <span className="metadata-item">
            <span className="metadata-icon">📚</span>
            {course.category}
          </span>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="course-actions">
            <button
              className={`btn btn-secondary ${isInterested(course.id) ? 'active' : ''}`}
              onClick={() => onToggleInterested(course.id)}
              title={isInterested(course.id) ? 'Remove from interested' : 'Mark as interested'}
            >
              {isInterested(course.id) ? '❤️' : '🤍'} Interested
            </button>
            <Link to={`/course/${course.id}`} className="btn btn-primary">
              {isEnrolled(course.id) ? '✓ Enrolled' : 'Explore Now'}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
});

export default CourseCard;
