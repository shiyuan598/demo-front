import React from "react";

export default function Auth() {
    return (
        <div className="auth-page">
            <p>
                {`查看用户：
            curl http://xwayos.zhito.com:9041/api/auth/users`}
            </p>
            <p>
                {`创建用户：
            curl -X POST http://xwayos.zhito.com:9041/api/auth/users -H "Content-Type: application/json" -d '{"username":"xxx","password":"xxx"}'`}
            </p>
            <p>
                {`修改密码：
            curl -X PUT http://xwayos.zhito.com:9041/api/auth/users -H "Content-Type: application/json" -H "Authorization: xxx" -d '{"username":"xxx","currentPassword":"xxx", "newPassword": "xxx"}`}
            </p>
        </div>
    );
}
