import express from 'express';
import { getTeamMembers, createTeamMember, editTeamMember } from '../controllers/team.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

// /api/team/
router.get('/', getTeamMembers);
router.post('/create', upload.single('profilePicture'), createTeamMember)
router.put('/edit/:id', upload.single('profilePicture'), editTeamMember);


export default router;