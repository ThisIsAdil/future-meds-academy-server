import { app } from './app.js';
import connectDB from './config/database.js';

import teamRoutes from './routes/team.js';
import dashboardRoutes from './routes/dashboard.js';
import coursesRoutes from './routes/courses.js';
import universityRoutes from './routes/university.js';
import abroadUniversityRoutes from './routes/abroadUniversity.js';
import consultationRoutes from './routes/consultation.js';
import testimonialRoutes from './routes/testimonials.js';
import newsLetterRoutes from './routes/newsLetter.js';
import topPerformerRoutes from './routes/topPerformer.js';
import blogsRoutes from './routes/blog.js';
import pyqsRoutes from './routes/pyqs.js';
import adminAuthRoutes from './routes/adminAuth.js';

connectDB(process.env.MONGO_URI);

app.set('trust proxy', true);
app.get('/', (req, res) => {
    res.json({ success: true });
});

app.use('/api/team', teamRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/universities', universityRoutes);
app.use('/api/abroad-universities', abroadUniversityRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/newsletter', newsLetterRoutes);
app.use('/api/top-performers', topPerformerRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/pyqs', pyqsRoutes);
app.use('/api/admin-4fa2c9b2c1e5', adminAuthRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});