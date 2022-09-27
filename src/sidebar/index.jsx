import React, { useEffect } from "react";
import { listFormReport } from "../dashboard/report-form/fakeData";
import { ButtonLogout, SiderbarWrapper } from "./styled";
import logo from "../assets/brand/cbimage.png";
import overview from "../assets/icon/overview.svg";
import link from "../assets/icon/link.svg";
import document from "../assets/icon/document.svg";
import database from "../assets/icon/database.png";
import logoutIcon from "../assets/icon/logout.png";
import userIcon from "../assets/icon/user.png";
import { Layout, Menu, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { storeSetToken } from "../store/auth-reducer";

const { Sider } = Layout;

const AppSidebar = ({ screen, setScreen, setTitle }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

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
    "User Manager",
  ];
  const icons = [overview, link, database, document, userIcon];

  const logout = () => {
    localStorage.removeItem("user");
    dispatch(storeSetToken(null));
    navigate("/login");
  };

  useEffect(() => {
    setTitle(listFormReport[0]);
  }, [setTitle]);
  return (
    <SiderbarWrapper>
      <div>
        <div className="logo">
          <img src={logo} alt="" />
        </div>

        <Sider
          className="site-layout-background"
          collapsedWidth="0"
          collapsed={false}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[screen]}
            onSelect={(e) => {
              console.log("eeeeeeeeeeeeee", e);
              if (Number(e.key) === 5) {
                navigate("/users");
                return;
              }
              if (Number(e.key) === 4 && user?.is_superuser === "False") {
                showConfirm();
              }
              if (Number(e.key) === 5) {
                setScreen(Number(7));
                return;
              }
              setScreen(Number(e.key));
              setTitle(items2[Number(e.key) - 1]);
              console.log(e);
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
