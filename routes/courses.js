import express from 'express';
import { createCourse, deleteCourse, editCourse, getCourse, getCourses } from '../controllers/courses.js';
import { upload } from '../middlewares/multer.js';
import { authenticateAdmin } from '../utils/auth.js';

const router = express.Router();

// /courses

router.get('/', getCourses);
router.get("/:id", getCourse);
router.post('/create', authenticateAdmin, upload.single('thumbnail'), createCourse);
router.put('/edit/:id', authenticateAdmin, upload.single('thumbnail'), editCourse);
router.delete('/delete/:id', authenticateAdmin, deleteCourse);

export default router;