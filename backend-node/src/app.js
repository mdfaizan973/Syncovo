const express = require('express');
const cors = require('cors');

const authRoutes = require('./modules/auth/auth.routes');
const notesRoutes = require('./modules/notes/notes.routes');
const workspaceRoutes = require('./modules/organisations/organisation.routes');
const tableRoutes = require('./modules/tables/table.routes');
const tableRowRoutes = require('./modules/table_rows/table-rows.routes');

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
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/table-rows', tableRowRoutes);
// // for forms
// app.use('/api/forms', formRoutes);
// // for rows
// app.use('/api/rows', rowRoutes);

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
