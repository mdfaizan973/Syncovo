import * as apiClient from "../utils/apiClient";

// POST   /api/table-rows                    // Create Row
export const createTableRow = async (payload: any) => {
    try {
        const response = await apiClient.postRequest('/api/table-rows', payload);
        return response;

    } catch (error) {
        console.error("Error:", error);
        return error;
    }
}
// GET    /api/table-rows/table/:tableId     // Get All Rows Of A Table
export const getAllTableRows = async (tableId: string) => {
    try {
        const response = await apiClient.getRequest(`/api/table-rows?table_id=${tableId}`);
        return response;
    } catch (error) {
        console.error("Error:", error);
        return error;
    }
}   
// GET    /api/table-rows/:rowId             // Get Single Row
export const getSingleTableRow = async (rowId: string) => {
    try {
        const response = await apiClient.getRequest(`/api/table-rows/${rowId}`);
        return response;
    } catch (error) {
        console.error("Error:", error);
        return error;
    }
}
// PUT    /api/table-rows/:rowId             // Update Row
export const updateTableRow = async (rowId: string, payload: any) => {
    try {
        const response = await apiClient.putRequest(`/api/table-rows/${rowId}`, payload);
        return response;
    } catch (error) {
        console.error("Error:", error);
        return error;
    }
}
// DELETE /api/table-rows/:rowId             // Delete Row
export const deleteTableRow = async (rowId: string) => {
    try {
        const response = await apiClient.deleteRequest(`/api/table-rows/${rowId}`);
        return response;
    } catch (error) {
        console.error("Error:", error);
        return error;
    }
}