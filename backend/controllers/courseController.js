import Course from '../models/Course.js';
import User from '../models/User.js';

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findOne({ id: req.params.id });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    res.json({
      success: true,
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const courseId = req.params.id;

    // Find course
    const course = await Course.findOne({ id: courseId });
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Check if already enrolled
    if (user.enrolledCourses.includes(course._id)) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course',
      });
    }

    // Enroll
    user.enrolledCourses.push(course._id);
    await user.save();

    res.json({
      success: true,
      message: 'Enrolled successfully',
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        enrolledCourses: user.enrolledCourses,
        interested: user.interested,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const unenrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const courseId = req.params.id;

    // Find course
    const course = await Course.findOne({ id: courseId });
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Remove from enrolled courses
    user.enrolledCourses = user.enrolledCourses.filter(
      (id) => id.toString() !== course._id.toString()
    );
    await user.save();

    res.json({
      success: true,
      message: 'Unenrolled successfully',
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        enrolledCourses: user.enrolledCourses,
        interested: user.interested,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const toggleInterested = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const courseId = req.params.id;

    // Find course
    const course = await Course.findOne({ id: courseId });
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Toggle interested
    const index = user.interested.findIndex(
      (id) => id.toString() === course._id.toString()
    );

    if (index === -1) {
      user.interested.push(course._id);
    } else {
      user.interested.splice(index, 1);
    }

    await user.save();

    res.json({
      success: true,
      message: 'Interest toggled successfully',
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        enrolledCourses: user.enrolledCourses,
        interested: user.interested,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
