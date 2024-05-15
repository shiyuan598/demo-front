import { get } from "./request";
const baseUrl = process.env.REACT_APP_API_URL;

function getReleaseList() {
    return get(`${baseUrl}/feature/releases`);
}

function getReleaseDetail(filePath: string) {
    return get(`${baseUrl}/feature/releases/info`, { filePath });
}

export default {
    getReleaseList,
    getReleaseDetail
};
