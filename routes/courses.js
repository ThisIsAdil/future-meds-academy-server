import express from 'express';
import { createCourse, editCourse, getCourses } from '../controllers/courses.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

// /courses

router.get('/', getCourses);
router.post('/create', upload.single('thumbnail'), createCourse);
router.put('/edit/:id', upload.single('thumbnail'), editCourse);

export default router;