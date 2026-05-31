const { getUserInfoService } = require("./usersInfo.service");

const getUserInfo = async (req, res, next) => {
    try {
        const result = await getUserInfoService(req.params.userId);
        return res.status(200).json({ success: true, message: result.message, data: result.info });
    } catch (error) { next(error); }
};

module.exports = { getUserInfo };    