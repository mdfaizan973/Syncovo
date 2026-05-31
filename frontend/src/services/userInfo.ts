import * as apiClient from "../utils/apiClient";

// GET ALL TABLES FOR USER FUNCTION
export const getAllTablesForUser = async (userId: string) => {
    try {
        const response = await apiClient.getRequest(`/api/user-info/${userId}/info`);
        return response;
    }
    catch (error) {
        console.error("Error in getUserInfo:", error);
        return error;
    }
}
