import Input from "antd/lib/input/Input";
import { Button } from "antd/lib/radio";
import React from "react";
import { LoginWrapper } from "./styled";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "../../assets/brand/cbimage.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { storeSetToken } from "../../store/auth-reducer";

const LoginPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [userNameRegist, setUserNameRegist] = useState("");
  const [passwordRegist, setPasswordRegist] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");

  const [isLogin, setIsLogin] = useState(true);

  const login = async () => {
    fetch("https://1527-113-22-84-32.ngrok.io/user/login-with-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: new URLSearchParams({
        username: userName,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === "successful") {
          navigate("/");
          dispatch(storeSetToken(data?.user?.token || null));
          localStorage.setItem("user", JSON.stringify(data?.user));
        }
      });
  };

  return (
    <LoginWrapper>
      {isLogin ? (
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
                onChange={(e) => setUserName(e?.target?.value)}
                prefix={
                  <UserOutlined style={{ color: "green" }} size="large" />
                }
              />
              <Input
                className="input"
                type="password"
                placeholder="Mật khẩu"
                onChange={(e) => setPassword(e?.target?.value)}
                prefix={
                  <LockOutlined style={{ color: "green" }} size="large" />
                }
              />
              <div
                className="forgot-password"
                onClick={() => setIsLogin(!isLogin)}
              >
                Đăng ký
              </div>
              <Button className="btn-login" onClick={login}>
                Đăng nhập
              </Button>
            </div>
          </div>
        </div>
      ) : (
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
                onChange={(e) => setUserNameRegist(e?.target?.value)}
                prefix={
                  <UserOutlined style={{ color: "green" }} size="large" />
                }
              />
              <Input
                className="input"
                type="password"
                placeholder="Mật khẩu"
                onChange={(e) => setPasswordRegist(e?.target?.value)}
                prefix={
                  <LockOutlined style={{ color: "green" }} size="large" />
                }
              />
              <Input
                className="input"
                type="password"
                placeholder="Nhập lại Mật khẩu"
                onChange={(e) => setPasswordRetype(e?.target?.value)}
                prefix={
                  <LockOutlined style={{ color: "green" }} size="large" />
                }
              />
              <div
                className="forgot-password"
                onClick={() => setIsLogin(!isLogin)}
              >
                Đăng nhập
              </div>
              <Button className="btn-login" onClick={() => navigate("/apps")}>
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      )}
    </LoginWrapper>
  );
};

export default LoginPage;
