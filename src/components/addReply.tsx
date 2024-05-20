import { Modal, Form, Input, Button, message, Spin, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import React, { useState, forwardRef } from "react";
import { feedbackApi } from "../api";

const { TextArea } = Input;

const UploadButton = forwardRef<HTMLButtonElement, any>((props, ref) => (
    <Button block icon={<UploadOutlined />} ref={ref}>
        上传图片
    </Button>
));

const AddReply = (props: { issueId: number; modalShow: boolean; setModalShow: Function; setUpdateFlag: Function }) => {
    const { issueId, modalShow, setModalShow, setUpdateFlag } = props;
    const [loading, setLoading] = useState(false);

    const uploadProps: UploadProps = {
        maxCount: 1,
        beforeUpload: (file) => {
            const isSupportedFormat = ["image/png", "image/jpeg", "image/jpg"].includes(file.type);
            if (!isSupportedFormat) {
                message.error(`${file.name} 不是 png, jpg, 或 jpeg`);
                return Upload.LIST_IGNORE;
            }

            const isLt3M = file.size / 1024 / 1024 < 3;
            if (!isLt3M) {
                message.error("图片不能大于 3MB");
                return Upload.LIST_IGNORE;
            }

            return false;
        }
    };

    const [form] = Form.useForm();
    const handleOk = () => {
        if (!loading) {
            form.submit();
        }
    };

    const handleCancel = () => {
        setModalShow(false);
        form.resetFields();
    };

    const onFinish = (values: any) => {
        setLoading(true);

        const { content, attachment } = values;
        feedbackApi
            .addReply({
                issueId,
                content,
                attachment: attachment && attachment[0]?.originFileObj
            })
            .then((v: { code: Number; msg: String }) => {
                if (v.code === 0) {
                    setModalShow(false);
                    form.resetFields();
                    setUpdateFlag(Date.now());
                } else {
                    message.error(v.msg);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Modal
            destroyOnClose={true}
            title="回复问题"
            open={modalShow}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="确认"
            cancelText="取消">
            <Spin spinning={loading}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    onFinish={onFinish}
                    autoComplete="off">
                    <Form.Item
                        label="内容"
                        name="content"
                        required={true}
                        rules={[{ required: true, message: "请输入内容" }]}>
                        <TextArea rows={6} showCount placeholder="请输入内容" />
                    </Form.Item>

                    <Form.Item
                        label="附件"
                        name="attachment"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => e && e.fileList}
                        extra="支持上传1张图片，格式为png、jpg、jpeg，3M以内">
                        <Upload {...uploadProps}>
                            <UploadButton />
                        </Upload>
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    );
};

export default AddReply;
