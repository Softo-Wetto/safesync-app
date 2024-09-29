const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');

    if (process.env.NODE_ENV === 'development') {
      // Use { alter: true } in development only
      await sequelize.sync({ alter: true });
      console.log('Models synchronized (development mode)...');
    } else {
      // In production, avoid altering the schema automatically
      await sequelize.sync();
      console.log('Models synchronized (production mode)...');
    }
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
