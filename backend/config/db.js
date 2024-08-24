const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: console.log,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Connected...');
    await sequelize.sync();  
    console.log('Database synchronized');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
