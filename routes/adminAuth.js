import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// POST /admin-4fa2c9b2c1e5/login
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (username !== process.env.ADMIN_USER)
        return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, process.env.ADMIN_PASS_HASH);
    if (!valid)
        return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('admin_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000 // 1h
    });

    res.json({ success: true, message: 'Login successful' });
});

router.get('/verify-token', (req, res) => {
    const token = req.cookies.admin_token;

    if (!token)
        return res.status(401).json({ valid: false, message: 'No token provided' });

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        res.json({ valid: true });
    } catch (err) {
        res.status(401).json({ valid: false, message: 'Invalid token' });
    }
});


export default router;
