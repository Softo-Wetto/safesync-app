const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const activityRoutes = require('./routes/activityRoutes');
const path = require('path');
const Project = require('./models/projectModel');
const Activity = require('./models/activityModel');
dotenv.config();

// Connect to the database
const connectDB = async () => {
    try {
        await sequelize.authenticate(); // First authenticate the connection
        console.log('Database connected...');
        
        // Sync the models, including altering tables to match the models
        await sequelize.sync({ alter: true }); // This will add any missing fields or modify existing ones
        console.log('Models synchronized...');
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1); // Exit process with failure if there is a problem
    }
};

Project.associate({ Activity });
Activity.associate({ Project });


sequelize.sync({ alter: true }).then(() => {
    console.log('Database synchronized');
}).catch((error) => {
    console.error('Error syncing the database:', error);
});



connectDB();

const app = express();

app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/projects', activityRoutes);
app.use('/api/projects/:projectId/activities', activityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
