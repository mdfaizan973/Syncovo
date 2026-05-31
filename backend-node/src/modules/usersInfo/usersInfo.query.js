const { query } = require('../../config/db');

const getUserInfoQuery = async (userId) => {
    // all the info should be fetched from the users 
    const result = await query(
        `
        SELECT *
        FROM tables_data
        WHERE $1 = ANY(editors)
        OR $1 = ANY(viewers)
        OR created_by::text = $1
        ORDER BY created_at DESC
        `,
        [userId]
    );
    return result.rows;
};

module.exports = { getUserInfoQuery };