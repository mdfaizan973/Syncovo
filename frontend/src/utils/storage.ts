export const setUserInfoStorage = (userData: any) => {
    localStorage.setItem("userInfo", JSON.stringify(userData));
}

export const getUserInfoStorage = () => {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
}