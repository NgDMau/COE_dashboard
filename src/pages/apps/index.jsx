import React from "react";
import { AppsWrapper, LoginView } from "./styled";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import logo from "../../assets/brand/cbimage.png";
import logoAlive from "../../assets/brand/Logo_AnT.png";
import MenuLanguage from "../menuLanguage";

const AppsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { confirm } = Modal;
  const showConfirm = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: <Button>{t("development")}</Button>,
    });
  };

  return (
    <AppsWrapper>
      <MenuLanguage />
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="item blue" onClick={() => navigate("/login")}>
        <LoginView>{t("common.login")}</LoginView>
        <div className="title">{t("app.breastfeeding")}</div>
        <div className="hover-image-1" />
      </div>
      <div className="item yellow" onClick={showConfirm}>
        <LoginView>{t("common.login")}</LoginView>
        <div className="title">{t("app.breastMilkBank")}</div>
        <div className="hover-image-2" />
      </div>
      <div className="item green" onClick={showConfirm}>
        <LoginView>{t("common.login")}</LoginView>
        <div className="title">{t("app.nationalMinorities")}</div>
        <div className="hover-image-3" />
      </div>
      <div className="footer">
        <div>© {t("app.copyright")}</div>
        <div>{t("app.supportBuild")} </div>
        <img src={logoAlive} alt="" />
        <div>{t("app.image")}: Alive & Thrive</div>
      </div>
    </AppsWrapper>
  );
};

export default AppsPage;
