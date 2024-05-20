export const getAuthorization = () => {
    let Authorization = "";
    try {
        Authorization = getUserInfo()?.token;
    } catch (error) {
        Authorization = "";
    }

    if (Authorization) {
        return { Authorization };
    } else {
        return undefined;
    }
};

export const isLogin = () => {
    return !!getUserInfo()?.token;
};

export const getUserInfo = () => {
    let data = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(data as string);
    return userInfo || {};
};

export const setUserInfo = (data?: object | null) => {
    localStorage.setItem("userInfo", data ? JSON.stringify(data) : "{}");
};
