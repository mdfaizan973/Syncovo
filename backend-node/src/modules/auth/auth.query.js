const { query } = require('../../config/db');

const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(20),
    email VARCHAR(255) UNIQUE NOT NULL,
    otp VARCHAR(6),
    otp_expiry TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

const createUsersTable = async () => {
  await query(createUsersTableQuery);
  await query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS phone_number VARCHAR(20)
  `);
  await query(`
    ALTER TABLE users
    ALTER COLUMN phone_number DROP NOT NULL
  `);
};

const findUserByEmail = async (email) => {
  const result = await query(
    `
      SELECT id, full_name, phone_number, email, otp, otp_expiry, is_verified, created_at
      FROM users
      WHERE email = $1
      LIMIT 1
    `,
    [email]
  );

  return result.rows[0] || null;
};

const createUser = async ({
  id,
  fullName,
  phoneNumber,
  email,
}) => {
  const result = await query(
    `
      INSERT INTO users (id, full_name, phone_number, email, otp, otp_expiry, is_verified)
      VALUES ($1, $2, $3, $4, NULL, NULL, FALSE)
      RETURNING id, full_name, phone_number, email, otp, otp_expiry, is_verified, created_at
    `,
    [id, fullName, phoneNumber, email]
  );

  return result.rows[0];
};

const getAllUsers = async () => {
  const result = await query(`
    SELECT id, full_name, phone_number, email, is_verified, created_at
    FROM users
    ORDER BY created_at DESC
  `);

  return result.rows;
};

const storeUserOtp = async ({ email, otp, otpExpiry }) => {
  const result = await query(
    `
      UPDATE users
      SET otp = $2,
          otp_expiry = $3
      WHERE email = $1
      RETURNING id, full_name, phone_number, email, otp, otp_expiry, is_verified, created_at
    `,
    [email, otp, otpExpiry]
  );

  return result.rows[0] || null;
};

const markUserAsVerified = async (id) => {
  const result = await query(
    `
      UPDATE users
      SET is_verified = TRUE,
          otp = NULL,
          otp_expiry = NULL
      WHERE id = $1
      RETURNING id, full_name, phone_number, email, is_verified, created_at
    `,
    [id]
  );

  return result.rows[0] || null;
};

module.exports = {
  createUsersTableQuery,
  createUsersTable,
  findUserByEmail,
  createUser,
  getAllUsers,
  storeUserOtp,
  markUserAsVerified,
};
