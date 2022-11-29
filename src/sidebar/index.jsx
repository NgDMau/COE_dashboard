import React, { useEffect } from "react";
import { listFormReport } from "../dashboard/report-form/fakeData";
import { ButtonLogout, MenuIconWrapper, SiderbarWrapper } from "./styled";

import logo from "../assets/brand/cbimage.png";
import link from "../assets/icon/link.svg";
import overview from "../assets/icon/overview.svg";
import document from "../assets/icon/document.svg";
import database from "../assets/icon/database.png";
import userIcon from "../assets/icon/user.png";
import menuIcon from "../assets/icon/menu.png";
import backIcon from "../assets/icon/back.png";
import logoutIcon from "../assets/icon/logout.png";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeSetToken } from "../store/auth-reducer";
import { SCREEN_DEFAULT } from "../common/ngok";
import { useTranslation } from "react-i18next";
import { Layout, Menu, Modal } from "antd";
import { useState } from "react";
import { storeSetCollapse } from "../store/dashboard-reducer";

const { Sider } = Layout;

const AppSidebar = ({ screen, setScreen, setTitle }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const isCollapse = useSelector((state) => state.dashboard.isCollapse);
  const setIsCollapse = (isOpen) => {
    dispatch(storeSetCollapse(isOpen));
  };

  const { confirm } = Modal;
  const showConfirm = () => {
    confirm({
      content: "Chức năng bị hạn chế vui lòng liên hệ quản trị viên",
    });
  };

  const items2 = [
    t("screen.surveyResults"),
    t("screen.surveyLink"),
    t("screen.rowData"),
    t("screen.regulations"),
    t("screen.userManager"),
  ];
  const icons = [overview, link, database, document, userIcon];

  const logout = () => {
    localStorage.removeItem("user");
    dispatch(storeSetToken(null));
    navigate("/apps");
  };

  useEffect(() => {
    setTitle(listFormReport[0]);
  }, [setTitle]);
  return (
    <SiderbarWrapper collapse={isCollapse}>
      <div>
        <div className="logo">
          <img className="img-logo" src={logo} alt="" />
          <MenuIconWrapper
            src={isCollapse ? menuIcon : backIcon}
            alt=""
            onClick={() => setIsCollapse(!isCollapse)}
            collapse={isCollapse}
          />
        </div>

        <Sider
          className="site-layout-background"
          collapsedWidth="0"
          collapsed={false}
          width="100%"
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[`${screen}`]}
            onSelect={(e) => {
              if (Number(e.key) === 4 && user?.is_superuser === "False") {
                showConfirm();
              }
              if (Number(e.key) === 5) {
                setScreen(Number(7));
                navigate(`${SCREEN_DEFAULT[7]}`);
                return;
              }
              setScreen(Number(e.key));
              navigate(`${SCREEN_DEFAULT[e.key]}`);
              setTitle(items2[Number(e.key) - 1]);
            }}
            items={items2.map((element, index) => ({
              key: String(index + 1),
              icon: <img src={icons[index]} alt="" />,
              label: isCollapse ? "" : element,
            }))}
          />
        </Sider>
      </div>
      <ButtonLogout onClick={logout} collapse={isCollapse}>
        <img src={logoutIcon} alt="" />
        <span>{!isCollapse && t("screen.logout")}</span>
      </ButtonLogout>
    </SiderbarWrapper>
  );
};

export default AppSidebar;
