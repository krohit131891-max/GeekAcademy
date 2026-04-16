import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import InstructorCard from '../components/InstructorCard';
import { instructors, getCoursesByInstructor } from '../data/coursesData';
import './Instructors.css';

function Instructors() {
  // Sort instructors by follower count (descending)
  const sortedInstructors = useMemo(() => {
    return [...instructors].sort((a, b) => b.followers - a.followers);
  }, []);

  return (
    <div className="instructors-page">
      {/* Header Section */}
      <section className="instructors-header">
        <h1>Expert Instructors</h1>
        <p>Learn from industry professionals with years of experience</p>
      </section>

      {/* Stats Section */}
      <section className="instructors-stats">
        <div className="stat-box">
          <div className="stat-value">{instructors.length}</div>
          <div className="stat-label">Expert Instructors</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">50K+</div>
          <div className="stat-label">Active Students</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">4.8★</div>
          <div className="stat-label">Average Rating</div>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="instructors-container">
        <div className="instructors-grid">
          {sortedInstructors.map((instructor) => {
            const courseCount = getCoursesByInstructor(instructor.id).length;
            return (
              <div key={instructor.id} className="instructor-grid-item">
                <InstructorCard instructor={instructor} courseCount={courseCount} />
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="instructors-cta">
        <h2>Ready to Learn?</h2>
        <p>Explore our courses and start your learning journey today</p>
        <Link to="/courses" className="cta-btn">
          Browse All Courses
        </Link>
      </section>
    </div>
  );
}

export default Instructors;
