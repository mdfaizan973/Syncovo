const { createUsersTable } = require('../modules/auth/auth.query');
const { createNotesTable } = require('../modules/notes/notes.query');
const { createWorkspacesTable } = require('../modules/organisations/organisation.query');

const initTables = async () => {
  await createUsersTable();
  await createNotesTable();
  await createWorkspacesTable();
};

module.exports = initTables;