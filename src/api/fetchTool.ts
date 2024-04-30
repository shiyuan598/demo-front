const checkResponse = (response: Response) => {
    if (response.status === 500) {
        return Promise.reject("系统出错，请联系管理员！");
    }
    if (response.status === 504) {
        return Promise.reject("系统繁忙，请稍后重试！");
    }

    return Promise.resolve();
};

export const get = (url: string, params?: { [propName: string]: string | number }) => {
    if (params) {
        const paramStr = Object.keys(params)
            .map((key) => `${key}=${params[key]}`)
            .join("&");
        url = `${url}?${paramStr}`;
    }
    return fetch(url).then((v) => {
        return checkResponse(v).then(
            () => {
                return v.json();
            },
            (msg) => {
                return Promise.resolve({ code: 1, msg });
            }
        );
    });
};

export const post = (url: string, params?: { [propName: string]: string | number }) => {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    }).then((v) => {
        return checkResponse(v).then(
            () => {
                return v.json();
            },
            (msg) => {
                return Promise.resolve({ code: 1, msg });
            }
        );
    });
};
