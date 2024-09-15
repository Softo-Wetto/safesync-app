const express = require('express');
const router = express.Router();
const { getActivities, addActivity, updateActivity, removeActivity } = require('../controllers/activityController');

// Get all activities for a project
router.get('/:projectID/activities', getActivities);

// Add a new activity to a project
router.post('/:projectID/activities/add', addActivity);

// Update an activity
router.put('/:projectID/activities/:activityId/update', updateActivity);

// Remove an activity
router.delete('/:projectID/activities/:activityId/remove', removeActivity);

module.exports = router;
