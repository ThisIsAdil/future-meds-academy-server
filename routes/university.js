import express from 'express';
import { createUniversity, deleteUniversity, getAllUniversities, updateUniversity, updateYearlyData } from '../controllers/university.js';
import { upload } from '../middlewares/multer.js';
import { authenticateAdmin } from '../utils/auth.js';

const router = express.Router();

// api/university/

router.get('/', getAllUniversities);
router.post('/create', authenticateAdmin,
    upload.fields([
        { name: 'logo', maxCount: 1 },
        { name: 'campusImage', maxCount: 1 }
    ]),
    createUniversity);
router.put('/update/:id', authenticateAdmin, upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'campusImage', maxCount: 1 }
]), updateUniversity);
router.delete('/delete/:id', authenticateAdmin, deleteUniversity);
router.patch('/update-yearly-data/:id', authenticateAdmin, updateYearlyData);

export default router;