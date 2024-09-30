const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./userModel');  // Import User model
const Project = require('./projectModel');  // Import Project model

const Activity = sequelize.define('Activity', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    outcome: {
        type: DataTypes.ENUM('C', 'NC', 'PC', 'NS'),
        allowNull: false,
    },
    activityType: {
        type: DataTypes.ENUM('Other', 'Building Inspection', 'Construction Inspection', 'Training Induction', 'Testing and Debugging'),
        allowNull: false,
    },
    dueDate: {
        type: DataTypes.DATEONLY,  // Store date only without time
        allowNull: true,           // This is optional
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Projects', key: 'id' },
    },
}, { timestamps: true });

// Associations
Activity.associate = () => {
    // Many-to-many relationship between Activity and User through ActivityUsers join table
    Activity.belongsToMany(User, { through: 'ActivityUsers', foreignKey: 'activityId', otherKey: 'userId' });
    User.belongsToMany(Activity, { through: 'ActivityUsers', foreignKey: 'userId', otherKey: 'activityId' });

    // One-to-many relationship between Activity and Project
    Activity.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });
};

module.exports = Activity;
