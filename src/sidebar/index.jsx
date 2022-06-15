import React, { useEffect } from "react";
import {
  listDocument,
  listFormReport,
} from "../dashboard/report-form/fakeData";
import { SiderbarWrapper } from "./styled";
import logo from "../assets/brand/cbimage.png";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const AppSidebar = ({ screen, setScreen, setTitle }) => {
  const items2 = ["Mẫu Báo cáo", "Quy định, tài liệu", "Link khảo sát"].map(
    (elementTitle, index) => {
      let child = [];
      if (index === 0) {
        child = listFormReport;
      } else if (index === 1) {
        child = listDocument;
      } else {
        child = ["Link"];
      }
      const key = String(index + 1);
      return {
        key: `${key}`,
        label: elementTitle,
        children: child.map((element, j) => {
          const subKey = element;
          return {
            key: subKey,
            label: element,
          };
        }),
      };
    }
  );

  useEffect(() => {
    setTitle(listFormReport[0]);
  }, [setTitle]);

  return (
    <SiderbarWrapper>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <Sider width={"100%"} className="site-layout-background">
        <Menu
          mode="inline"
          defaultOpenKeys={["1"]}
          selectedKeys={"1"}
          style={{
            height: "100%",
            width: "100%",
            borderRight: 0,
          }}
          items={items2}
          onClick={(e) => {
            setScreen(Number(e?.keyPath[1]));
            setTitle(e.key);
          }}
        />
      </Sider>
    </SiderbarWrapper>
  );
};

export default AppSidebar;
