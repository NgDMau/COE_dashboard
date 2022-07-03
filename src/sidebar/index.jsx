import React, { useEffect } from "react";
import { listFormReport } from "../dashboard/report-form/fakeData";
import { SiderbarWrapper } from "./styled";
import logo from "../assets/brand/cbimage.png";
import overview from "../assets/icon/overview.svg";
import link from "../assets/icon/link.svg";
import document from "../assets/icon/document.svg";
import database from "../assets/icon/database.png";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const AppSidebar = ({ screen, setScreen, setTitle }) => {
  const items2 = [
    "Bảng điều khiển",
    "Quy định, tài liệu",
    "Link khảo sát",
    "Dữ liệu thô",
  ];
  const icons = [overview, document, link, database];
  useEffect(() => {
    setTitle(listFormReport[0]);
  }, [setTitle]);

  return (
    <SiderbarWrapper>
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
          defaultSelectedKeys={["1"]}
          onSelect={(e) => {
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
    </SiderbarWrapper>
  );
};

export default AppSidebar;
