import React from "react";
import { listFormReport } from "../dashboard/report-form/fakeData";
import { SiderbarWrapper } from "./styled";
import logo from "../assets/brand/cbimage.png";
const AppSidebar = () => {
  return (
    <SiderbarWrapper>
      <img src={logo} alt="" className="logo"/>
      <span className="title">Mẫu Báo cáo</span>
      {listFormReport.map((element, index) => (
        <div
          className="report"
          //   onClick={() => setVisible(true)}
          key={String(index)}
        >
          {element}
        </div>
      ))}
    </SiderbarWrapper>
  );
};

export default AppSidebar;
