const crypto = require('crypto');

const generateToken = require('../../utils/generateToken');
const sendEmail = require('../../utils/sendEmail');
const {
  findUserByEmail,
  createOrUpdatePendingUser,
  markUserAsVerified,
} = require('./auth.query');

const OTP_EXPIRY_MINUTES = 5;

const createOtp = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const registerUser = async ({ full_name: fullName, email }) => {
  const trimmedFullName = fullName ? fullName.trim() : '';

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

  if (existingUser && existingUser.is_verified) {
    const error = new Error('User is already verified');
    error.statusCode = 409;
    throw error;
  }

  const otp = createOtp();
  const otpExpiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  const user = await createOrUpdatePendingUser({
    id: crypto.randomUUID(),
    fullName: trimmedFullName,
    email: normalizedEmail,
    otp,
    otpExpiry,
  });

  await sendEmail({
    to: normalizedEmail,
    subject: 'Syncovo OTP Verification',
    text: `Your Syncovo OTP is ${otp}. It will expire in ${OTP_EXPIRY_MINUTES} minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Syncovo Email Verification</h2>
        <p>Hello ${user.full_name},</p>
        <p>Your OTP for verification is:</p>
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
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  if (user.is_verified) {
    const error = new Error('User is already verified');
    error.statusCode = 400;
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
  verifyOtp,
};
