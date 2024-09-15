const Activity = require('../models/activityModel');

// Get activities for a project
exports.getActivities = async (req, res) => {
    try {
        const activities = await Activity.findAll({ 
            where: { projectId: req.params.projectID },
            attributes: ['id', 'name', 'description', 'outcome', 'activityType'],  // Ensure activityType is included
        });
        res.json(activities);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Add activity to project
exports.addActivity = async (req, res) => {
    const { name, description, outcome, activityType } = req.body;
    try {
        const newActivity = await Activity.create({
            name,
            description,
            outcome,
            activityType, 
            projectId: req.params.projectID,
        });
        res.status(201).json(newActivity);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
// Remove an activity from a project
exports.removeActivity = async (req, res) => {
    try {
        const activity = await Activity.findByPk(req.params.activityId);
        if (!activity) return res.status(404).json({ error: 'Activity not found' });
        await activity.destroy();
        res.json({ message: 'Activity removed' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update an activity
exports.updateActivity = async (req, res) => {
    const { name, description, outcome, activityType } = req.body;
    try {
        const activity = await Activity.findByPk(req.params.activityId);
        if (!activity) return res.status(404).json({ error: 'Activity not found' });
        
        activity.name = name || activity.name;
        activity.description = description || activity.description;
        activity.outcome = outcome || activity.outcome;
        activity.activityType = activityType || activity.activityType;  // Update activity type
        await activity.save();
        res.json(activity);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};