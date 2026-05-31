import { useEffect, useState } from "react";
import * as userInfoService from "../services/userInfo";

export const useUserInfo = (userId: string) => {
    const [userInfo, setUserInfo] = useState<any>(null);
    const [userInfoLoading, setUserInfoLoading] = useState<boolean>(false);
    const [userInfoError, setUserInfoError] = useState<any>(null);

    // GET ALL TABLES FOR USER
    const getAllTablesForUser = async (userId: string) => {
        setUserInfoLoading(true);
        try {
            const response = await userInfoService.getAllTablesForUser(userId);
            console.log(response);
            return response;
        }
        catch (error) {
            console.error("Error in getAllTablesForUser:", error);
            return error;
        }
        finally {
            setUserInfoLoading(false);
        }
    }

    useEffect(() => {
        getAllTablesForUser(userId);
    }, [userId]);

    return {
        userInfo,
        userInfoLoading,
        userInfoError,
        getAllTablesForUser,
    }

}