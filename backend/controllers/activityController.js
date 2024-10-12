const Activity = require('../models/activityModel');
const ActivityDetails = require('../models/activityDetailsModel');
const User = require('../models/userModel');

// Get activities for a project
exports.getActivities = async (req, res) => {
    try {
        const activities = await Activity.findAll({
            where: { projectId: req.params.projectID },
            include: [{
                model: User,
                attributes: ['id', 'fullName'],  // Include user details
                through: { attributes: [] }  // Exclude junction table attributes
            }],
            attributes: ['id', 'name', 'description', 'outcome', 'activityType', 'dueDate', 'createdAt', 'updatedAt'], // Include timestamps
        });
        res.json(activities);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getActivityById = async (req, res) => {
    const { projectID, activityID } = req.params;

    try {
        const activity = await Activity.findOne({
            where: {
                id: activityID,
                projectId: projectID,
            },
            include: [User]
        });

        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        res.json(activity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Add activity to project
exports.addActivity = async (req, res) => {
    const { name, description, outcome, activityType, assignedUsers, dueDate } = req.body;

    try {
        // Create the new activity
        const newActivity = await Activity.create({
            name,
            description,
            outcome,
            activityType,
            dueDate,
            projectId: req.params.projectID,
        });

        // Assign users to the activity (if any)
        if (assignedUsers && assignedUsers.length > 0) {
            const users = await User.findAll({ where: { id: assignedUsers } });
            await newActivity.addUsers(users);  // Use the Sequelize method to associate users
        }

        res.status(201).json(newActivity);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Remove an activity from a project
exports.removeActivity = async (req, res) => {
    try {
        const activity = await Activity.findByPk(req.params.activityId);

        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        // Find and delete associated ActivityDetails
        await ActivityDetails.destroy({ where: { activityId: activity.id } });
        // Now delete the activity itself
        await activity.destroy();
        res.json({ message: 'Activity and its details removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during activity deletion' });
    }
};

// Update an activity
exports.updateActivity = async (req, res) => {
    const { name, description, outcome, activityType, assignedUsers, dueDate } = req.body;
    try {
        const activity = await Activity.findByPk(req.params.activityId);

        if (!activity) return res.status(404).json({ error: 'Activity not found' });

        // Update activity details
        activity.name = name || activity.name;
        activity.description = description || activity.description;
        activity.outcome = outcome || activity.outcome;
        activity.activityType = activityType || activity.activityType;
        activity.dueDate = dueDate || null;

        await activity.save();

        // Update assigned users if provided
        if (assignedUsers && assignedUsers.length > 0) {
            const users = await User.findAll({ where: { id: assignedUsers } });
            await activity.setUsers(users);  // Use setUsers to overwrite previous assignments
        }

        res.json(activity);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Assign user to an activity
exports.assignUserToActivity = async (req, res) => {
    const { activityId } = req.params;
    const { userId } = req.body;

    try {
        const activity = await Activity.findByPk(activityId);
        const user = await User.findByPk(userId);

        if (!activity || !user) {
            return res.status(404).json({ error: 'Activity or User not found' });
        }

        await activity.addUser(user);
        res.status(200).json({ message: 'User assigned to activity successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get users assigned to an activity
exports.getActivityUsers = async (req, res) => {
    const { activityId } = req.params;

    try {
        const activity = await Activity.findByPk(activityId, {
            include: [{
                model: User,
                attributes: ['id', 'fullName'], // Include only necessary fields
                through: { attributes: [] },    // Exclude junction table data
            }],
        });

        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        res.status(200).json(activity.Users);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all activities (simplified for Calendar)
exports.getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'fullName'],
                    through: { attributes: [] }
                }
            ],
            attributes: [
                'id', 'name', 'description', 'outcome', 
                'activityType', 'dueDate', 'createdAt', 
                'updatedAt', 'projectId' 
            ],
        });
        res.json(activities);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
