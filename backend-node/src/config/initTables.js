const { createUsersTable } = require('../modules/auth/auth.query');
const { createNotesTable } = require('../modules/notes/notes.query');
const { createWorkspacesTable } = require('../modules/organisations/organisation.query');
const { createTablesTable } = require('../modules/tables/tables.query');

const initTables = async () => {
  await createUsersTable();
  await createNotesTable();
  await createWorkspacesTable();
  await createTablesTable();
};

module.exports = initTables;