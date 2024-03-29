import React, { useEffect } from "react";
import { listFormReport } from "../dashboard/report-form/fakeData";
import { ButtonLogout, MenuIconWrapper, SiderbarWrapper } from "./styled";

import logo from "../assets/brand/cbimage.png";
import link from "../assets/icon/link.svg";
import overview from "../assets/icon/overview.svg";
import document from "../assets/icon/document.svg";
import database from "../assets/icon/database.png";
import userIcon from "../assets/icon/user.png";
import logoutIcon from "../assets/icon/logout.png";

import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { storeSetToken } from "../store/auth-reducer";
import { screenReverst, SCREEN_DEFAULT } from "../common/ngok";
import { useTranslation } from "react-i18next";
import { Layout, Menu, Modal } from "antd";
import {
  storeSetCitiesData,
  storeSetCitySelected,
  storeSethospitalSelected,
  storeSetHostpitalData,
} from "../store/data-reducer";

const { Sider } = Layout;

const AppSidebar = ({ screen, setScreen, setTitle }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const patch = location?.pathname.replace("/", "") || "dashboard";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

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
    dispatch(storeSetCitiesData([]));
    dispatch(storeSetHostpitalData([]));
    dispatch(storeSethospitalSelected(null));
    dispatch(storeSetCitySelected(null));
    navigate("/apps");
  };

  useEffect(() => {
    setTitle(listFormReport[0]);
  }, [setTitle]);
  return (
    <SiderbarWrapper>
      <div>
        <div className="logo">
          <img className="img-logo" src={logo} alt="" />
        </div>

        <Sider
          className="site-layout-background"
          collapsedWidth="0"
          collapsed={false}
          width="100%"
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[`${screenReverst[`${patch}`]}`]}
            // selectedKeys={[`${screen}`]}
            onSelect={(e) => {
              console.log(e.key);
              if (
                (Number(e.key) === 4 ||
                  Number(e.key) === 3 ||
                  Number(e.key) === 5) &&
                user?.is_superuser === "False"
              ) {
                showConfirm();
                return;
              }
              if (Number(e.key) === 5) {
                setScreen(Number(5));
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
              label: element,
            }))}
          />
        </Sider>
      </div>
      <ButtonLogout onClick={logout}>
        <img src={logoutIcon} alt="" />
        <span>{t("screen.logout")}</span>
      </ButtonLogout>
    </SiderbarWrapper>
  );
};

export default AppSidebar;
