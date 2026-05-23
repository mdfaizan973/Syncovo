import * as apiClient from "../utils/apiClient";

// login function
export const login = async (requestData: any) => {
    // try catch block
    try {
        const response = await apiClient.postRequest("/auth/login", requestData);
        return response;
    } catch (error) {
        console.error("Error in login:", error);
        return error;
    }

}
// register function
export const register = async (requestData: any) => {
    try {
        const response = await apiClient.postRequest("/api/auth/register", requestData);
        return response;
    } catch (error) {
        console.error("Error in register:", error);
        return error;
    }
}
// update user function
export const updateUser = async (user: any) => {
    try {
        const response = await apiClient.putRequest("/auth/update-user", { user });
        return response;
    } catch (error) {
        console.error("Error in updateUser:", error);
        return error;
    }
}
// delete user function
export const deleteUser = async (id: string) => {
    try {
        const response = await apiClient.deleteRequest(`/auth/delete-user/${id}`);
        return response;
    } catch (error) {
        console.error("Error in deleteUser:", error);
        return error;
    }
}
// get user function    
export const getUser = async () => {
    try {
        const response = await apiClient.getRequest("/auth/get-user");
        return response;
    } catch (error) {
        console.error("Error in getUser:", error);
        return error;
    }
}
// get user by id function
export const getUserById = async (id: string) => {
    try {
        const response = await apiClient.getRequest(`/auth/get-user-by-id/${id}`);
        return response;
    } catch (error) {
        console.error("Error in getUserById:", error);
        return error;
    }
}

// verify otp function
export const verifyOtp = async (requestData: any) => {
    try {
        const response = await apiClient.postRequest("/auth/verify-otp", requestData);
        return response.data;
    } catch (error) {
        console.error("Error in verifyOtp:", error);
        return error;
    }
}




