const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
} = require('../controllers/projectController');

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // This assumes 'uploads' is in the backend folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});


const upload = multer({ storage });

router.get('/', getAllProjects);
router.get('/:projectID', getProjectById);
router.post('/create', upload.single('file'), createProject); // File upload
router.put('/:projectID/update', upload.single('file'), updateProject); // File upload for updating
router.delete('/:projectID/remove', deleteProject);

module.exports = router;
