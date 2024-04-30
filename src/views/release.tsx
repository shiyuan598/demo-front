import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import Detail from "./detail";
import { releaseApi } from "../api";
import "../style/index.scss";

export default function Release() {
    const location = useLocation();
    const history = useHistory();
    const [versions, setVersions] = useState<{ name: string; path: string }[]>([]);
    const [current, setCurrent] = useState(location.pathname.split("/release/detail/")[1]);

    useEffect(() => {}, []);

    useEffect(() => {
        releaseApi.getVersionList().then((v) => {
            console.info(v);
            v && setVersions(v.data);
        });
    }, []);

    const onClick = (key: string) => {
        setCurrent(key);
        history.push(`/release/detail/${key}`);
    };

    return (
        <div className="release-page">
            <div className="aside">
                <h4 className="title">Versions</h4>
                <ul className="versions">
                    {versions.map((item) => (
                        <li
                            onClick={() => {
                                onClick(item.name);
                            }}
                            key={item.path}
                            className={`item ${current === item.name ? "item__activated" : ""}`}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="detail">
                <Switch>
                    <Route path="/release/detail/:version" render={() => <Detail versions={versions} />} />
                    <Redirect from="/release" to="/release/detail" exact></Redirect>
                </Switch>
            </div>
        </div>
    );
}