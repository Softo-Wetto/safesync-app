const express = require('express');
const router = express.Router();
const {
    getAllProjects,
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
} = require('../controllers/projectController');

router.get('/', getAllProjects);
router.get('/projects', getProjects);
router.get('/:projectID', getProjectById);
router.post('/create', createProject);
router.put('/:projectID/update', updateProject); 
router.delete('/:projectID/remove', deleteProject);

module.exports = router;
