import axios from "axios";
import { toast } from "sonner";
import { errorResponse, getResponseMessage, successResponse } from "./toasUtils";

const apiClient = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
    },
});


/* =========================
   REQUEST INTERCEPTOR
========================= */

apiClient.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

/* =========================
   COMMON RESPONSE HANDLER
========================= */

const handleResponse = (response: any) => {
    console.log(response);
    // EXISTING SUCCESS FUNCTION
    if (response?.data?.success === true) {
        successResponse(response);
    }

    // EXISTING ERROR FUNCTION
    if (response?.data?.success === false) {
        errorResponse(response);
    }

    return {
        success: true,
        data: response?.data?.data || response?.data || response || null,
        message: response?.data?.message || response?.message || "Request successful",
        status: response?.status,
    };
};

/* =========================
   COMMON ERROR HANDLER
========================= */

const handleError = (error: any) => {

    console.error("API ERROR:", error);
    errorResponse(error);

    return {
        success: false,
        data: null,
        message: getResponseMessage(error, "Something went wrong"),
        status: error?.response?.status || 500,
    };
};

/* =========================
   GET REQUEST
========================= */

export const getRequest = async (url: string, params = {}) => {

    try {

        const response = await apiClient.get(url, {
            params,
        });

        return handleResponse(response);

    } catch (error) {

        return handleError(error);
    }
};

/* =========================
   POST REQUEST
========================= */

export const postRequest = async (url: string, data = {}) => {

    try {

        const response = await apiClient.post(url, data);
        return handleResponse(response);

    } catch (error) {
        return handleError(error);
    }
};

/* =========================
   PUT REQUEST
========================= */

export const putRequest = async (url: string, data = {}) => {

    try {

        const response = await apiClient.put(url, data);

        return handleResponse(response);

    } catch (error) {

        return handleError(error);
    }
};

/* =========================
   DELETE REQUEST
========================= */

export const deleteRequest = async (url: string) => {

    try {

        const response = await apiClient.delete(url);

        return handleResponse(response);

    } catch (error) {

        return handleError(error);
    }
};

