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