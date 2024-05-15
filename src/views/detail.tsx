import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { releaseApi } from "../api";

export default function Detail(props: { versions: { name: string; path: string }[] }) {
    const { versions } = props;
    const { version: current } = useParams<{ version: string }>();
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!current || !versions.length) {
            return;
        }
        const path = versions.find((item) => item.name === current)?.path;
        path &&
            releaseApi.getReleaseDetail(path).then((v) => {
                if (contentRef.current) {
                    contentRef.current.innerHTML = v.data.content;
                }
            });
    }, [current, versions]);

    return (
        <>
            <div ref={contentRef} className="content"></div>
        </>
    );
}
