const { query } = require('../../config/db');

const createFormsTableQuery = `
  CREATE TABLE IF NOT EXISTS forms (
    id UUID PRIMARY KEY,

    workspace_id UUID NOT NULL,
    table_id UUID NOT NULL,

    name VARCHAR(255) NOT NULL,
    description TEXT,

    fields JSONB DEFAULT '[]',

    created_by UUID NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

const createFormsTable = async () => {
  await query(createFormsTableQuery);
};

const createFormQuery = async ({
  id,
  workspace_id,
  table_id,
  name,
  description,
  fields,
  created_by,
}) => {
  const result = await query(
    `
      INSERT INTO forms (
        id,
        workspace_id,
        table_id,
        name,
        description,
        fields,
        created_by
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7)

      RETURNING *
    `,
    [
      id,
      workspace_id,
      table_id,
      name,
      description,
      JSON.stringify(fields),
      created_by,
    ]
  );

  return result.rows[0];
};

const getFormsByTableQuery = async (
  tableId
) => {
  const result = await query(
    `
      SELECT *
      FROM forms
      WHERE table_id = $1
      ORDER BY created_at DESC
    `,
    [tableId]
  );

  return result.rows;
};

const getFormByIdQuery = async (
  formId
) => {
  const result = await query(
    `
      SELECT *
      FROM forms
      WHERE id = $1
      LIMIT 1
    `,
    [formId]
  );

  return result.rows[0] || null;
};

const updateFormQuery = async (
  formId,
  updates
) => {
  const fields = [];
  const values = [formId];

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

  if (updates.fields !== undefined) {
    fields.push(`fields = $${index}`);
    values.push(
      JSON.stringify(updates.fields)
    );
    index++;
  }

  fields.push(
    `updated_at = CURRENT_TIMESTAMP`
  );

  const result = await query(
    `
      UPDATE forms
      SET ${fields.join(', ')}

      WHERE id = $1

      RETURNING *
    `,
    values
  );

  return result.rows[0] || null;
};

const deleteFormQuery = async (
  formId
) => {
  const result = await query(
    `
      DELETE FROM forms
      WHERE id = $1

      RETURNING *
    `,
    [formId]
  );

  return result.rows[0] || null;
};

module.exports = {
  createFormsTable,
  createFormQuery,
  getFormsByTableQuery,
  getFormByIdQuery,
  updateFormQuery,
  deleteFormQuery,
};