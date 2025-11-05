import express from 'express';
import {
    createAbroadUniversity,
    deleteAbroadUniversity,
    getAllAbroadUniversities,
    updateAbroadUniversity
} from '../controllers/abroadUniversity.js';
import { upload } from '../middlewares/multer.js';
import { authenticateAdmin } from '../utils/auth.js';

const router = express.Router();

// api/abroad-university/
router.get('/', getAllAbroadUniversities);

router.post(
    '/create',
    authenticateAdmin,
    upload.fields([
        { name: 'logo', maxCount: 1 },
        { name: 'campusImage', maxCount: 1 }
    ]),
    createAbroadUniversity
);

router.put(
    '/update/:id',
    authenticateAdmin,
    upload.fields([
        { name: 'logo', maxCount: 1 },
        { name: 'campusImage', maxCount: 1 }
    ]),
    updateAbroadUniversity
);

router.delete('/delete/:id', authenticateAdmin, deleteAbroadUniversity);

export default router;