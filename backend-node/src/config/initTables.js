const { createUsersTable } = require('../modules/auth/auth.query');
const { createNotesTable } = require('../modules/notes/notes.query');
const { createWorkspacesTable } = require('../modules/organisations/organisation.query');
const { createTablesTable } = require('../modules/tables/tables.query');
const { createTableRowsTable } = require('../modules/table_rows/table-row.query');

const initTables = async () => {
  await createUsersTable();
  await createNotesTable();
  await createWorkspacesTable();
  await createTablesTable();
  await createTableRowsTable();
};

module.exports = initTables;