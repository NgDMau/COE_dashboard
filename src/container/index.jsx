import React, { useEffect } from "react";
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
import ExportData from "./export-data";
import { useDispatch, useSelector } from "react-redux";
import {
  storeSetCurrentQuarter,
  storeSetDashboardData,
} from "../store/data-reducer";

const AppContainer = ({ screen, title, setScreen }) => {
  const dispath = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  const dashboardData = useSelector((state) => state?.data?.dashboardData);
  const hostPitalSelected = useSelector(
    (state) => state?.data?.hostPitalSelected
  );

  const [value, setValue] = useState("TC Khoa sản");

  const getDataDashboard = async (selectedCode) => {
    const myHeaders = new Headers({
      Authorization: "Token " + user?.token,
      "Content-Type": "application/x-www-form-urlencoded",
    });
    fetch(
      `https://1527-113-22-84-32.ngrok.io/dm/data/evaluation?hospital=${selectedCode}`,
      {
        method: "POST",
        headers: myHeaders,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        dispath(storeSetDashboardData(data));
      });
  };
  useEffect(() => {
    if (hostPitalSelected) {
      getDataDashboard(hostPitalSelected?.code);
    }
  }, [hostPitalSelected]);

  return (
    <ContainerWrapper>
      <div className="header">
        <div className="path">
          <span>Home</span> / Dashboard / {screenFake[screen - 1]}
        </div>
        <FilterComponent
          disabled={screen === 2 || screen === 3}
          screen={screen}
          setScreen={setScreen}
        />
      </div>
      {screen === 1 && (
        <div>
          <WidgetsComponent />
          <HeaderScreen value={value} setValue={setValue} />
          {hostPitalSelected && (
            <div className="content-chart">
              <h2>{value}</h2>
              {value === "TC Khoa sản" && (
                <BornComponent
                  data={ObstetricsData}
                  dataList={dashboardData?.SK}
                />
              )}
              {value === "TC Khoa nhi" && (
                <BornComponent data={ChildData} dataList={dashboardData?.NK} />
              )}
            </div>
          )}
        </div>
      )}

      {screen === 2 && <Document title={title} />}
      {screen === 3 && <SurveyLink />}
      {screen === 4 && <RowData />}
      {screen === 6 && <ExportData />}
    </ContainerWrapper>
  );
};

export default AppContainer;

function HeaderScreen({ value, setValue }) {
  const dispatch = useDispatch();

  const dashboardData =
    useSelector((state) => state?.data?.dashboardData) || null;
  const currentQuarter =
    useSelector((state) => state?.data?.currentQuarter) || null;

  return (
    <div className="segmented">
      <Segmented
        options={["TC Khoa sản", "TC Khoa nhi"]}
        value={value}
        onChange={setValue}
        size="large"
      />
      <div>
        {dashboardData?.time?.length > 0 && (
          <Select
            defaultValue={dashboardData?.time[currentQuarter]}
            className="select-quarter"
            onChange={(e) => {
              dispatch(storeSetCurrentQuarter(e));
            }}
          >
            {dashboardData?.time?.map((element, index) => {
              return (
                <Select.Option key={String(index)}>{element}</Select.Option>
              );
            })}
          </Select>
        )}
      </div>
    </div>
  );
}

function WidgetsComponent() {
  return (
    <div className="Widgets-container">
      <WidgetsDropdown
        amount="26K"
        semibold="Tổng số khảo sát thành công"
        percent="12.4"
        color="#321fdb"
      />
      <WidgetsDropdown
        amount="6200"
        semibold="Tổng số tỉnh đã khảo sát"
        percent="40.9"
        color="#39f"
      />
      <WidgetsDropdown
        amount="249"
        semibold="Tổng số bệnh viện đã khảo sát"
        percent="84.7"
        color="#f9b115"
      />
      <WidgetsDropdown
        amount="440"
        semibold="Tổng số bà mẹ đã khảo sát"
        percent="23.6"
        color="#e55353"
      />
    </div>
  );
}
