const express = require('express');
const router = express.Router();
const {
    getAllActivities,
    getActivities,
    getActivityById,
    addActivity,
    updateActivity,
    removeActivity,
    assignUserToActivity,
    getActivityUsers,
} = require('../controllers/activityController');

// General route to get all activities
router.get('/activities', getAllActivities);

// View activity from calendar
router.get('/activities/:activityID', getActivityById);

// Specific route to get all activities for a project
router.get('/projects/:projectID/activities', getActivities);

// Route to get an activity by ID for a specific project
router.get('/projects/:projectID/activities/:activityID', getActivityById);

// Add a new activity to a project
router.post('/projects/:projectID/activities/add', addActivity);

// Update an activity
router.put('/projects/:projectID/activities/:activityId/update', updateActivity);

// Remove an activity
router.delete('/projects/:projectID/activities/:activityId/remove', removeActivity);

// Assign a user to an activity
router.post('/projects/:projectID/activities/:activityId/users/add', assignUserToActivity);

// Get users assigned to an activity
router.get('/projects/:projectID/activities/:activityId/users', getActivityUsers);

module.exports = router;
