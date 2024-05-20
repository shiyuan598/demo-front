import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";
dayjs.locale("zh-cn");

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Router>
        <ConfigProvider locale={zhCN}>
            <App></App>
        </ConfigProvider>
    </Router>
);
