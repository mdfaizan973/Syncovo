const { query } = require('../../config/db');

const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    otp VARCHAR(6),
    otp_expiry TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

const createUsersTable = async () => {
  await query(createUsersTableQuery);
};

const findUserByEmail = async (email) => {
  const result = await query(
    `
      SELECT id, full_name, email, otp, otp_expiry, is_verified, created_at
      FROM users
      WHERE email = $1
      LIMIT 1
    `,
    [email]
  );

  return result.rows[0] || null;
};

const createOrUpdatePendingUser = async ({
  id,
  fullName,
  email,
  otp,
  otpExpiry,
}) => {
  const result = await query(
    `
      INSERT INTO users (id, full_name, email, otp, otp_expiry, is_verified)
      VALUES ($1, $2, $3, $4, $5, FALSE)
      ON CONFLICT (email)
      DO UPDATE SET
        full_name = EXCLUDED.full_name,
        otp = EXCLUDED.otp,
        otp_expiry = EXCLUDED.otp_expiry
      RETURNING id, full_name, email, otp, otp_expiry, is_verified, created_at
    `,
    [id, fullName, email, otp, otpExpiry]
  );

  return result.rows[0];
};

const markUserAsVerified = async (id) => {
  const result = await query(
    `
      UPDATE users
      SET is_verified = TRUE,
          otp = NULL,
          otp_expiry = NULL
      WHERE id = $1
      RETURNING id, full_name, email, is_verified, created_at
    `,
    [id]
  );

  return result.rows[0] || null;
};

module.exports = {
  createUsersTableQuery,
  createUsersTable,
  findUserByEmail,
  createOrUpdatePendingUser,
  markUserAsVerified,
};
