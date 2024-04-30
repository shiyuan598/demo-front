import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { releaseApi } from "../api";

export default function Detail(props: {versions:{name:string;path:string}[]}) {
    const {versions} = props;
    const { version: current } = useParams<{ version: string }>();
    const [comment, setComment] = useState();

    useEffect(() => {
        if (!current || !versions.length) {
            return;
        }
        const path = versions.find(item => item.name === current)?.path;
        path && releaseApi.getVersionDetail(path).then((v) => {
            console.info(v);
            v && setComment(v.data);
        });

    }, [current, versions]);

    return (
        <>
            <div>detail</div>
            <p>{JSON.stringify(comment)}</p>
        </>
    );
}
