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

const verifyOtp = async (req, res, next) => {
  try {
    const result = await authService.verifyOtp(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: {
        user: result.user,
        token: result.token,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const helloUser = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'Hello User',
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  verifyOtp,
  helloUser,
};
