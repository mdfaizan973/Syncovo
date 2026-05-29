import * as apiClient from "../utils/apiClient";


// CREATE TABLE FUNCTION
export const createTable = async (payload: any) => {
    try {
        const response = await apiClient.postRequest('/api/tables', payload);
        return response;

    } catch (error) {
        console.error("Error in postWorkspace:", error);
        return error;
    }
}
// GET ALL TABLES FUNCTION
export const getAllTables = async (workspaceId: any) => {
    try {
        const response = await apiClient.getRequest(`/api/tables/workspace/${workspaceId}`);
        return response;

    } catch (error) {
        console.error("Error in postWorkspace:", error);
        return error;
    }
}
// GET SINGLE TABLE FUNCTION
export const getSingleTable = async (id: string) => {
    try {
        const response = await apiClient.getRequest(`/api/tables/${id}`);
        return response;

    } catch (error) {
        console.error("Error in postWorkspace:", error);
        return error;
    }
}
// UPDATE TABLE FUNCTION
export const updateTable = async (id: string, payload: any) => {
    try {
        const response = await apiClient.putRequest(`/api/tables/${id}`, payload);
        return response;

    } catch (error) {
        console.error("Error in postWorkspace:", error);
        return error;
    }
}
// DELETE TABLE FUNCTION
export const deleteTable = async (id: string) => {
    try {
        const response = await apiClient.deleteRequest(`/api/tables/${id}`);
        return response;

    } catch (error) {
        console.error("Error in postWorkspace:", error);
        return error;
    }
}   