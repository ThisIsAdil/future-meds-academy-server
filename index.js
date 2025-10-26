import { app } from './app.js';
import connectDB from './config/database.js';

import teamRoutes from './routes/team.js';
import dashboardRoutes from './routes/dashboard.js';
import coursesRoutes from './routes/courses.js';


connectDB(process.env.MONGO_URI);

app.set('trust proxy', true);
app.get('/', (req, res) => {
    res.json({ success: true });
});

app.use('/api/team', teamRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/courses', coursesRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});