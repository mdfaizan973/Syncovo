const { query } = require('../../config/db');

const getRowCountQuery = async (tableId) => {
  const result = await query(
    `
      SELECT COUNT(*) FROM table_rows WHERE table_id = $1
    `,
    [tableId]
  );
  return result.rows[0].count;
};

const createTablesTableQuery = `
  CREATE TABLE IF NOT EXISTS tables_data (
    id UUID PRIMARY KEY,

    workspace_id UUID NOT NULL,

    name VARCHAR(255) NOT NULL,
    description TEXT,

    schema JSONB DEFAULT '[]',

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
        editors,
        viewers,
        created_by
      )

      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5::jsonb,
        $6,
        $7,
        $8
      )

      RETURNING *
    `,
    [
      id,
      workspace_id,
      name,
      description,
      JSON.stringify(schema || []),
      editors || [],
      viewers || [],
      created_by,
    ]
  );

  return result.rows[0];
};

const getAllTablesQuery = async (
  workspaceId
) => {

  const tableResult = await query(
    `
      SELECT *
      FROM tables_data

      WHERE workspace_id = $1

      ORDER BY created_at DESC
    `,
    [workspaceId]
  );

  const tables = [];

  for (const table of tableResult.rows) {

    const totalRows = await getRowCountQuery(table.id);
    
    const ownerResult = await query(
      `
        SELECT
          id,
          full_name,
          email

        FROM users

        WHERE id = $1

        LIMIT 1
      `,
      [table.created_by]
    );

    const owner = ownerResult.rows[0];

    const editorsResult = await query(
      `
        SELECT
          id,
          full_name,
          email

        FROM users

        WHERE id = ANY($1::uuid[])
      `,
      [table.editors || []]
    );

    const viewersResult = await query(
      `
        SELECT
          id,
          full_name,
          email

        FROM users

        WHERE id = ANY($1::uuid[])
      `,
      [table.viewers || []]
    );

    const editors = editorsResult.rows.map(
      (user) => ({
        id: user.id,
        name: user.full_name,
        email: user.email,
      })
    );

    const viewers = viewersResult.rows.map(
      (user) => ({
        id: user.id,
        name: user.full_name,
        email: user.email,
      })
    );

    tables.push({
      id: table.id,

      workspace_id: table.workspace_id,

      name: table.name,
      description: table.description,

      schema: table.schema,
      row_count: Number(totalRows),

      created_by: table.created_by,

      created_at: table.created_at,
      updated_at: table.updated_at,

      assigned_users: [
        ...editors,
        ...viewers,
      ],

      owner: {
        id: owner?.id,
        name: owner?.full_name,
        email: owner?.email,
      },

      editors,
      viewers,
    });
  }

  return tables;
};

const getTableByIdQuery = async (
  tableId
) => {

  const tableResult = await query(
    `
      SELECT *
      FROM tables_data

      WHERE id = $1

      LIMIT 1
    `,
    [tableId]
  );

  const table = tableResult.rows[0];

  if (!table) {
    return null;
  }

  const ownerResult = await query(
    `
      SELECT
        id,
        full_name,
        email

      FROM users

      WHERE id = $1

      LIMIT 1
    `,
    [table.created_by]
  );

  const owner = ownerResult.rows[0];

  const editorsResult = await query(
    `
      SELECT
        id,
        full_name,
        email

      FROM users

      WHERE id = ANY($1::uuid[])
    `,
    [table.editors || []]
  );

  const viewersResult = await query(
    `
      SELECT
        id,
        full_name,
        email

      FROM users

      WHERE id = ANY($1::uuid[])
    `,
    [table.viewers || []]
  );

  const editors = editorsResult.rows.map(
    (user) => ({
      id: user.id,
      name: user.full_name,
      email: user.email,
    })
  );

  const viewers = viewersResult.rows.map(
    (user) => ({
      id: user.id,
      name: user.full_name,
      email: user.email,
    })
  );
  const totalRows =
  await getRowCountQuery(
    table.id
  );

  return {
    id: table.id,

    workspace_id: table.workspace_id,

    name: table.name,
    description: table.description,

    schema: table.schema,

    row_count: Number(totalRows),

    created_by: table.created_by,

    created_at: table.created_at,
    updated_at: table.updated_at,

    assigned_users: [
      ...editors,
      ...viewers,
    ],

    owner: {
      id: owner?.id,
      name: owner?.full_name,
      email: owner?.email,
    },

    editors,
    viewers,
  };
};

const updateTableQuery = async (
  tableId,
  updates
) => {
  const allowedFields = [
    'name',
    'description',
    'schema',
    'editors',
    'viewers',
  ];

  const fields = [];
  const values = [tableId];

  let index = 2;

  allowedFields.forEach((field) => {
    if (updates[field] !== undefined) {
      fields.push(`${field} = $${index}`);
      values.push(updates[field]);
      index++;
    }
  });

  if (!fields.length) {
    return null;
  }

  fields.push('updated_at = CURRENT_TIMESTAMP');

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
  getRowCountQuery,
};