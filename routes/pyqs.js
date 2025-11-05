import express from 'express';

import { fetchPyqs, addPyq, updatePyq, deletePyq } from '../controllers/pyqs.js';
import { authenticateAdmin } from '../utils/auth.js';

const router = express.Router();

// Routes for PYQs
router.get('/', fetchPyqs);
router.post('/create', authenticateAdmin, addPyq);
router.put('/update/:id', authenticateAdmin, updatePyq);
router.delete('/delete/:id', authenticateAdmin, deletePyq);


export default router;