import { Link } from 'react-router-dom';
import './InstructorCard.css';

function InstructorCard({ instructor, courseCount = 0 }) {
  return (
    <div className="instructor-card">
      <div className="instructor-avatar">{instructor.avatar}</div>
      <div className="instructor-info">
        <Link to={`/instructor/${instructor.id}`} className="instructor-name">
          {instructor.name}
        </Link>
        <p className="instructor-bio">{instructor.bio}</p>
        <div className="instructor-meta">
          <span className="followers">👥 {instructor.followers.toLocaleString()} followers</span>
          {courseCount > 0 && <span className="courses">{courseCount} courses</span>}
        </div>
        <div className="expertise">
          {instructor.expertise.map((skill) => (
            <span key={skill} className="skill">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InstructorCard;
