const { query } = require('../../config/db');

const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(20),
    email VARCHAR(255) UNIQUE NOT NULL,
    plan VARCHAR(20) DEFAULT 'free' CHECK (plan IN ('free', 'basic', 'pro')),
    role_type VARCHAR(30) DEFAULT 'user' CHECK (role_type IN ('user', 'org_admin', 'platform_admin')),
    otp VARCHAR(6),
    otp_expiry TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

const createUsersTable = async () => {
  await query(createUsersTableQuery);
};

const findUserByEmail = async (email) => {
  const result = await query(
    `
      SELECT id, full_name, phone_number, email, plan, role_type, otp, otp_expiry, is_verified, created_at, updated_at
      FROM users
      WHERE email = $1
      LIMIT 1
    `,
    [email]
  );

  return result.rows[0] || null;
};

const findUserById = async (id) => {
  const result = await query(
    `
      SELECT id, full_name, phone_number, email, plan, role_type, otp, otp_expiry, is_verified, created_at, updated_at
      FROM users
      WHERE id = $1
      LIMIT 1
    `,
    [id]
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
      INSERT INTO users (id, full_name, phone_number, email, plan, role_type, otp, otp_expiry, is_verified)
      VALUES ($1, $2, $3, $4, DEFAULT, DEFAULT, NULL, NULL, FALSE)
      RETURNING id, full_name, phone_number, email, plan, role_type, otp, otp_expiry, is_verified, created_at, updated_at
    `,
    [id, fullName, phoneNumber, email]
  );

  return result.rows[0];
};

const getAllUsers = async () => {
  const result = await query(`
    SELECT id, full_name, phone_number, email, plan, role_type, is_verified, created_at, updated_at
    FROM users
    ORDER BY created_at DESC
  `);

  return result.rows;
};

const updateUserById = async (id, updates) => {
  const fields = [];
  const values = [id];
  let parameterIndex = 2;

  if (Object.prototype.hasOwnProperty.call(updates, 'full_name')) {
    fields.push(`full_name = $${parameterIndex}`);
    values.push(updates.full_name);
    parameterIndex += 1;
  }

  if (Object.prototype.hasOwnProperty.call(updates, 'email')) {
    fields.push(`email = $${parameterIndex}`);
    values.push(updates.email);
    parameterIndex += 1;
  }

  if (Object.prototype.hasOwnProperty.call(updates, 'phone_number')) {
    fields.push(`phone_number = $${parameterIndex}`);
    values.push(updates.phone_number);
    parameterIndex += 1;
  }

  if (!fields.length) {
    return null;
  }

  const result = await query(
    `
      UPDATE users
      SET ${fields.join(', ')},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING id, full_name, phone_number, email, plan, role_type, is_verified, created_at, updated_at
    `,
    values
  );

  return result.rows[0] || null;
};

const storeUserOtp = async ({ email, otp, otpExpiry }) => {
  const result = await query(
    `
      UPDATE users
      SET otp = $2,
          otp_expiry = $3,
          updated_at = CURRENT_TIMESTAMP
      WHERE email = $1
      RETURNING id, full_name, phone_number, email, plan, role_type, otp, otp_expiry, is_verified, created_at, updated_at
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
          otp_expiry = NULL,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING id, full_name, phone_number, email, plan, role_type, is_verified, created_at, updated_at
    `,
    [id]
  );

  return result.rows[0] || null;
};

module.exports = {
  createUsersTableQuery,
  createUsersTable,
  findUserByEmail,
  findUserById,
  createUser,
  getAllUsers,
  updateUserById,
  storeUserOtp,
  markUserAsVerified,
};
