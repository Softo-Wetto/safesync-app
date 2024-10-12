const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Activity = require('./activityModel');

const ActivityDetails = sequelize.define('ActivityDetails', {
    formData: {
        type: DataTypes.JSON, 
        allowNull: false,
    },
    activityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Activities', key: 'id' },
    },
}, { timestamps: true });

// Associate ActivityDetails with Activity (1-to-1)
ActivityDetails.associate = () => {
    ActivityDetails.belongsTo(Activity, { foreignKey: 'activityId', as: 'activity' });
};

module.exports = ActivityDetails;