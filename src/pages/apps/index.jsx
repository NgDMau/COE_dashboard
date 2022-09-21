import React from "react";
import { AppsWrapper } from "./styled";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import logo from "../../assets/brand/Logo_AnT.png";
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
      <div className="content">
        <div className="item blue" onClick={() => navigate("/dashboard")}>
          {t("app.breastfeeding")}
        </div>
        <div className="item yellow" onClick={showConfirm}>
          {t("app.breastMilkBank")}
        </div>
        {/* <div className="item green" onClick={showConfirm}>
          {t("app.nationalMinorities")}
        </div> */}
      </div>
    </AppsWrapper>
  );
};

export default AppsPage;
