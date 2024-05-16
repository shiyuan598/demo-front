import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import { Image, Input, Select, DatePicker, List, Spin, Button, Space, Tag } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined, DeleteOutlined, FileImageOutlined } from "@ant-design/icons";
import IconIssue from "../assets/issue.png";
import IconReply from "../assets/reply.png";
import { ReactComponent as IconVersion } from "../assets/version.svg";
import { ReactComponent as IconDate } from "../assets/date.svg";
import { ReactComponent as IconAttachment } from "../assets/attachment.svg";
import { releaseApi, feedbackApi } from "../api";
const { RangePicker } = DatePicker;
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

export default function feedback() {
    const [curVersion, setCurVersion] = useState<string>();
    const [dateSpan, setDateSpan] = useState<[Dayjs, Dayjs] | null>();
    const [versions, setVersions] = useState<{ name: string; path: string }[]>([]);
    const [issues, setIssues] = useState<Issue[]>([]);
    useEffect(() => {
        releaseApi.getReleaseList().then((v) => {
            console.info(v);
            v && setVersions(v.data);
        });
    }, []);

    useEffect(() => {
        feedbackApi.getIssueList().then((v) => {
            console.info(v);
            v && setIssues(v.data);
        });
    }, []);

    () => {
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

        // feedbackApi.getReplyAttachmentById(13).then((res) => {
        //     if (res instanceof Blob) {
        //         let reader = new FileReader();
        //         reader.readAsDataURL(res);
        //         reader.onload = (e) => {
        //             let url = e?.target?.result;
        //             setImgData(url as string);
        //         };
        //     }
        // });
    };

    const [imgData, setImgData] = useState("");

    const versionChange = (value: string) => {
        setCurVersion(value);
    };
    const dateChange = (dates: [Dayjs | null, Dayjs | null] | null, dateStrings: [string, string]) => {
        if (dates && Array.isArray(dates) && dates.length === 2) {
            setDateSpan(dates as [Dayjs, Dayjs]);
        } else {
            setDateSpan(null);
        }
    };

    const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    return (
        <div className="feedback-page">
            <div className="banner">
                <div className="option-container">
                    <div className="option">
                        <span className="label">版本号</span>
                        <Select
                            style={{ width: "272px" }}
                            allowClear
                            value={curVersion}
                            placeholder="请选择版本号"
                            onChange={versionChange}
                            options={versions.map((item) => ({ value: item.name, label: item.name }))}></Select>
                    </div>
                    <div className="option">
                        <span className="label">日期范围</span>
                        <RangePicker onChange={dateChange} />
                    </div>
                </div>
                <Button type="primary">反馈问题</Button>
            </div>

            <List
                itemLayout="vertical"
                size="large"
                dataSource={issues}
                renderItem={(item) => (
                    <>
                    <List.Item
                        key={item.issueId}
                        actions={[
                            <IconText icon={DeleteOutlined} text="删除" key="list-vertical-star-o" />,
                            <IconText icon={MessageOutlined} text="回复" key="list-vertical-message" />,
                            <IconText icon={FileImageOutlined} text="附件" key="list-vertical-like-o" />
                        ]}>
                        <List.Item.Meta
                            avatar={<Image height={20} src={IconIssue} />}
                            title={item.issueTitle}
                        />
                        <p>{item.issueContent}</p>
                        <Tag>{item.issueVersion}</Tag>
                        <Tag>{item.issueCreatetime}</Tag>
                    </List.Item>
                    <List.Item
                        key={item.replyId}
                        actions={[
                            <IconText icon={DeleteOutlined} text="删除" key="list-vertical-star-o" />,
                            <IconText icon={FileImageOutlined} text="附件" key="list-vertical-like-o" />
                        ]}>
                        <List.Item.Meta
                            avatar={<Image height={20} src={IconReply} />}
                        />
                        <p>{item.replyContent}</p>
                        <Tag>{item.issueCreatetime}</Tag>
                    </List.Item>
                    </>
                )}></List>
            <img width={"100%"} height={"100%"} src={imgData} alt="" />
        </div>
    );
}
