import express from 'express';
import { createBlog, deleteBlog, editBlog, getBlog, getBlogs } from '../controllers/blog.js';
import { upload } from '../middlewares/multer.js';
import { authenticateAdmin } from '../utils/auth.js';

const router = express.Router();

// Sample route for blog
router.get('/', getBlogs);
router.get('/:id', getBlog);
router.post('/create', authenticateAdmin, upload.single('thumbnail'), createBlog);
router.put('/update/:id', authenticateAdmin, upload.single('thumbnail'), editBlog);
router.delete('/delete/:id', authenticateAdmin, deleteBlog);

export default router;