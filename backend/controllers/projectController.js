const { Op } = require('sequelize');
const Project = require('../models/projectModel');
const Activity = require('../models/activityModel');
const path = require('path');

// Get all projects
exports.getAllProjects = async (req, res) => {
    const { search } = req.query;
    try {
        console.log('Fetching projects...'); // Log when this route is hit
        const projects = await Project.findAll({
            where: search ? { name: { [Op.like]: `%${search}%` } } : {},
            include: [
                {
                    model: Activity, // Include related activities
                    as: 'activities', // Ensure this alias matches your model association
                    attributes: ['id', 'name', 'description', 'outcome', 'createdAt', 'updatedAt'], // Include timestamps
                },
            ],
            attributes: ['id', 'name', 'description', 'location', 'postcode', 'city', 'createdAt', 'updatedAt'], // Include timestamps
        });
        console.log('Projects fetched:', projects); // Log the fetched projects
        res.json(projects);
    } catch (err) {
        console.error('Error fetching projects:', err);
        res.status(500).json({ error: 'Server error' });
    }
};


// Get project by ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.projectID, {
            include: [
                {
                    model: Activity, // Include related activities
                    as: 'activities', // Ensure this alias matches your model association
                    attributes: ['id', 'name', 'description', 'outcome', 'createdAt', 'updatedAt'], // Include timestamps
                },
            ],
            attributes: ['id', 'name', 'description', 'location', 'postcode', 'city', 'createdAt', 'updatedAt'], // Include timestamps
        });
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};


// Create a new project
exports.createProject = async (req, res) => {
    try {
        const { name, description, location, postcode, city } = req.body;

        // Validate the inputs
        if (!name || !description || !location || !postcode || !city) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Handle file upload
        let filePath = null;
        if (req.file) {
            filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
        }

        const newProject = await Project.create({
            name,
            description,
            location,
            postcode,
            city,
            filePath, // Store the file path if a file is uploaded
        });

        res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (err) {
        console.error('Error creating project:', err.message);
        res.status(500).json({ error: 'Failed to create project' });
    }
};

// Update a project
exports.updateProject = async (req, res) => {
    const { name, description, location, postcode, city } = req.body;
    try {
        const project = await Project.findByPk(req.params.projectID);
        if (!project) return res.status(404).json({ error: 'Project not found' });

        // Update the project fields
        project.name = name || project.name;
        project.description = description || project.description;
        project.location = location || project.location;
        project.postcode = postcode || project.postcode;
        project.city = city || project.city;

        // Handle file upload if present
        if (req.file) {
            const filePath = path.join('uploads', req.file.filename);
            project.filePath = filePath;
        }

        await project.save(); // Save changes to the database
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a project
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.projectID);
        if (!project) return res.status(404).json({ error: 'Project not found' });
        await project.destroy();
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getProjects = async (req, res) => {
    const { search } = req.query; // Get the search query parameter
    try {
        console.log('Fetching projects...'); // Log when this route is hit
        const projects = await Project.findAll({
            where: search ? { name: { [Op.like]: `%${search}%` } } : {},
            include: [
                {
                    model: Activity, // Include related activities
                    as: 'activities', // Ensure this alias matches your model association
                    attributes: ['id', 'name', 'description', 'outcome', 'createdAt', 'updatedAt'], // Include timestamps
                },
            ],
            attributes: ['id', 'name', 'description', 'location', 'postcode', 'city', 'createdAt', 'updatedAt'], // Include timestamps
        });
        console.log('Projects fetched:', projects); // Log the fetched projects
        res.json(projects);
    } catch (err) {
        console.error('Error fetching projects:', err);
        res.status(500).json({ error: 'Server error' });
    }
};