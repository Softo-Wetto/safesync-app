const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./config/db'); // Import sequelize from the config
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const activityRoutes = require('./routes/activityRoutes');

dotenv.config();

// Connect to the database
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');
        await sequelize.sync();
        console.log('Models synchronized...');
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1); // Exit process with failure
    }
};

connectDB();

const app = express();

app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.use('/api/projects', projectRoutes);
app.use('/api/projects', activityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
