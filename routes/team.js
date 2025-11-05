import express from 'express';
import { getTeamMembers, createTeamMember, editTeamMember, deleteTeamMember, getTeamMember } from '../controllers/team.js';
import { upload } from '../middlewares/multer.js';
import { authenticateAdmin } from '../utils/auth.js';

const router = express.Router();

// /api/team/
router.get('/', getTeamMembers);
router.post('/create', authenticateAdmin, upload.single('profilePicture'), createTeamMember)
router.put('/edit/:id', authenticateAdmin, upload.single('profilePicture'), editTeamMember);
router.delete('/:id', authenticateAdmin, deleteTeamMember)
router.get('/:id', getTeamMember);


export default router;