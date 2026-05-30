import { getUserInfoByKey } from "./storage";

export const unpackToken = (token: string) => {
    const payload = JSON.parse(atob(token.split('.')[1]));

    return {
        ...payload,
        token: token,
    };
}

export const logOutUser = () => {
    localStorage.removeItem("userInfo");
}

export const getUserInitials = (text: any) => {
    return text?.charAt(0)?.toUpperCase() ?? "-";
}

export const formatDate = (date: string = "") => {
    if (!date) return "";
    
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function isNonViewer(viewers: { id: string }[]): boolean {
    const userId = getUserInfoByKey("id") ?? ""
    return !viewers.some((user) => user.id === userId);
}
