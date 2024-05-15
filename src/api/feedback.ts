import { get, post, put, del, getBlob } from "./request";
const baseUrl = process.env.REACT_APP_API_URL + "/feedback";

function getIssueList(params?: { version?: string | number; start?: string; end?: string; limit?: number; offset?: number }) {
    return get(`${baseUrl}/issues`, params);
}

function getIssueById(id: number) {
    return get(`${baseUrl}/issues/${id}`);
}

function getIssueAttachmentById(id: number) {
    return getBlob(`${baseUrl}/issues/${id}/attachment`);
}

function addIssue(data: { version?: string; title?: string; content: string; attachment?: File }) {
    const formData = new FormData();
    data.version && formData.append("version", data.version);
    data.title && formData.append("title", data.title);
    formData.append("content", data.content);
    data.attachment && formData.append("attachment", data.attachment);
    return post(`${baseUrl}/issues`, formData);
}

function updateIssue(id: number, data: { version?: string; title?: string; content?: string; attachment?: File }) {
    const formData = new FormData();
    data.version && formData.append("version", data.version);
    data.title && formData.append("title", data.title);
    data.content && formData.append("content", data.content);
    data.attachment && formData.append("attachment", data.attachment);
    return put(`${baseUrl}/issues/${id}`, formData);
}

function deleteIssue(id: number) {
    return del(`${baseUrl}/issues/${id}`);
}

function addReply(data: { issueId: number; content?: string; attachment?: File }) {
    const formData = new FormData();
    formData.append("issueId", data.issueId.toString());
    data.content && formData.append("content", data.content);
    data.attachment && formData.append("attachment", data.attachment);
    return post(`${baseUrl}/replies`, formData);
}

function updateReply(id: number, data: { content?: string; attachment?: File }) {
    const formData = new FormData();
    data.content && formData.append("content", data.content);
    data.attachment && formData.append("attachment", data.attachment);
    return put(`${baseUrl}/replies/${id}`, formData);
}

function deleteReply(id: number) {
    return del(`${baseUrl}/replies/${id}`);
}

function getReplyAttachmentById(id: number) {
    return getBlob(`${baseUrl}/replies/${id}/attachment`);
}

export default {
    getIssueList,
    getIssueById,
    getIssueAttachmentById,
    addIssue,
    updateIssue,
    deleteIssue,
    addReply,
    updateReply,
    deleteReply,
    getReplyAttachmentById
};
