import React from "react";
import FilterComponent from "../dashboard/filter";
import { LinePoint } from "./line-chart/LinePoint";
import { ContainerWrapper } from "./styled";
import WidgetsDropdown from "./widgets/WidgetsDropdown";
import document from "../assets/brand/document.png";
import { screenFake } from "./screen";
import { LinkOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Segmented } from "antd";
import ReportChart from "../dashboard/report-form/report/dake-chart/index";

const AppContainer = ({ screen, title }) => {
  const [value, setValue] = useState("TC Khoa sản");
  return (
    <ContainerWrapper>
      <div className="header">
        <div className="path">
          <span>Home</span> / Dashboard / {screenFake[screen - 1]}
        </div>
        <FilterComponent disabled={screen === 2} />
      </div>
      {screen === 1 && (
        <div>
          <div className="Widgets-container">
            <WidgetsDropdown
              amount="26K"
              semibold="Users"
              percent="12.4"
              color="#321fdb"
            />
            <WidgetsDropdown
              amount="$6.200"
              semibold="Income"
              percent="40.9"
              color="#39f"
            />
            <WidgetsDropdown
              amount="2.49"
              semibold="Conversion Rate"
              percent="84.7"
              color="#f9b115"
            />
            <WidgetsDropdown
              amount="44K"
              semibold="Sessions"
              percent="23.6"
              color="#e55353"
            />
          </div>
          <div className="segmented">
            <Segmented
              options={["TC Khoa sản", "TC Khoa nhi", "TC Chung"]}
              value={value}
              onChange={setValue}
              size="large"
            />
          </div>
          <div className="content-chart">
            <h2>{title}</h2>
            {value === "TC Khoa sản" && <LinePoint />}
            {value === "TC Khoa nhi" && <ReportChart color="red" />}
            {value === "TC Chung" && <ReportChart />}
          </div>
        </div>
      )}
      {screen === 2 && (
        <div className="document-container">
          <h3 className="title">{title}</h3>
          <img src={document} alt="" className="document" />
        </div>
      )}
      {screen === 3 && (
        <div className="link-container">
          <LinkOutlined />
          Link khảo sát:{" "}
          <span
            className="link"
            onClick={() => {
              window.open("https://bmte.vn/form/quang_nam/v2");
            }}
          >
            https://bmte.vn/form/quang_nam/v2
          </span>
        </div>
      )}
    </ContainerWrapper>
  );
};

export default AppContainer;
