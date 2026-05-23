const crypto = require('crypto');

const generateToken = require('../../utils/generateToken');
const sendEmail = require('../../utils/sendEmail');
const {
  findUserByEmail,
  findUserById,
  createUser,
  getAllUsers,
  updateUserById,
  storeUserOtp,
  markUserAsVerified,
} = require('./auth.query');

const OTP_EXPIRY_MINUTES = 5;

const createOtp = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const registerUser = async (payload) => {
  const fullName = payload.full_name || payload.fullName;
  const email = payload.email;
  const phoneNumber =
    payload.phone_number || payload.phoneNumber || payload.phone;
  const trimmedFullName = fullName ? fullName.trim() : '';
  const trimmedPhoneNumber = phoneNumber ? phoneNumber.trim() : '';

  if (!trimmedFullName || !email) {
    const error = new Error('full_name and email are required');
    error.statusCode = 400;
    throw error;
  }

  if (!isValidEmail(email)) {
    const error = new Error('Please provide a valid email address');
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser) {
    const error = new Error('User already exists');
    error.statusCode = 409;
    throw error;
  }

  const user = await createUser({
    id: crypto.randomUUID(),
    fullName: trimmedFullName,
    phoneNumber: trimmedPhoneNumber || null,
    email: normalizedEmail,
  });

  return {
    message: 'User registered successfully',
    user: {
      id: user.id,
      full_name: user.full_name,
      phone_number: user.phone_number,
      email: user.email,
      plan: user.plan,
      role_type: user.role_type,
      is_verified: user.is_verified,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
  };
};

const getUsers = async () => {
  const users = await getAllUsers();

  return {
    message: 'Users fetched successfully',
    users,
  };
};

const updateUser = async (userId, payload) => {
  const existingUser = await findUserById(userId);

  if (!existingUser) {
    const error = new Error("User Doesn't exist");
    error.statusCode = 404;
    throw error;
  }

  const fullName = payload.full_name || payload.fullName;
  const email = payload.email;
  const hasPhoneField =
    Object.prototype.hasOwnProperty.call(payload, 'phone_number') ||
    Object.prototype.hasOwnProperty.call(payload, 'phoneNumber') ||
    Object.prototype.hasOwnProperty.call(payload, 'phone');
  const rawPhoneNumber = hasPhoneField
    ? payload.phone_number ?? payload.phoneNumber ?? payload.phone
    : undefined;

  const updates = {};

  if (fullName !== undefined) {
    const trimmedFullName = fullName ? fullName.trim() : '';

    if (!trimmedFullName) {
      const error = new Error('full_name cannot be empty');
      error.statusCode = 400;
      throw error;
    }

    updates.full_name = trimmedFullName;
  }

  if (email !== undefined) {
    const trimmedEmail = email ? email.trim().toLowerCase() : '';

    if (!trimmedEmail) {
      const error = new Error('email cannot be empty');
      error.statusCode = 400;
      throw error;
    }

    if (!isValidEmail(trimmedEmail)) {
      const error = new Error('Please provide a valid email address');
      error.statusCode = 400;
      throw error;
    }

    updates.email = trimmedEmail;
  }

  if (hasPhoneField) {
    const trimmedPhoneNumber =
      rawPhoneNumber && rawPhoneNumber.trim ? rawPhoneNumber.trim() : '';

    updates.phone_number = trimmedPhoneNumber || null;
  }

  if (!Object.keys(updates).length) {
    const error = new Error(
      'Provide at least one field: full_name, email or phone_number'
    );
    error.statusCode = 400;
    throw error;
  }

  try {
    const updatedUser = await updateUserById(userId, updates);

    if (!updatedUser) {
      const error = new Error('Unable to update user');
      error.statusCode = 500;
      throw error;
    }

    return {
      message: 'User updated successfully',
      user: updatedUser,
    };
  } catch (error) {
    if (error.code === '23505') {
      const duplicateError = new Error('Email already in use');
      duplicateError.statusCode = 409;
      throw duplicateError;
    }

    throw error;
  }
};

const loginUser = async ({ email }) => {
  if (!email) {
    const error = new Error('email is required');
    error.statusCode = 400;
    throw error;
  }

  if (!isValidEmail(email)) {
    const error = new Error('Please provide a valid email address');
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await findUserByEmail(normalizedEmail);

  if (!existingUser) {
    const error = new Error("User Doesn't exist");
    error.statusCode = 404;
    throw error;
  }

  const otp = createOtp();
  const otpExpiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
  const user = await storeUserOtp({
    email: normalizedEmail,
    otp,
    otpExpiry,
  });

  await sendEmail({
    to: normalizedEmail,
    subject: 'Syncovo Login OTP',
    text: `Your Syncovo OTP is ${otp}. It will expire in ${OTP_EXPIRY_MINUTES} minutes.`,
    html: `
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:20px;overflow:hidden;font-family:Arial,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,0.08);">
    
      <div style="background:linear-gradient(135deg,#f97316,#ea580c);padding:40px 20px;text-align:center;">
        <h1 style="margin:0;color:white;font-size:34px;font-weight:bold;">Syncovo</h1>
        <p style="margin-top:10px;color:rgba(255,255,255,0.9);font-size:15px;">Secure Login Verification</p>
      </div>
    
      <div style="padding:40px 35px;background:#ffffff;">
        
        <h2 style="margin:0 0 15px;color:#111827;font-size:26px;">
          Hello ${user.full_name},
        </h2>
    
        <p style="margin:0 0 25px;color:#4b5563;font-size:16px;line-height:1.7;">
          We received a login request for your Syncovo account. Use the OTP below to securely continue your login.
        </p>
    
        <div style="background:#fff7ed;border:2px dashed #f97316;border-radius:18px;padding:30px;text-align:center;margin:30px 0;">
          <p style="margin:0 0 12px;color:#9a3412;font-size:13px;letter-spacing:2px;font-weight:600;">
            YOUR OTP CODE
          </p>
    
          <h1 style="margin:0;color:#ea580c;font-size:46px;letter-spacing:12px;font-weight:bold;">
            ${otp}
          </h1>
        </div>
    
        <div style="background:#fff7ed;border:1px solid #fdba74;padding:14px 18px;border-radius:12px;margin-bottom:25px;">
          <p style="margin:0;color:#c2410c;font-size:14px;font-weight:600;">
            This OTP will expire in ${OTP_EXPIRY_MINUTES} minutes.
          </p>
        </div>
    
        <p style="margin:0;color:#6b7280;font-size:15px;line-height:1.7;">
          If you did not request this login, you can safely ignore this email.
        </p>
    
      </div>
    
      <div style="padding:22px;text-align:center;background:#fff7ed;border-top:1px solid #fed7aa;">
        <p style="margin:0;color:#9a3412;font-size:13px;">
          © ${new Date().getFullYear()} Syncovo. All rights reserved.
        </p>
      </div>
    
    </div>
    `,
  });

  return {
    message: 'OTP sent successfully',
    user: {
      id: user.id,
      full_name: user.full_name,
      phone_number: user.phone_number,
      email: user.email,
      plan: user.plan,
      role_type: user.role_type,
      is_verified: user.is_verified,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
  };
};

const verifyOtp = async ({ email, otp }) => {
  if (!email || !otp) {
    const error = new Error('email and otp are required');
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await findUserByEmail(normalizedEmail);

  if (!user) {
    const error = new Error("User Doesn't exist");
    error.statusCode = 404;
    throw error;
  }

  if (!user.otp || user.otp !== otp.trim()) {
    const error = new Error('Invalid OTP');
    error.statusCode = 400;
    throw error;
  }

  if (!user.otp_expiry || new Date(user.otp_expiry) < new Date()) {
    const error = new Error('OTP has expired');
    error.statusCode = 400;
    throw error;
  }

  const verifiedUser = await markUserAsVerified(user.id);

  if (!verifiedUser) {
    const error = new Error('Unable to verify user');
    error.statusCode = 500;
    throw error;
  }

  const token = generateToken(verifiedUser);

  return {
    message: 'OTP verified successfully',
    user: verifiedUser,
    token,
  };
};

module.exports = {
  registerUser,
  getUsers,
  updateUser,
  loginUser,
  verifyOtp,
};
