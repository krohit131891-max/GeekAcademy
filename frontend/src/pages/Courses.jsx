import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { courses } from '../data/coursesData';
import { useUserPreferences } from '../hooks/useUserPreferences';
import './Courses.css';

const CATEGORIES = ['All', 'Web Development', 'Mobile', 'Data Science', 'AI/ML', 'Cloud'];
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];
const SORT_OPTIONS = [
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'rating-asc', label: 'Lowest Rated' },
  { value: 'duration-asc', label: 'Shortest Duration' },
  { value: 'duration-desc', label: 'Longest Duration' },
  { value: 'newest', label: 'Newest First' },
];

function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toggleInterested, toggleEnrolled, isInterested, isEnrolled, recommendations } =
    useUserPreferences();

  const [selectedCategory, setSelectedCategory] = useState(() => {
    return searchParams.get('category') || 'All';
  });
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating-desc');

  useEffect(() => {
    if (selectedCategory !== 'All') {
      setSearchParams({ category: selectedCategory });
    } else {
      setSearchParams({});
    }
  }, [selectedCategory, setSearchParams]);

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter((course) => {
      const categoryMatch = selectedCategory === 'All' || course.category === selectedCategory;
      const difficultyMatch =
        selectedDifficulties.length === 0 || selectedDifficulties.includes(course.difficulty);
      const searchMatch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());

      return categoryMatch && difficultyMatch && searchMatch;
    });

    // Sort
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating-desc':
          return b.rating - a.rating;
        case 'rating-asc':
          return a.rating - b.rating;
        case 'duration-asc': {
          const aDuration = parseInt(a.duration);
          const bDuration = parseInt(b.duration);
          return aDuration - bDuration;
        }
        case 'duration-desc': {
          const aDuration = parseInt(a.duration);
          const bDuration = parseInt(b.duration);
          return bDuration - aDuration;
        }
        case 'newest':
          return b.id - a.id;
        default:
          return 0;
      }
    });
  }, [selectedCategory, selectedDifficulties, searchTerm, sortBy]);

  const toggleDifficulty = useCallback((difficulty) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty) ? prev.filter((d) => d !== difficulty) : [...prev, difficulty]
    );
  }, []);

  const handleToggleInterested = useCallback(
    (courseId) => toggleInterested(courseId),
    [toggleInterested]
  );

  const handleToggleEnrolled = useCallback(
    (courseId) => toggleEnrolled(courseId),
    [toggleEnrolled]
  );

  const resetFilters = useCallback(() => {
    setSelectedCategory('All');
    setSelectedDifficulties([]);
    setSearchTerm('');
    setSortBy('rating-desc');
  }, []);

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h1>Explore Courses</h1>
        <p>Find the perfect course to advance your skills</p>
      </div>

      <div className="courses-container">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <h3 className="filter-title">Category</h3>
            <div className="category-options">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="filter-group">
            <h3 className="filter-title">Difficulty Level</h3>
            <div className="difficulty-options">
              {DIFFICULTIES.map((difficulty) => (
                <label key={difficulty} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedDifficulties.includes(difficulty)}
                    onChange={() => toggleDifficulty(difficulty)}
                  />
                  <span>{difficulty}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sort Option */}
          <div className="filter-group">
            <h3 className="filter-title">Sort By</h3>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button onClick={resetFilters} className="reset-btn">
            Reset Filters
          </button>
        </aside>

        {/* Main Content */}
        <main className="courses-main">
          {/* Results Info */}
          <div className="results-info">
            <p>
              Showing <strong>{filteredAndSortedCourses.length}</strong> of{' '}
              <strong>{courses.length}</strong> courses
            </p>
          </div>

          {/* Courses Grid */}
          {filteredAndSortedCourses.length > 0 ? (
            <div className="courses-grid">
              {filteredAndSortedCourses.map((course) => (
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
              <div className="empty-icon">🔍</div>
              <h2>No courses found</h2>
              <p>Try adjusting your filters or search term</p>
              <button onClick={resetFilters} className="reset-btn-large">
                Clear All Filters
              </button>
            </div>
          )}

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <section className="recommendations-section">
              <h2>Recommended Courses</h2>
              <p>Based on your interests and enrollments</p>
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
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default Courses;
