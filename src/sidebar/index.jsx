import React, { useEffect } from "react";
import { listFormReport } from "../dashboard/report-form/fakeData";
import { ButtonLogout, SiderbarWrapper } from "./styled";
import logo from "../assets/brand/cbimage.png";
import overview from "../assets/icon/overview.svg";
import link from "../assets/icon/link.svg";
import document from "../assets/icon/document.svg";
import database from "../assets/icon/database.png";
import logoutIcon from "../assets/icon/logout.png";
import { Layout, Menu, Modal } from "antd";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const AppSidebar = ({ screen, setScreen, setTitle }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const { confirm } = Modal;
  const showConfirm = () => {
    confirm({
      content: "Chức năng bị hạn chế vui lòng liên hệ quản trị viên",
    });
  };

  const items2 = [
    "Kết quả khảo sát",
    "Link khảo sát",
    "Dữ liệu thô",
    "Quy định, tài liệu",
  ];
  const icons = [overview, link, database, document];

  const logout = () => {
    localStorage.removeItem("user");
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
              if (Number(e.key) === 4 && user?.is_superuser === "False") {
                showConfirm();
              }
              setScreen(Number(e.key));
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
        <span>Đăng xuất</span>
      </ButtonLogout>
    </SiderbarWrapper>
  );
};

export default AppSidebar;
