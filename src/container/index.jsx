import React from "react";
import FilterComponent from "../dashboard/filter";
import { ContainerWrapper } from "./styled";
import WidgetsDropdown from "./widgets/WidgetsDropdown";
import { screenFake } from "./screen";
import { useState } from "react";
import { Segmented, Select } from "antd";
import BornComponent from "./born";
import { ChildData, GeneralData, ObstetricsData, Quarter } from "./fakeData";
import Document from "./document";
import SurveyLink from "./survey";
import RowData from "./row-data";

const AppContainer = ({ screen, title }) => {
  const [value, setValue] = useState("TC Khoa sản");
  return (
    <ContainerWrapper>
      <div className="header">
        <div className="path">
          <span>Home</span> / Dashboard / {screenFake[screen - 1]}
        </div>
        <FilterComponent disabled={screen === 2 || screen === 3} />
      </div>
      {screen === 1 && (
        <div>
          <WidgetsComponent />
          <div className="segmented">
            <Segmented
              options={["TC Khoa sản", "TC Khoa nhi", "TC Chung"]}
              value={value}
              onChange={setValue}
              size="large"
            />
            <div>
              <Select
                defaultValue={Quarter[0]}
                className="select-quarter"
                onChange={() => {}}
              >
                {Quarter.map((element, index) => {
                  return (
                    <Select.Option key={String(index)}>
                      {index + 1}. {element}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
          </div>
          <div className="content-chart">
            <h2>{value}</h2>
            {value === "TC Khoa sản" && <BornComponent data={ObstetricsData} />}
            {value === "TC Khoa nhi" && <BornComponent data={ChildData} />}
            {value === "TC Chung" && <BornComponent data={GeneralData} />}
          </div>
        </div>
      )}
      {screen === 2 && <Document title={title} />}
      {screen === 3 && <SurveyLink />}
      {screen === 4 && <RowData />}
    </ContainerWrapper>
  );
};

export default AppContainer;
function WidgetsComponent() {
  return (
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
  );
}
