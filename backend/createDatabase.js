require('dotenv').config();
const mysql = require('mysql2/promise');

const createDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
  console.log(`Database ${process.env.DB_NAME} created or already exists.`);
  connection.end();
};

createDatabase().catch(err => {
  console.error('Error creating database:', err);
  process.exit(1);
});
