import * as apiClient from "../utils/apiClient";

// POST NOTE FUNCTION
export const postNote = async (note: any) => {
    try {
        const response = await apiClient.postRequest("/api/notes", note);
        return response;
    } catch (error) {
        console.error("Error in postNote:", error);
        return error;
    }

}
// GET ALL NOTES FUNCTION
export const getAllNotes = async () => {
    try {
        const response = await apiClient.getRequest("/api/notes");
        return response;
    } catch (error) {
        console.error("Error in getAllNotes:", error);
        return error;
    }

    
}
// GET SINGLE NOTE FUNCTION
export const getSingleNote = async (id: string) => {
    try {
        const response = await apiClient.getRequest(`/api/notes/${id}`);
        return response;
    } catch (error) {
        console.error("Error in getSingleNote:", error);
        return error;
    }

}
// UPDATE NOTE FUNCTION
export const updateNote = async (id: string, note: any) => {
    try { 
        const response = await apiClient.putRequest(`/api/notes/${id}`, note);
        return response;
    } catch (error) {
        console.error("Error in updateNote:", error);
        return error;
    }
    
}
// DELETE NOTE FUNCTION
export const deleteNote = async (id: string) => {
    try {
        const response = await apiClient.deleteRequest(`/api/notes/${id}`);
        return response;
    } catch (error) {
        console.error("Error in deleteNote:", error);
        return error;
    }
}

