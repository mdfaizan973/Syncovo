import { toast } from "sonner";

export const getResponseMessage = (payload: any, fallback: string) =>
    payload?.response?.data?.message ||
    payload?.data?.message ||
    payload?.message ||
    fallback;

    
export const successResponse = (response: any) => {
    toast.success(getResponseMessage(response, "Request successful"));
}

export const errorResponse = (error: any) => {
    toast.error(getResponseMessage(error, "Something went wrong"));
}
