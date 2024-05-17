import React, { useState, useEffect } from "react";
import { Dayjs } from "dayjs";
import { Select, DatePicker, Button, Spin } from "antd";
import { releaseApi, feedbackApi } from "../api";
import AddIssue from "../components/addIssue";
import IssueReply from "../components/issueReply";
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
    const [curVersion, setCurVersion] = useState<string>("");
    const [dateSpan, setDateSpan] = useState<[Dayjs, Dayjs] | null>();
    const [versions, setVersions] = useState<{ name: string; path: string }[]>([]);
    const [updateFlag, setUdateFlag] = useState(0);
    const [addIssueVisible, setAddIssueVisible] = useState(false);
    
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        releaseApi.getReleaseList().then((v) => {
            console.info(v);
            v && setVersions(v.data);
        });
    }, []);

    useEffect(() => {
        setLoading(true);
        let start = "";
        let end = "";
        if (Array.isArray(dateSpan) && dateSpan.length === 2) {
            [start, end] = dateSpan.map((item) => item.format("YYYY-MM-DD"));
        }
        feedbackApi
            .getIssueList({
                version: curVersion,
                start,
                end
            })
            .then((v) => {
                console.info(v);
                v && setIssues(v.data);
            })
            .finally(() => setLoading(false));
    }, [curVersion, dateSpan, updateFlag]);

    const versionChange = (value: string) => {
        setCurVersion(value || "");
    };
    const dateChange = (dates: [Dayjs | null, Dayjs | null] | null, dateStrings: [string, string]) => {
        if (dates && Array.isArray(dates) && dates.length === 2) {
            setDateSpan(dates as [Dayjs, Dayjs]);
        } else {
            setDateSpan(null);
        }
    };

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
                <Button type="primary" onClick={() => setAddIssueVisible(true)}>
                    反馈问题
                </Button>
            </div>
            <Spin spinning={loading}>
                {issues.map((item) => (
                    <IssueReply key={item.issueId} issue={item} setUdateFlag={setUdateFlag}></IssueReply>
                ))}
            </Spin>

            <AddIssue modalShow={addIssueVisible} setModalShow={setAddIssueVisible} setUpdateFlag={setUdateFlag} />
        </div>
    );
}
