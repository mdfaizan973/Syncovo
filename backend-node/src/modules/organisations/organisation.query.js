const { query } = require('../../config/db');

const getTableCountQuery = async (workspaceId) => {
  const result = await query(
    `
      SELECT COUNT(*) FROM tables_data WHERE workspace_id = $1
    `,
    [workspaceId]
  );
  return result.rows[0].count;
};

// const getFormCountQuery = async (workspaceId) => {

//   const result = await query(
//     `
//       SELECT COUNT(*) FROM forms WHERE workspace_id = $1
//     `,
//     [workspaceId]
//   );
//   return result.rows[0].count;
// };

const createWorkspacesTableQuery = `
  CREATE TABLE IF NOT EXISTS workspaces (
    id UUID PRIMARY KEY,

    name VARCHAR(255) NOT NULL,
    description TEXT,

    editors TEXT[] DEFAULT '{}',
    viewers TEXT[] DEFAULT '{}',

    created_by UUID NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_workspace_user
      FOREIGN KEY(created_by)
      REFERENCES users(id)
      ON DELETE CASCADE
  );
`;

const createWorkspacesTable = async () => {
  await query(createWorkspacesTableQuery);
};

const createWorkspaceQuery = async ({
  id,
  name,
  description,
  editors,
  viewers,
  created_by,
}) => {
  const result = await query(
    `
      INSERT INTO workspaces (
        id,
        name,
        description,
        editors,
        viewers,
        created_by
      )

      VALUES ($1,$2,$3,$4,$5,$6)

      RETURNING *
    `,
    [
      id,
      name,
      description,
      editors,
      viewers,
      created_by,
    ]
  );

  return result.rows[0];
};

const getAllWorkspacesQuery = async (userId) => {
    const workspaceResult = await query(
      `
        SELECT *
        FROM workspaces
  
        WHERE
        created_by = $1
        OR $2 = ANY(editors)
        OR $2 = ANY(viewers)
  
        ORDER BY created_at DESC
      `,
      [
        userId,
        userId.toString(),
      ]
    );
  
    const workspaces = [];
  
    for (const workspace of workspaceResult.rows) {
  
      const totalTables = await getTableCountQuery(workspace.id);
      // const totalForms = await getFormCountQuery(workspace.id);
      // OWNER
      const ownerResult = await query(
        `
          SELECT id, full_name, email
          FROM users
          WHERE id = $1
          LIMIT 1
        `,
        [workspace.created_by]
      );
  
      const owner = ownerResult.rows[0];
  
      // EDITORS
      const editorsResult = await query(
        `
          SELECT id, full_name, email
          FROM users
          WHERE id = ANY($1::uuid[])
        `,
        [workspace.editors || []]
      );
  
      // VIEWERS
      const viewersResult = await query(
        `
          SELECT id, full_name, email
          FROM users
          WHERE id = ANY($1::uuid[])
        `,
        [workspace.viewers || []]
      );
  
      const editors = editorsResult.rows.map((user) => ({
        id: user.id,
        name: user.full_name,
        email: user.email,
      }));
  
      const viewers = viewersResult.rows.map((user) => ({
        id: user.id,
        name: user.full_name,
        email: user.email,
      }));
  
      // ❌ REMOVE DB CALLS FOR NOW (tables/forms don't exist)
      const total_forms = 0;
      const total_members = editors.length + viewers.length + 1;
  
      workspaces.push({
        id: workspace.id,
  
        name: workspace.name,
        description: workspace.description,
  
        created_by: workspace.created_by,
        created_at: workspace.created_at,
        updated_at: workspace.updated_at,
  
        assigned_users: [
          ...editors,
          ...viewers,
        ],
  
        total_tables: Number(totalTables),
        total_forms,
  
        total_members: total_members,
  
        owner: {
          id: owner?.id,
          name: owner?.full_name,
          email: owner?.email,
        },
  
        editors,
        viewers,
      });
    }
  
    return workspaces;
  };

  //TODO: @Faizan - make it correct for the workspace view
  const getWorkspaceByIdQuery = async (
    workspaceId,
    userId
  ) => {
  
    const workspaceResult = await query(
      `
        SELECT *
        FROM workspaces
    
        WHERE id = $1::uuid
    
        AND (
          created_by = $2::uuid
          OR $2::text = ANY(editors)
          OR $2::text = ANY(viewers)
        )
    
        LIMIT 1
      `,
      [workspaceId, userId]
    );
  
    const workspace = workspaceResult.rows[0];

    const totalTables = await getTableCountQuery(workspace.id);
    // const totalForms = await getFormCountQuery(workspace.id);

    return {
      ...workspace,
      total_tables: totalTables,
    };
  };

const updateWorkspaceQuery = async (
  workspaceId,
  userId,
  updates
) => {
  const fields = [];
  const values = [workspaceId, userId];

  let index = 3;

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

  if (updates.editors !== undefined) {
    fields.push(`editors = $${index}`);
    values.push(updates.editors);
    index++;
  }

  if (updates.viewers !== undefined) {
    fields.push(`viewers = $${index}`);
    values.push(updates.viewers);
    index++;
  }

  if (!fields.length) {
    return null;
  }

  fields.push(
    `updated_at = CURRENT_TIMESTAMP`
  );

  const result = await query(
    `
      UPDATE workspaces
      SET ${fields.join(', ')}

      WHERE id = $1
      AND created_by = $2

      RETURNING *
    `,
    values
  );

  return result.rows[0] || null;
};

const deleteWorkspaceQuery = async (
  workspaceId,
  userId
) => {
  const result = await query(
    `
      DELETE FROM workspaces

      WHERE id = $1
      AND created_by = $2

      RETURNING *
    `,
    [workspaceId, userId]
  );

  return result.rows[0] || null;
};

module.exports = {
  createWorkspacesTable,
  createWorkspaceQuery,
  getAllWorkspacesQuery,
  getWorkspaceByIdQuery,
  updateWorkspaceQuery,
  deleteWorkspaceQuery,
};