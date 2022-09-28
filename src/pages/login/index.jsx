import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Input from "antd/lib/input/Input";
import { Button } from "antd/lib/radio";
import { LoginWrapper } from "./styled";
import { UserOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";

import logo from "../../assets/brand/cbimage.png";
import { linkApi } from "../../common/ngok";
import MenuLanguage from "../menuLanguage";
import { storeSetToken } from "../../store/auth-reducer";
import { useTranslation } from "react-i18next";
import {
  storeSetCitiesData,
  storeSetCurrentQuarter,
  storeSetDashboardData,
  storeSetHostpitalData,
  storeSethospitalSelected,
} from "../../store/data-reducer";

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [userNameRegist, setUserNameRegist] = useState("");
  const [passwordRegist, setPasswordRegist] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const login = async () => {
    setIsLoading(true);
    setError("");
    fetch(`${linkApi}/user/login-with-token`, {
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
          dispatch(storeSetToken(data?.user?.token || null));
          localStorage.setItem("user", JSON.stringify(data?.user));
          localStorage.setItem("token", JSON.stringify(data?.user?.token));
          navigate("/dashboard");
        } else {
          setError("Wrong username or password");
        }
      })
      .catch(() => setError("Wrong username or password"))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    dispatch(storeSetDashboardData(null));
    dispatch(storeSetCurrentQuarter(7));
    dispatch(storeSetCitiesData());
    dispatch(storeSetHostpitalData([]));
    dispatch(storeSethospitalSelected(null));
  }, []);

  return (
    <LoginWrapper>
      <MenuLanguage />
      {isLogin ? (
        <div className="login-form">
          <span>{t("common.login")}</span>
          <div className="form">
            <div className="logo">
              <img src={logo} alt="" className="image" />
            </div>
            <div className="login">
              <h1>{t("common.welcome")}</h1>
              <Input
                disabled={isLoading}
                className="input"
                placeholder={t("common.username")}
                onChange={(e) => setUserName(e?.target?.value)}
                prefix={
                  <UserOutlined style={{ color: "green" }} size="large" />
                }
              />
              <Input
                disabled={isLoading}
                className="input"
                type="password"
                placeholder={t("common.password")}
                onChange={(e) => setPassword(e?.target?.value)}
                prefix={
                  <LockOutlined style={{ color: "green" }} size="large" />
                }
              />
              <div className="error">{error}</div>
              <div
                className="forgot-password"
                onClick={() => {
                  if (!isLoading) {
                    setIsLogin(!isLogin);
                  }
                }}
              >
                {t("common.signUp")}
              </div>
              <Button
                type="primary"
                className="btn-login"
                onClick={login}
                disabled={isLoading}
              >
                {isLoading ? <LoadingOutlined /> : t("common.login")}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="login-form">
          <span>{t("common.login")}</span>
          <div className="form">
            <div className="logo">
              <img src={logo} alt="" className="image" />
            </div>
            <div className="login">
              <h1>{t("common.welcome")}</h1>
              <Input
                disabled={isLoading}
                className="input"
                placeholder={t("common.username")}
                onChange={(e) => setUserNameRegist(e?.target?.value)}
                prefix={
                  <UserOutlined style={{ color: "green" }} size="large" />
                }
              />
              <Input
                disabled={isLoading}
                className="input"
                type="password"
                placeholder={t("common.password")}
                onChange={(e) => setPasswordRegist(e?.target?.value)}
                prefix={
                  <LockOutlined style={{ color: "green" }} size="large" />
                }
              />
              <Input
                disabled={isLoading}
                className="input"
                type="password"
                placeholder={t("common.retypePassword")}
                onChange={(e) => setPasswordRetype(e?.target?.value)}
                prefix={
                  <LockOutlined style={{ color: "green" }} size="large" />
                }
              />
              <div
                className="forgot-password"
                onClick={() => setIsLogin(!isLogin)}
              >
                {t("common.login")}
              </div>
              <Button
                className="btn-login"
                onClick={() => navigate("/apps")}
                disabled={isLoading}
              >
                {isLoading ? <LoadingOutlined /> : t("common.signUp")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </LoginWrapper>
  );
};

export default LoginPage;
