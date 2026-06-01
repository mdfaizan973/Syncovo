const { query } = require('../../config/db');

const getUserInfoQuery = async (userId) => {
    // all the info should be fetched from the users 
    const result = await query(
        `
        SELECT *
        FROM tables_data
        WHERE created_by::text = $1
        ORDER BY created_at DESC
        `,
        [userId]
    );
    return result.rows;
};

// total notes query
const getTotalNotesQuery = async (userId) => {
    const result = await query(
        `
        SELECT * FROM notes WHERE created_by = $1
        `,
        [userId]
    );
    return result.rows;
};

// total workspaces query
const getTotalWorkspacesQuery = async (userId) => {
    const result = await query(
        `
        SELECT * FROM workspaces WHERE created_by = $1
        `,
        [userId]
    );
    
    return result.rows;
};

// total tasks assigned to the user query
const getTotalTasksAssignedToUserQuery = async (userId) => {
    const result = await query(
        `
        SELECT * FROM tables_data WHERE $1 = ANY(editors) OR $1 = ANY(viewers)
        `,
        [userId]
    );
    return result.rows;
};

// total notifications query
const getTotalNotificationsQuery = async (userId) => {
    const result = await query(
        `
        SELECT COUNT(*) FROM notifications WHERE created_by = $1
        `,
        [userId]
    );
    return result.rows[0].count;
};

module.exports = { getUserInfoQuery, getTotalNotesQuery, getTotalWorkspacesQuery, getTotalTasksAssignedToUserQuery };