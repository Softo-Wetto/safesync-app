const ActivityDetails = require('../models/activityDetailsModel');
const fs = require('fs');

exports.getActivityDetails = async (req, res) => {
    try {
        const { activityID } = req.params;
        const details = await ActivityDetails.findOne({ where: { activityId: activityID } });

        if (!details) {
            return res.status(404).json({ error: 'Activity details not found' });
        }

        res.json(details);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get Activity Details by Activity ID
exports.getActivityDetailsById = async (req, res) => {
    const { activityId } = req.params;

    try {
        const details = await ActivityDetails.findOne({
            where: { activityId },
        });

        if (!details) {
            return res.status(404).json({ error: 'Activity details not found' });
        }

        res.status(200).json(details);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Route to handle uploading images
exports.addOrUpdateActivityDetails = async (req, res) => {
    const { activityId } = req.params;
    const { formData } = req.body;
    const images = req.files ? req.files.map(file => file.filename) : [];

    try {
        let details = await ActivityDetails.findOne({ where: { activityId } });

        if (details) {
            // If formData is already an object, no need to parse it
            let currentFormData = typeof details.formData === 'string'
                ? JSON.parse(details.formData)
                : details.formData;

            // Ensure details.images is initialized as an array
            details.images = details.images || [];

            // Update existing details
            details.formData = { ...currentFormData, ...formData };
            details.images = details.images.concat(images);  // Append new images
            await details.save();
        } else {
            // Create a new details entry
            details = await ActivityDetails.create({
                activityId,
                formData,
                images,
            });
        }

        res.status(200).json(details);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Add this route to handle image deletions
exports.deleteActivityImage = async (req, res) => {
    const { activityId, imageName } = req.params;

    try {
        let details = await ActivityDetails.findOne({ where: { activityId } });

        if (!details) {
            return res.status(404).json({ error: 'Activity details not found' });
        }

        // Remove image from details
        details.images = details.images.filter(image => image !== imageName);
        await details.save();

        // Optionally, remove the file from the server
        const fs = require('fs');
        fs.unlinkSync(`uploads/${imageName}`);

        res.status(200).json({ message: 'Image removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
