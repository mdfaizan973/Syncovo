import * as apiClient from "../utils/apiClient";

// POST WORKSPACE FUNCTION
export const postWorkspace = async (workspace: any) => {
    try {
        
        const response = await apiClient.postRequest("/api/workspaces", workspace);
        return response;
    } catch (error) {
        console.error("Error in postWorkspace:", error);
        return error;
    }
}   
// GET ALL WORKSPACES FUNCTION
export const getAllWorkspaces = async () => {
    try {
        const response = await apiClient.getRequest("/api/workspaces");
        return response;
    } catch (error) {
        console.error("Error in getAllWorkspaces:", error);
        return error;
    }
}
// GET SINGLE WORKSPACE FUNCTION
export const getSingleWorkspace = async (id: string) => {
    try {
        const response = await apiClient.getRequest(`/api/workspaces/${id}`);
        return response;
    } catch (error) {
        console.error("Error in getSingleWorkspace:", error);
        return error;
    }
}
// UPDATE WORKSPACE FUNCTION
export const updateWorkspace = async (id: string, workspace: any) => {
    try {
        const response = await apiClient.putRequest(`/api/workspaces/${id}`, workspace);
        return response;
    } catch (error) {
        console.error("Error in updateWorkspace:", error);
        return error;
    }
}
// DELETE WORKSPACE FUNCTION
export const deleteWorkspace = async (id: string) => {
    try {
        const response = await apiClient.deleteRequest(`/api/workspaces/${id}`);
        return response;
    } catch (error) {
        console.error("Error in deleteWorkspace:", error);
        return error;
    }
}