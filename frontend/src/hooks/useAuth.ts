
import { useState } from "react";
import * as authService from "../services/auth";

export const useAuth = () => {
    const [user, setUser] = useState<any | null>([]);
    const [singleUser, setSingleUser] = useState<any | null>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // register function
    const register = async (requestData: any) => {
        setLoading(true);
        try {
            const response = await authService.register(requestData);
            return response;
        } catch (error) {
            setError(error.message);
        }
    }

    // login function
    const login = async (requestData: any) => {
        setLoading(true);
        try {
            const response = await authService.login(requestData);
            return response;
        } catch (error) {
            setError(error.message);
        }
    }

    // verify otp function
    const verifyOtp = async (otp: string) => {
        setLoading(true);
        try {
            const response = await authService.verifyOtp({ otp });
            return response;
        } catch (error) {
            setError(error.message);
        }
    }
    // update user function
    const updateUser = async (user: any) => {
        setLoading(true);
        try {
            const response = await authService.updateUser({ user });
            return response;
        } catch (error) {
            setError(error.message);
        }
    }
    // delete user function
    const deleteUser = async (id: string) => {
        setLoading(true);
        try {
            const response = await authService.deleteUser(id);
            return response;
        } catch (error) {
            setError(error.message);
        }
    }
    // get user function
    const getUser = async () => {
        setLoading(true);
        try {
            const response = await authService.getUser();
            setUser(response?.data ?? []);
        } catch (error) {
            setError(error.message);
        }
    }
    // get user by id function
    const getUserById = async (id: string) => {
        setLoading(true);
        try {
            const response = await authService.getUserById(id);
            setSingleUser(response?.data ?? {});
        } catch (error) {
            setError(error.message);
        }
    }


    return {
        loading,
        error,
        user,
        singleUser,
        register,
        login,
        verifyOtp,
        updateUser,
        deleteUser,
        getUser,
        getUserById
    };
}
