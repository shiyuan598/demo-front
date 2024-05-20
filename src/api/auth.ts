import { post, put } from "./request";

const baseUrl = process.env.REACT_APP_API_URL + "/auth";

function login(data: { username: string; password: string }) {
    return post(`${baseUrl}/login`, data);
}

function logout(token: string) {
    return post(`${baseUrl}/logout`, { token });
}

function createUser(data: { username: string; password: string }) {
    return post(`${baseUrl}/users`, data);
}

function resetPassword(data: { username: string; currentPassword: string; newPassword: string }) {
    return put(`${baseUrl}/users`, data);
}

export default {
    login,
    logout,
    createUser,
    resetPassword,
};
