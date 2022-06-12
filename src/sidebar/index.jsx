import React from "react";
import {
  listDocument,
  listFormReport,
} from "../dashboard/report-form/fakeData";
import { SiderbarWrapper } from "./styled";
import logo from "../assets/brand/cbimage.png";

const AppSidebar = ({ screen, setScreen, setTitle }) => {
  return (
    <SiderbarWrapper>
      <img src={logo} alt="" className="logo" />
      <div
        className="title"
        onClick={() => {
          setScreen(1);
          setTitle(listFormReport[0]);
        }}
      >
        Mẫu Báo cáo
      </div>
      {screen === 1 &&
        listFormReport.map((element, index) => (
          <div
            className="report"
            onClick={() => setTitle(element)}
            key={String(index)}
          >
            {element}
          </div>
        ))}
      <div
        className="title"
        onClick={() => {
          setScreen(2);
          setTitle(listDocument[0]);
        }}
      >
        Link khảo sát
      </div>
      {screen === 2 &&
        listDocument.map((element, index) => (
          <div
            className="report"
            onClick={() => setTitle(element)}
            key={String(index)}
          >
            {element}
          </div>
        ))}
      <div
        className="title"
        onClick={() => {
          setScreen(3);
          setTitle(listDocument[0]);
        }}
      >
        Quy định, tài liệu
      </div>
    </SiderbarWrapper>
  );
};

export default AppSidebar;
