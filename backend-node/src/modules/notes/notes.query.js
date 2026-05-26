const { query } = require('../../config/db');

const createNotesTableQuery = `
  CREATE TABLE IF NOT EXISTS notes (
    id UUID PRIMARY KEY,

    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,

    favorite BOOLEAN DEFAULT FALSE,

    created_by UUID NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user
      FOREIGN KEY(created_by)
      REFERENCES users(id)
      ON DELETE CASCADE
  );
`;

const createNotesTable = async () => {
  await query(createNotesTableQuery);
};

const createNoteQuery = async ({
  id,
  title,
  description,
  content,
  favorite,
  created_by,
}) => {
  const result = await query(
    `
      INSERT INTO notes (
        id,
        title,
        description,
        content,
        favorite,
        created_by
      )
      VALUES ($1,$2,$3,$4,$5,$6)

      RETURNING *
    `,
    [
      id,
      title,
      description,
      content,
      favorite,
      created_by,
    ]
  );

  return result.rows[0];
};

const getAllNotesQuery = async (userId) => {
  const result = await query(
    `
      SELECT
        notes.*,
        users.full_name,
        users.email
      FROM notes
      INNER JOIN users
      ON notes.created_by = users.id
      WHERE notes.created_by = $1
      ORDER BY notes.created_at DESC
    `,
    [userId]
  );

  return result.rows;
};

const getNoteByIdQuery = async (noteId, userId) => {
  const result = await query(
    `
      SELECT
        notes.*,
        users.full_name,
        users.email
      FROM notes
      INNER JOIN users
      ON notes.created_by = users.id
      WHERE notes.id = $1
      AND notes.created_by = $2
      LIMIT 1
    `,
    [noteId, userId]
  );

  return result.rows[0] || null;
};

const updateNoteQuery = async (noteId, userId, updates) => {
  const fields = [];
  const values = [noteId, userId];

  let index = 3;

  if (updates.title !== undefined) {
    fields.push(`title = $${index}`);
    values.push(updates.title);
    index++;
  }

  if (updates.description !== undefined) {
    fields.push(`description = $${index}`);
    values.push(updates.description);
    index++;
  }

  if (updates.content !== undefined) {
    fields.push(`content = $${index}`);
    values.push(updates.content);
    index++;
  }

  if (updates.favorite !== undefined) {
    fields.push(`favorite = $${index}`);
    values.push(updates.favorite);
    index++;
  }

  if (!fields.length) {
    return null;
  }

  fields.push(`updated_at = CURRENT_TIMESTAMP`);

  const result = await query(
    `
      UPDATE notes
      SET ${fields.join(', ')}

      WHERE id = $1
      AND created_by = $2

      RETURNING *
    `,
    values
  );

  return result.rows[0] || null;
};

const deleteNoteQuery = async (noteId, userId) => {
  const result = await query(
    `
      DELETE FROM notes
      WHERE id = $1
      AND created_by = $2
      RETURNING *
    `,
    [noteId, userId]
  );

  return result.rows[0] || null;
};

module.exports = {
  createNotesTable,
  createNoteQuery,
  getAllNotesQuery,
  getNoteByIdQuery,
  updateNoteQuery,
  deleteNoteQuery,
};