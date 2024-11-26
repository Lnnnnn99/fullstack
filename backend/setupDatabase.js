const fs = require('fs');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv')

dotenv.config()

const setupDatabase = async () => {
  try {
    const schema = fs.readFileSync('./schema.sql', 'utf8');
    const seed = fs.readFileSync('./seed.sql', 'utf8');

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || ''
    });

    console.log('Connected to MySQL');

    const schemaStatements = schema.split(';').filter(statement => statement.trim() !== '');
    for (const statement of schemaStatements) {
      await connection.query(statement);
    }

    const seedStatements = seed.split(';').filter(statement => statement.trim() !== '');
    for (const statement of seedStatements) {
      await connection.query(statement);
    }

    console.log('Database setup complete');
    await connection.end();
    
  } catch (error) {
    console.error('Error setting up the database:', error);
  }
};

setupDatabase();
