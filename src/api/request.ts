import { setUserInfo, getAuthorization } from "../utils/auth";
export const checkResponse = (response: Response) => {
    if (response.status === 500) {
        return Promise.reject("系统出错，请联系管理员！");
    }
    if (response.status === 504) {
        return Promise.reject("系统繁忙，请稍后重试！");
    }
    if (response.status === 401) {
        setUserInfo()
        window.location.href = "/login";
        return Promise.reject("您没有权限或未登录！");
    }

    return Promise.resolve();
};

const request = (
    method: string,
    url: string,
    params?: { [propName: string]: string | number } | FormData,
    isJson: boolean = true
) => {
    let body = undefined;
    if (["POST", "PUT", "DELETE"].includes(method) && params) {
        body = isJson ? JSON.stringify(params) : (params as FormData);
    }
    const fetchOptions: RequestInit = {
        method,
        headers: { ...(isJson ? { "Content-Type": "application/json" } : undefined), ...getAuthorization() },
        body
    };

    if (method === "GET" && params && !(params instanceof FormData)) {
        const paramStr = Object.keys(params)
            .map((key) => `${key}=${params[key]}`)
            .join("&");
        url = `${url}?${paramStr}`;
    }

    return fetch(url, fetchOptions).then((response) =>
        checkResponse(response).then(
            () => {
                return response.json();
            },
            (msg) => {
                return Promise.resolve({ code: 1, msg });
            }
        )
    );
};

const requestBlob = (url: string) => {
    return fetch(url).then((response) =>
        checkResponse(response).then(
            () => {
                return response.blob();
            },
            (msg) => {
                return Promise.resolve({ code: 1, msg });
            }
        )
    );
};

export const get = (url: string, params?: { [propName: string]: string | number }) => {
    return request("GET", url, params);
};

export const post = (url: string, params?: { [propName: string]: string | number } | FormData) => {
    return request("POST", url, params, !(params instanceof FormData));
};

export const put = (url: string, params?: { [propName: string]: string | number } | FormData) => {
    return request("PUT", url, params, !(params instanceof FormData));
};

export const del = (url: string, params?: { [propName: string]: string | number }) => {
    return request("DELETE", url, params);
};

export const getBlob = (url: string) => {
    return requestBlob(url);
};
