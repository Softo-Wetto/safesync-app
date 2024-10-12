const express = require('express');
const activityDetailsController = require('../controllers/activityDetailsController');
const upload = require('../config/multer');
const router = express.Router();

// Route to get activity details by activity ID
router.get('/:activityId/details', activityDetailsController.getActivityDetailsById);

// Route to add or update activity details
router.post('/:activityId/details', upload.array('images', 10), activityDetailsController.addOrUpdateActivityDetails);

//Route to delete activity image
router.delete('/activities/:activityId/details/:imageName/delete', activityDetailsController.deleteActivityImage);

module.exports = router;