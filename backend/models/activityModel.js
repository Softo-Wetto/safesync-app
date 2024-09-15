const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Activity = sequelize.define('Activity', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    outcome: {
        type: DataTypes.ENUM('C', 'NC', 'N/A', 'U/V'),
        allowNull: false,
    },
    activityType: {  // Add this new field for activity type
        type: DataTypes.ENUM('Inspection', 'Training Induction', 'Testing and Debugging', 'Other'),
        allowNull: false,
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Projects', key: 'id' },
    },
}, { timestamps: true });

// Association with Project model
Activity.associate = (models) => {
    Activity.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
};

module.exports = Activity;
