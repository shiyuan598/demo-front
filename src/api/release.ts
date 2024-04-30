import { get } from "./fetchTool";
const baseUrl = process.env.REACT_APP_API_URL;

function getVersionList() {
    return get(baseUrl + "/release/list");
}

function getVersionDetail(filePath: string) {
    return get(baseUrl + "/release/info", { filePath });
}

export default {
    getVersionList,
    getVersionDetail
};
