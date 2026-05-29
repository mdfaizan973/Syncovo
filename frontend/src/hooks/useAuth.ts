
import { useState } from "react";
import * as authService from "../services/auth";

export const useAuth = () => {
    const [user, setUser] = useState<any | null>([]);
    const [singleUser, setSingleUser] = useState<any | null>({});
    const [authLoading, setAuthLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // register function
    const register = async (requestData: any) => {
        setAuthLoading(true);
        try {
            const response = await authService.register(requestData);
            return response;
        } catch (error) {
            setError(error.message);
        } finally {
            setAuthLoading(false);
        }
    }

    // login function
    const login = async (requestData: any) => {
        setAuthLoading(true);
        try {
            const response = await authService.login(requestData);
            return response;
        } catch (error) {
            setError(error.message);
        } finally {
            setAuthLoading(false);
        }
    }

    // verify otp function
    const verifyOtp = async (otp: any) => {
        setAuthLoading(true);
        try {
            const response = await authService.verifyOtp(otp);
            return response;
        } catch (error) {
            setError(error.message);
        } finally {
            setAuthLoading(false);
        }
    }
    // update user function
    const updateUser = async (user: any) => {
        setAuthLoading(true);
        try {
            const response = await authService.updateUser({ user });
            return response;
        } catch (error) {
            setError(error.message);
        } finally {
            setAuthLoading(false);
        }
    }
    // delete user function
    const deleteUser = async (id: string) => {
        setAuthLoading(true);
        try {
            const response = await authService.deleteUser(id);
            return response;
        } catch (error) {
            setError(error.message);
        }
    }
    // get user function
    const getUser = async () => {
        setAuthLoading(true);
        try {
            const response = await authService.getUser();
            setUser(response?.data ?? []);
        } catch (error) {
            setError(error.message);
        } finally {
            setAuthLoading(false);
        }
    }
    // get user by id function
    const getUserById = async (id: string) => {
        setAuthLoading(true);
        try {
            const response = await authService.getUserById(id);
            setSingleUser(response?.data ?? {});
        } catch (error) {
            setError(error.message);
        } finally {
            setAuthLoading(false);
        }
    }

    // get users by email function
    const getUsersByEmail = async (email: string) => {
        setAuthLoading(true);
        try {
            const response = await authService.getUsersByEmail(email);
            return response;
        } catch (error) {
            setError(error.message);
        } finally {
            setAuthLoading(false);
        }
    }

    return {
        authLoading,
        error,
        user,
        singleUser,
        register,
        login,
        verifyOtp,
        updateUser,
        deleteUser,
        getUser,
        getUserById,
        getUsersByEmail
    };
}
