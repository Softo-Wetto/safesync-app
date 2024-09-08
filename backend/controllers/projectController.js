const { Op } = require('sequelize');
const Project = require('../models/projectModel');

// Get all projects
exports.getAllProjects = async (req, res) => {
    const { search } = req.query;
    try {
        console.log('Fetching projects...'); // Log when this route is hit
        const projects = await Project.findAll({
            where: search ? { name: { [Op.like]: `%${search}%` } } : {},
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
        const project = await Project.findByPk(req.params.projectID);
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Create a new project
exports.createProject = async (req, res) => {
    try {
      const { name, description } = req.body;
  
      // Validate the inputs
      if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required' });
      }
  
      const newProject = await Project.create({ name, description });
      res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (err) {
      console.error('Error creating project:', err.message);
      res.status(500).json({ error: 'Failed to create project' });
    }
};

// Update a project
exports.updateProject = async (req, res) => {
    const { name, description } = req.body;
    try {
        const project = await Project.findByPk(req.params.projectID);
        if (!project) return res.status(404).json({ error: 'Project not found' });
        project.name = name || project.name;
        project.description = description || project.description;
        await project.save();
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