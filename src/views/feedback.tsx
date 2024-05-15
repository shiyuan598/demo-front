import React, { useState } from "react";
import feedbackApi from "../api/feedback";

export default function feedback() {
    feedbackApi.getIssueList({ version: 1.1, start: "2024-05-14", end: "2024-05-14" });
    feedbackApi.getIssueById(13);
    // feedbackApi.getIssueAttachmentById(15).then((res) => {
    //     if (res instanceof Blob) {
    //         let reader = new FileReader();
    //         reader.readAsDataURL(res);
    //         reader.onload = (e) => {
    //             let url = e?.target?.result;
    //             setImgData(url as string);
    //         };
    //     }
    // });
    feedbackApi.updateIssue(20, { title: "hhahd" });
    feedbackApi.deleteIssue(27);

    // feedbackApi.addReply({ issueId: 20, content: "fssafaf" });
    feedbackApi.updateReply(19, { content: "hello" });
    feedbackApi.deleteReply(18);

    feedbackApi.getReplyAttachmentById(13).then((res) => {
        if (res instanceof Blob) {
            let reader = new FileReader();
            reader.readAsDataURL(res);
            reader.onload = (e) => {
                let url = e?.target?.result;
                setImgData(url as string);
            };
        }
    });

    const [imgData, setImgData] = useState("");

    return (
        <div>
            feedback
            <img width={"100%"} height={"100%"} src={imgData} alt="" />
        </div>
    );
}
