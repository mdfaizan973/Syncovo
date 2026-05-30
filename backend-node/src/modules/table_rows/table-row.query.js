const { query } = require('../../config/db');

const createTableRowsTableQuery = `
  CREATE TABLE IF NOT EXISTS table_rows (
    id UUID PRIMARY KEY,

    table_id UUID NOT NULL,

    row_data JSONB DEFAULT '{}',

    created_by UUID NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_table
      FOREIGN KEY(table_id)
      REFERENCES tables_data(id)
      ON DELETE CASCADE,

    CONSTRAINT fk_user
      FOREIGN KEY(created_by)
      REFERENCES users(id)
      ON DELETE CASCADE
  );
`;

const createTableRowsTable = async () => {
  await query(createTableRowsTableQuery);
};

const createTableRowQuery = async ({
  id,
  table_id,
  row_data,
  created_by,
}) => {
  const result = await query(
    `
      INSERT INTO table_rows (
        id,
        table_id,
        row_data,
        created_by
      )

      VALUES ($1,$2,$3,$4)

      RETURNING *
    `,
    [
      id,
      table_id,
      row_data,
      created_by,
    ]
  );

  return result.rows[0];
};

const getAllTableRowsQuery = async (
  tableId
) => {
  const result = await query(
    `
      SELECT *
      FROM table_rows

      WHERE table_id = $1

      ORDER BY created_at DESC
    `,
    [tableId]
  );

  return result.rows;
};

const getTableRowByIdQuery = async (
  rowId
) => {
  const result = await query(
    `
      SELECT *
      FROM table_rows

      WHERE id = $1

      LIMIT 1
    `,
    [rowId]
  );

  return result.rows[0] || null;
};

const updateTableRowQuery = async (
  rowId,
  rowData
) => {
  const result = await query(
    `
      UPDATE table_rows

      SET
        row_data = row_data || $2::jsonb,
        updated_at = CURRENT_TIMESTAMP

      WHERE id = $1

      RETURNING *
    `,
    [
      rowId,
      JSON.stringify(rowData),
    ]
  );

  return result.rows[0] || null;
};

const deleteTableRowQuery = async (
  rowId
) => {
  const result = await query(
    `
      DELETE FROM table_rows

      WHERE id = $1

      RETURNING *
    `,
    [rowId]
  );

  return result.rows[0] || null;
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

module.exports = {
  createTableRowsTable,
  createTableRowQuery,
  getAllTableRowsQuery,
  getTableRowByIdQuery,
  updateTableRowQuery,
  deleteTableRowQuery,
  getTableByIdQuery,
};