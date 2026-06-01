const { getUserInfoQuery, getTotalNotesQuery, getTotalWorkspacesQuery, getTotalTasksAssignedToUserQuery } = require("./usersInfo.query");

const getUserInfoService = async (userId) => {
    const tables = await getUserInfoQuery(userId);
    const totalNotes = await getTotalNotesQuery(userId);
    const totalWorkspaces = await getTotalWorkspacesQuery(userId);
    const totalTasksAssignedToUser = await getTotalTasksAssignedToUserQuery(userId);

    return {
        message: 'User info fetched successfully',
        tables,
        totalNotes,
        totalWorkspaces,
        totalTasksAssignedToUser
    };
};

module.exports = {
    getUserInfoService,
    getTotalNotesQuery,
    getTotalWorkspacesQuery,
    getTotalTasksAssignedToUserQuery
}; 