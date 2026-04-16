import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API base URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Initialize axios with token
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.baseURL = API_URL;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          setAuthToken(token);
          const response = await axios.get(`${API_URL}/api/auth/me`);
          if (response.data.success) {
            setUser(response.data.user);
            setIsAuthenticated(true);
          }
        } catch (err) {
          console.log('Auth check failed:', err.message);
          setAuthToken(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const signup = async (fullName, email, password) => {
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/api/auth/signup`, {
        fullName,
        email,
        password,
      });

      if (response.data.success) {
        const token = response.data.token;
        setAuthToken(token);
        setUser(response.data.user);
        setIsAuthenticated(true);
        return response.data;
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      if (response.data.success) {
        const token = response.data.token;
        setAuthToken(token);
        setUser(response.data.user);
        setIsAuthenticated(true);
        return response.data;
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('userCoursePreferences');
  };

  const enrollCourse = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/api/courses/${courseId}/enroll`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setUser(response.data.user);
        return response.data;
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    }
  };

  const toggleInterested = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/api/courses/${courseId}/interested`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setUser(response.data.user);
        return response.data;
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    signup,
    login,
    logout,
    enrollCourse,
    toggleInterested,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
