const { createUsersTable } = require('../modules/auth/auth.query');
const { createNotesTable } = require('../modules/notes/notes.query');

const initTables = async () => {
  await createUsersTable();
  await createNotesTable();
};

module.exports = initTables;