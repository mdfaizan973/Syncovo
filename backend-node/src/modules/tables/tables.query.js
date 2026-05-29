const { query } = require('../../config/db');

const createTablesTableQuery = `
  CREATE TABLE IF NOT EXISTS tables_data (
    id UUID PRIMARY KEY,

    workspace_id UUID NOT NULL,

    name VARCHAR(255) NOT NULL,
    description TEXT,

    schema JSONB DEFAULT '[]',
    rows JSONB DEFAULT '[]',

    editors TEXT[] DEFAULT ARRAY[]::TEXT[],
    viewers TEXT[] DEFAULT ARRAY[]::TEXT[],

    created_by UUID NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_workspace
      FOREIGN KEY(workspace_id)
      REFERENCES workspaces(id)
      ON DELETE CASCADE,

    CONSTRAINT fk_table_user
      FOREIGN KEY(created_by)
      REFERENCES users(id)
      ON DELETE CASCADE
  );
`;

const createTablesTable = async () => {
  await query(createTablesTableQuery);
};

const createTableQuery = async ({
  id,
  workspace_id,
  name,
  description,
  schema,
  rows,
  editors,
  viewers,
  created_by,
}) => {

  const result = await query(
    `
      INSERT INTO tables_data (
        id,
        workspace_id,
        name,
        description,
        schema,
        rows,
        editors,
        viewers,
        created_by
      )

      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9
      )

      RETURNING *
    `,
    [
      id,
      workspace_id,
      name,
      description,
      JSON.stringify(schema),
      JSON.stringify(rows),
      editors,
      viewers,
      created_by,
    ]
  );

  return result.rows[0];
};

const getAllTablesQuery = async (
  workspaceId
) => {
  const result = await query(
    `
      SELECT *
      FROM tables_data
      WHERE workspace_id = $1
      ORDER BY created_at DESC
    `,
    [workspaceId]
  );

  // response should include the editors and viewwer { id, full_name, email} instead only id

  return result.rows;
};

const getTableByIdQuery = async (
  tableId
) => {
  const result = await query(
    `
      SELECT *
      FROM tables_data
      WHERE id = $1
      LIMIT 1
    `,
    [tableId]
  );

  return result.rows[0] || null;
};

const updateTableQuery = async (
  tableId,
  updates
) => {
  const fields = [];
  const values = [tableId];

  let index = 2;

  if (updates.name !== undefined) {
    fields.push(`name = $${index}`);
    values.push(updates.name);
    index++;
  }

  if (updates.description !== undefined) {
    fields.push(`description = $${index}`);
    values.push(updates.description);
    index++;
  }

  if (updates.schema !== undefined) {
    fields.push(`schema = $${index}`);
    values.push(JSON.stringify(updates.schema));
    index++;
  }

  if (!fields.length) {
    return null;
  }

  fields.push(`updated_at = CURRENT_TIMESTAMP`);

  const result = await query(
    `
      UPDATE tables_data
      SET ${fields.join(', ')}

      WHERE id = $1

      RETURNING *
    `,
    values
  );

  return result.rows[0] || null;
};

const deleteTableQuery = async (
  tableId
) => {
  const result = await query(
    `
      DELETE FROM tables_data
      WHERE id = $1

      RETURNING *
    `,
    [tableId]
  );

  return result.rows[0] || null;
};

module.exports = {
  createTablesTable,
  createTableQuery,
  getAllTablesQuery,
  getTableByIdQuery,
  updateTableQuery,
  deleteTableQuery,
};