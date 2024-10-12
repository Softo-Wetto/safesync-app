const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const activityRoutes = require('./routes/activityRoutes');
const activityDetailsRoutes = require('./routes/activityDetailsRoute');
const path = require('path');
const Project = require('./models/projectModel');
const Activity = require('./models/activityModel');
dotenv.config();

// Import your connectDB function from db.js if not already
const { connectDB } = require('./config/db');

// Set up associations
Project.associate({ Activity });
Activity.associate({ Project });

// Connect to the database
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

app.use('/api', activityRoutes);
app.use('/api', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/projects', activityRoutes);
app.use('/api/projects/:projectId/activities', activityRoutes);

app.use('/api', activityDetailsRoutes);
app.use('/api/activities', activityDetailsRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
