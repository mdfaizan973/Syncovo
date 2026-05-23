const { createUsersTable } = require("../modules/auth/auth.query");

const initTables = async () => {

  await createUsersTable();

};

module.exports = initTables;