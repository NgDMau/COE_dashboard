import React, { useEffect } from "react";
import FilterComponent from "../dashboard/filter";
import { ContainerWrapper, SpinWrapper } from "./styled";
import { screenFake } from "./screen";
import { useState } from "react";
import { Segmented, Spin } from "antd";
import BornComponent from "./born";
import { ChildData, ObstetricsData } from "./fakeData";
import Document from "./document";
import SurveyLink from "./survey";
import RowData from "./row-data";
import ExportData from "./export-data";
import { useDispatch, useSelector } from "react-redux";
import {
  storeSetDashboardData,
} from "../store/data-reducer";
import RadaChart from "../components/RadaChart/RadaChart";
import { linkApi } from "../common/ngok";
import VietNamChart from "../components/VietNamChart/VietNamChart";

const AppContainer = ({ screen, title, setScreen }) => {
  const dispath = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  const dashboardData = useSelector((state) => state?.data?.dashboardData);
  const hostPitalSelected = useSelector(
    (state) => state?.data?.hostPitalSelected
  );

  const [value, setValue] = useState("TC Khoa sản");
  const [isLoading, setIsLoading] = useState(false);

  const getDataDashboard = async (selectedCode) => {
    setIsLoading(true);
    const myHeaders = new Headers({
      Authorization: "Token " + user?.token,
      "Content-Type": "application/x-www-form-urlencoded",
    });
    fetch(`${linkApi}/dm/data/evaluation?hospital=${selectedCode}`, {
      method: "POST",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        dispath(storeSetDashboardData(data));
      })
      .finally(() => setIsLoading(false));
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
          disabled={screen === 2 || screen === 4}
          screen={screen}
          setScreen={setScreen}
        />
      </div>
      {screen === 1 && (
        <div>
          <RadaChart />
          {isLoading && (
            <SpinWrapper>
              <Spin size="large" />
            </SpinWrapper>
          )}
          {hostPitalSelected && !isLoading ? (
            <>
              <HeaderScreen value={value} setValue={setValue} />
              <div className="content-chart">
                <h2>{value}</h2>
                {value === "TC Khoa sản" && (
                  <BornComponent
                    data={ObstetricsData}
                    dataList={dashboardData?.SK}
                  />
                )}
                {value === "TC Khoa nhi" && (
                  <BornComponent
                    data={ChildData}
                    dataList={dashboardData?.NK}
                  />
                )}
              </div>
            </>
          ) : null}
          {!hostPitalSelected && <VietNamChart />}
        </div>
      )}

      {screen === 2 && <SurveyLink />}
      {screen === 3 && <RowData />}
      {screen === 4 && <Document title={title} />}
      {screen === 6 && <ExportData />}
    </ContainerWrapper>
  );
};

export default AppContainer;

function HeaderScreen({ value, setValue }) {
  return (
    <div className="segmented">
      <Segmented
        options={["TC Khoa sản", "TC Khoa nhi"]}
        value={value}
        onChange={setValue}
        size="large"
      />
    </div>
  );
}
