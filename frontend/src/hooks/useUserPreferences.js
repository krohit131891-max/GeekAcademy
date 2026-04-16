import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { courses } from '../data/coursesData';

const STORAGE_KEY = 'userCoursePreferences';

const loadPreferences = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { interested: [], enrolled: [] };
  } catch {
    return { interested: [], enrolled: [] };
  }
};

export const useUserPreferences = () => {
  const { user, isAuthenticated } = useAuth();
  const [preferences, setPreferences] = useState(loadPreferences);

  // Sync preferences with authenticated user
  useEffect(() => {
    if (isAuthenticated && user) {
      // Use backend data as source of truth
      setPreferences({
        interested: user.interested || [],
        enrolled: user.enrolledCourses || [],
      });
    } else {
      // Clear preferences if not authenticated
      setPreferences({ interested: [], enrolled: [] });
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user, isAuthenticated]);

  // Save preferences to localStorage only for non-authenticated users
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    }
  }, [preferences, isAuthenticated]);

  const toggleInterested = useCallback((courseId) => {
    setPreferences((prev) => ({
      ...prev,
      interested: prev.interested.includes(courseId)
        ? prev.interested.filter((id) => id !== courseId)
        : [...prev.interested, courseId],
    }));
  }, []);

  const toggleEnrolled = useCallback((courseId) => {
    setPreferences((prev) => ({
      ...prev,
      enrolled: prev.enrolled.includes(courseId)
        ? prev.enrolled.filter((id) => id !== courseId)
        : [...prev.enrolled, courseId],
    }));
  }, []);

  const isInterested = useCallback((courseId) => preferences.interested.includes(courseId), [
    preferences.interested,
  ]);

  const isEnrolled = useCallback((courseId) => preferences.enrolled.includes(courseId), [
    preferences.enrolled,
  ]);

  // Get recommended courses based on user preferences
  const getRecommendations = useCallback(() => {
    if (preferences.interested.length === 0 && preferences.enrolled.length === 0) {
      return [];
    }

    const userCourseIds = [...preferences.interested, ...preferences.enrolled];
    const userCategories = new Map();

    // Build a map of categories with frequency
    userCourseIds.forEach((courseId) => {
      const course = courses.find((c) => c.id === courseId);
      if (course) {
        userCategories.set(
          course.category,
          (userCategories.get(course.category) || 0) + 1
        );
      }
    });

    // Get similar difficulty levels
    const userDifficulties = new Map();
    userCourseIds.forEach((courseId) => {
      const course = courses.find((c) => c.id === courseId);
      if (course) {
        userDifficulties.set(
          course.difficulty,
          (userDifficulties.get(course.difficulty) || 0) + 1
        );
      }
    });

    // Filter recommendations: courses not already interested/enrolled
    const recommendations = courses
      .filter(
        (course) =>
          !userCourseIds.includes(course.id)
      )
      .map((course) => {
        let score = 0;

        // Score based on category match (higher weight)
        if (userCategories.has(course.category)) {
          score += userCategories.get(course.category) * 3;
        }

        // Score based on difficulty match
        if (userDifficulties.has(course.difficulty)) {
          score += userDifficulties.get(course.difficulty) * 2;
        }

        // Score based on rating
        score += course.rating;

        return { ...course, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);

    return recommendations;
  }, [preferences.interested, preferences.enrolled]);

  // Memoize recommendations to prevent unnecessary recalculations
  const recommendations = useMemo(() => getRecommendations(), [getRecommendations]);

  return {
    preferences,
    toggleInterested,
    toggleEnrolled,
    isInterested,
    isEnrolled,
    recommendations,
  };
};
