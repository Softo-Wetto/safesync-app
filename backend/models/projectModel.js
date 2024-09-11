const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Project = sequelize.define('Project', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false, // Assuming location is required
    },
    postcode: {
        type: DataTypes.STRING,
        allowNull: false, // Assuming postcode is required
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false, // Assuming city is required
    },
    filePath: {
        type: DataTypes.STRING, // Store the file path
        allowNull: true, // Make this optional
    },
}, { timestamps: true });

module.exports = Project;
