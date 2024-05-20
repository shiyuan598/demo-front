import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Input, Form, Spin, message, Space } from "antd";
import { authApi } from "../api";
import { setUserInfo } from "../utils/auth";

export default function App() {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        setLoading(true);
        authApi
            .login(values)
            .then((v) => {
                if (v.code === 0) {
                    // 将用户信息写入本地存储
                    setUserInfo(v.data);
                    history.push("/");
                } else {
                    message.error("用户名或密码错误！");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <div className="login-page">
            <Spin spinning={loading}>
                <h4 className="title">用户登录</h4>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onFinish}
                    autoComplete="off">
                    <Form.Item
                        name="username"
                        label="用户名"
                        required={true}
                        rules={[{ required: true, message: "请输入用户名" }]}>
                        <Input placeholder="请输入用户名" autoComplete="off" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="密码"
                        required={true}
                        rules={[{ required: true, message: "请输入密码" }]}>
                        <Input placeholder="请输入密码" type="password" />
                    </Form.Item>

                    <Form.Item wrapperCol={{span: 24}}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                重置
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Spin>
        </div>
    );
}
