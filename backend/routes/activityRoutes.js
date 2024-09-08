const express = require('express');
const router = express.Router();
const {
    getActivities,
    addActivity,
    removeActivity,
    updateActivity,
} = require('../controllers/activityController');

router.get('/:projectID/activities', getActivities);
router.post('/:projectID/activities/add', addActivity);
router.put('/:projectID/activities/:activityId/update', updateActivity);
router.delete('/:projectID/activities/:activityId/remove', removeActivity);

module.exports = router;