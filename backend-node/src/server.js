require('dotenv').config();

const app = require('./app');
const { query, pool } = require('./config/db');
const initTables = require('./config/initTables');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await query('SELECT 1');
    await initTables();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    await pool.end();
    process.exit(1);
  }
};

startServer();
