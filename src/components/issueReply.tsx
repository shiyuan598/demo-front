import React, { useState } from "react";
import { Image, Space, Modal, Empty } from "antd";
import { MessageOutlined, DeleteOutlined, FileImageOutlined } from "@ant-design/icons";
import IconIssue from "../assets/issue.png";
import IconReply from "../assets/reply.png";
import showDeleteConfirm from "./deleteConfirm";
import AddReply from "./addReply";
import { feedbackApi } from "../api";
import "./issue.scss";
import { isLogin } from "../utils/auth";

interface Issue {
    issueId: number;
    issueVersion: string;
    issueTitle: string;
    issueContent: string;
    issueFilename: string;
    issueCreatetime: string;
    issueState: string;
    replyId: number;
    replyIssueId: number;
    replyContent: string;
    replyFilename: string;
    replyCreatetime: string;
}

export default function IssueReply(props: { issue: Issue; setUdateFlag: Function }) {
    const {
        issueId,
        issueVersion,
        issueTitle,
        issueContent,
        issueFilename,
        issueCreatetime,
        issueState,
        replyId,
        replyIssueId,
        replyContent,
        replyFilename,
        replyCreatetime
    } = props.issue;
    const setUdateFlag = props.setUdateFlag;

    const [imgData, setImgData] = useState("");
    const [imgModalVisible, setImgModalVisible] = useState(false);
    const [addReplyVisible, setAddReplyVisible] = useState(false);

    const IconText = ({ icon, text, onClick }: { icon: React.FC; text: string; onClick: Function }) => (
        <Space
            className="icon-text"
            onClick={() => {
                onClick();
            }}>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    const deleteIssue = (id: number) => {
        showDeleteConfirm({
            title: "删除",
            onOk: () => {
                feedbackApi.deleteIssue(id).then(() => {
                    setUdateFlag(Date.now());
                });
            }
        });
    };
    const deleteReply = (id: number) => {
        showDeleteConfirm({
            title: "删除",
            onOk: () => {
                feedbackApi.deleteReply(id).then(() => {
                    setUdateFlag(Date.now());
                });
            }
        });
    };
    const showIssueAttachment = (id: number) => {
        feedbackApi.getIssueAttachmentById(id).then((res) => {
            if (res instanceof Blob) {
                let reader = new FileReader();
                reader.readAsDataURL(res);
                reader.onload = (e) => {
                    let url = e?.target?.result;
                    setImgData(url as string);
                    setImgModalVisible(true);
                };
            }
        });
    };
    const showReplyAttachment = (id: number) => {
        feedbackApi.getReplyAttachmentById(id).then((res) => {
            if (res instanceof Blob) {
                let reader = new FileReader();
                reader.readAsDataURL(res);
                reader.onload = (e) => {
                    let url = e?.target?.result;
                    setImgData(url as string);
                    setImgModalVisible(true);
                };
            }
        });
    };

    const closeCamera = () => {
        setImgModalVisible(false);
        setImgData("");
    };

    return (
        <div className="issue-reply-item">
            <div className="issue">
                <div className="content">
                    <div className="top">
                        <Image height={20} src={IconIssue} />
                        <div className="title">
                            <div className="text">{issueTitle}</div>
                            <span>{issueVersion}</span>
                            <span>{issueCreatetime}</span>
                        </div>
                    </div>
                    <p className="body">{issueContent}</p>
                </div>
                <div className="actions">
                    {isLogin() && <IconText
                        onClick={() => {
                            deleteIssue(issueId);
                        }}
                        icon={DeleteOutlined}
                        text="删除"
                        key="list-vertical-star-o"
                    />}
                    {!replyContent && isLogin() && (
                        <IconText
                            onClick={() => {
                                setAddReplyVisible(true);
                            }}
                            icon={MessageOutlined}
                            text="回复"
                            key="list-vertical-message"
                        />
                    )}
                    {issueFilename && (
                        <IconText
                            onClick={() => {
                                showIssueAttachment(issueId);
                            }}
                            icon={FileImageOutlined}
                            text="附件"
                            key="list-vertical-like-o"
                        />
                    )}
                </div>
            </div>
            {replyContent && (
                <div className="reply">
                    <div className="content">
                        <div className="top">
                            <Image height={20} src={IconReply} />
                            <div className="title">
                                <div className="text">{replyContent}</div>
                                <span>{replyCreatetime}</span>
                            </div>
                        </div>
                    </div>
                    <div className="actions">
                        {isLogin() && <IconText
                            onClick={() => {
                                deleteReply(replyId);
                            }}
                            icon={DeleteOutlined}
                            text="删除"
                            key="list-vertical-star-o"
                        />}
                        {replyFilename && (
                            <IconText
                                onClick={() => {
                                    showReplyAttachment(replyId);
                                }}
                                icon={FileImageOutlined}
                                text="附件"
                                key="list-vertical-like-o"
                            />
                        )}
                    </div>
                </div>
            )}
            <Modal
                width={"60%"}
                style={{ textAlign: "center" }}
                title="查看附件"
                open={imgModalVisible}
                footer={null}
                onCancel={closeCamera}>
                {imgData ? <img width={"100%"} height={"100%"} src={imgData} alt="" /> : <Empty />}
            </Modal>
            <AddReply
                issueId={issueId}
                modalShow={addReplyVisible}
                setModalShow={setAddReplyVisible}
                setUpdateFlag={setUdateFlag}
            />
        </div>
    );
}
