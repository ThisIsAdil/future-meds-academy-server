import express from 'express';
import { createTestimonial, deleteTestimonial, getTestimonials, updateTestimonial } from '../controllers/testimonials.js';
import { authenticateAdmin } from '../utils/auth.js';

const router = express.Router();

// api/testimonials/

router.post('/create', authenticateAdmin, createTestimonial);
router.get('/', getTestimonials);
router.delete('/:id', authenticateAdmin, deleteTestimonial);
router.put('/:id', authenticateAdmin, updateTestimonial);

export default router;