import express from 'express';
import { createTopPerformer, deleteTopPerformer, editTopPerformer, getTopPerformers } from '../controllers/topPerformer.js';
import { upload } from '../middlewares/multer.js';
import { authenticateAdmin } from '../utils/auth.js';

const router = express.Router();

// api/top-performer/

router.get('/', getTopPerformers);
router.post('/create', authenticateAdmin, upload.single('image'), createTopPerformer);
router.put('/update/:id', authenticateAdmin, upload.single('image'), editTopPerformer);
router.delete('/delete/:id', authenticateAdmin, deleteTopPerformer);

export default router;