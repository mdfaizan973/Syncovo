const { getUserInfoQuery } = require("./usersInfo.query");

const getUserInfoService = async (userId) => {
    const info = await getUserInfoQuery(userId);
    return { message: 'User info fetched successfully', info };
};

module.exports = { getUserInfoService }; 