import express from 'express';
import {
  getCourses,
  getCourseById,
  enrollCourse,
  unenrollCourse,
  toggleInterested,
} from '../controllers/courseController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/:id/enroll', auth, enrollCourse);
router.post('/:id/unenroll', auth, unenrollCourse);
router.post('/:id/interested', auth, toggleInterested);

export default router;
