import express from 'express';
import Consultation from '../models/consultation.js';
import { authenticateAdmin } from '../utils/auth.js';

const router = express.Router();

// api/consultation/

router.post('/create', async (req, res) => {
    const formData = req.body;


    try {
        // Create a new consultation
        const newConsultation = await Consultation.create(formData);
        res.status(201).json({ success: true, data: newConsultation });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating consultation', error: error.message });
    }
});

router.get('/', authenticateAdmin, async (req, res) => {
    try {
        const consultations = await Consultation.find();
        res.status(200).json({ success: true, data: consultations });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching consultations', error: error.message });
    }
});

router.put('/mark-as-completed/:id', authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        const updatedConsultation = await Consultation.findByIdAndUpdate(id, { isCompleted: true }, { new: true });
        if (!updatedConsultation) {
            return res.status(404).json({ success: false, message: 'Consultation not found' });
        }
        res.status(200).json({ success: true, data: updatedConsultation });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error marking consultation as completed', error: error.message });
    }
});

export default router;