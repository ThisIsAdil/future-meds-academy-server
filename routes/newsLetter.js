import express from 'express';
import Newsletter from '../models/newsletter.js';
import { authenticateAdmin } from '../utils/auth.js';

const router = express.Router();

// api/newsletter/
router.get('/', authenticateAdmin, async (req, res) => {
    try {
        const newsletters = await Newsletter.find();

        res.status(200).json({ success: true, data: newsletters })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
})

router.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    try {
        const existingSubscriber = await Newsletter.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ success: false, message: 'Email is already subscribed' });
        }

        const newSubscriber = await Newsletter.create({ email });

        res.status(201).json({ success: true, message: 'Subscribed successfully' });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

export default router;