const authService = require('./auth.service');

const register = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: result.message,
      data: result.user,
    });
  } catch (error) {
    return next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const result = await authService.getUsers();

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.users,
    });
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const result = await authService.updateUser(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.user,
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.user,
    });
  } catch (error) {
    return next(error);
  }
};

const verifyOtp = async (req, res, next) => {
  try {
    const result = await authService.verifyOtp(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: {
        // user: result.user,
        token: result.token,
      },
    });
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  register,
  getUsers,
  updateUser,
  login,
  verifyOtp,
};


// POST /api/auth/register

// takes full_name, email, phone_number
// creates the user only
// does not send OTP at registration

// POST /api/auth/login

// takes email
// if user exists, sends OTP to email
// if user does not exist, returns User Doesn't exist

// POST /api/auth/verify-otp

// takes email, otp
// verifies OTP
// returns authenticated user and JWT token
