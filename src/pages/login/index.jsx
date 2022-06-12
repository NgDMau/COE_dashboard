import Input from "antd/lib/input/Input";
import { Button } from "antd/lib/radio";
import React from "react";
import { LoginWrapper } from "./styled";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "../../assets/brand/cbimage.png";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <LoginWrapper>
      <div className="login-form">
        <span>login</span>
        <div className="form">
          <div className="logo">
            <img src={logo} alt="" className="image" />
          </div>
          <div className="login">
            <h1>Wellcome</h1>
            <Input
              className="input"
              placeholder="Tên đăng nhập"
              prefix={<UserOutlined style={{ color: "green" }} size="large" />}
            />
            <Input
              className="input"
              type="password"
              placeholder="Mật khẩu"
              prefix={<LockOutlined style={{ color: "green" }} size="large" />}
            />
            <div className="forgot-password">Quên mật khẩu?</div>
            <Button className="btn-login" onClick={() => navigate("/apps")}>
              Đăng nhập
            </Button>
          </div>
        </div>
      </div>
    </LoginWrapper>
  );
};

export default LoginPage;
