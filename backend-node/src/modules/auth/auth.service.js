const crypto = require('crypto');

const generateToken = require('../../utils/generateToken');
const sendEmail = require('../../utils/sendEmail');
const {
  findUserByEmail,
  createUser,
  getAllUsers,
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
      is_verified: user.is_verified,
      created_at: user.created_at,
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
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Syncovo Login Verification</h2>
        <p>Hello ${user.full_name},</p>
        <p>Your login OTP is:</p>
        <h1 style="letter-spacing: 4px;">${otp}</h1>
        <p>This OTP will expire in ${OTP_EXPIRY_MINUTES} minutes.</p>
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
      is_verified: user.is_verified,
      created_at: user.created_at,
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
  loginUser,
  verifyOtp,
};
