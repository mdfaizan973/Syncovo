const express = require('express');
const cors = require('cors');

const authRoutes = require('./modules/auth/auth.routes');
const notesRoutes = require('./modules/notes/notes.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Syncovo auth API is running',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal server error',
  });
});

module.exports = app;
