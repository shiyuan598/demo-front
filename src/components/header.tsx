import React, { useState, useEffect } from "react";
import { Popover, message } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import { ReactComponent as LogoIcon } from "../assets/logo.svg";
import { ReactComponent as WhatsNewIcon } from "../assets/whatsnew.svg";
import { ReactComponent as HelpIcon } from "../assets/help.svg";
import { ReactComponent as FeedbackIcon } from "../assets/feedback.svg";
import { authApi } from "../api";
import { getUserInfo, isLogin, setUserInfo } from "../utils/auth";
import "./header.scss";

export default function Header() {
    const location = useLocation();
    const history = useHistory();
    const [current, setCurrent] = useState("");
    const menuItems = [
        {
            label: "What`s New",
            key: "/release",
            icon: <WhatsNewIcon className="svg-icon" />
        },
        {
            label: "Help",
            key: "/help",
            icon: <HelpIcon className="svg-icon" />,
            disabled: true
        },
        {
            label: "Feedback",
            key: "/feedback",
            icon: <FeedbackIcon className="svg-icon" />
        }
    ];

    const userInfo = getUserInfo();

    useEffect(() => {
        let pathName = location.pathname.startsWith("/release") ? "/release" : location.pathname;
        setCurrent(pathName);
    }, [location]);

    const onMenuClick = (key: string) => {
        history.push(key);
    };

    const logout = () => {
        const token = userInfo?.token;
        authApi.logout(token).then((v) => {
            if (v.code === 0) {
                setUserInfo();
                history.push("/login");
            } else {
                message.error("用户名或密码错误！");
            }
        });
    };
    const toLogin = () => {
        history.push("/login");
    };

    return (
        <div className="header">
            <h4 className="title" onDoubleClick={() => toLogin()}>
                {" "}
                <LogoIcon className="logo" /> XwayOS
            </h4>
            <ul className="menu">
                {menuItems.map((item) => (
                    <li
                        onClick={() => {
                            !item.disabled && onMenuClick(item.key);
                        }}
                        key={item.key}
                        className={`menu-item ${current === item.key ? "menu-item__activated" : ""} ${
                            item.disabled ? "menu-item__disabled" : ""
                        }`}>
                        {item.icon} {item.label}
                    </li>
                ))}
            </ul>
            {isLogin() && (
                <Popover
                    placement="leftTop"
                    content={
                        <div className="userInfo">
                            <div>{userInfo.username}</div>
                            <div className="logout" onClick={logout}>
                                注销
                            </div>
                        </div>
                    }
                    trigger="hover">
                    <span className="account">
                        <span className="portrait"></span>
                        <span className="name">{userInfo.username}</span>
                    </span>
                </Popover>
            )}
        </div>
    );
}
