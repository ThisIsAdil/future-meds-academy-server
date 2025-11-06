import jwt from 'jsonwebtoken';

export const authenticateAdmin = (req, res, next) => {
    const token = req.cookies.admin_token;

    if (!token) {
        return res.status(401).json({ message: 'Forbidden' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Forbidden' });
    }
};