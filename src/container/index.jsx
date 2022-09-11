import React, { useEffect } from "react";
import FilterComponent from "../dashboard/filter";
import {
  ChartWrapper,
  ContainerWrapper,
  PathWrapper,
  SpinWrapper,
} from "./styled";
import { useState } from "react";
import { Button, Dropdown, Menu, Segmented, Spin } from "antd";
import BornComponent from "./born";
import { ChildData, ObstetricsData } from "./fakeData";
import Document from "./document";
import SurveyLink from "./survey";
import RowData from "./row-data";
import ExportData from "./export-data";
import { useDispatch, useSelector } from "react-redux";
import { storeSetDashboardData } from "../store/data-reducer";
import RadaChart from "../components/RadaChart/RadaChart";
import { linkApi } from "../common/ngok";
import VietNamChart from "../components/VietNamChart/VietNamChart";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import FormInputData from "./FormInputData/FormInputData";

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
        <PathComponent screen={screen} />
        <FilterComponent
          disabled={screen === 2 || screen === 4}
          screen={screen}
          setScreen={setScreen}
        />
      </div>
      {screen === 1 && (
        <div>
          {!hostPitalSelected && (
            <ChartWrapper>
              <RadaChart />
              <VietNamChart />
            </ChartWrapper>
          )}
          {isLoading && (
            <SpinWrapper>
              <Spin size="large" />
            </SpinWrapper>
          )}
          {hostPitalSelected && !isLoading ? (
            <>
              <ChartWrapper>
                <RadaChart />
                <RadaChart />
              </ChartWrapper>
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
        </div>
      )}

      {screen === 2 && <SurveyLink />}
      {screen === 3 && <RowData />}
      {screen === 4 && <Document title={title} />}
      {screen === 6 && <ExportData />}
      {screen === 7 && <FormInputData />}
    </ContainerWrapper>
  );
};

export default AppContainer;

function PathComponent({ screen }) {
  const { t } = useTranslation();
  const [language, setLanguage] = useState("vi");
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <div
              onClick={() => {
                i18next.changeLanguage(language === "vi" ? "en" : "vi");
                setLanguage(language === "vi" ? "en" : "vi");
              }}
            >
              {t("setting.changelanguage")}
            </div>
          ),
        },
      ]}
    />
  );
  const screenFake = [
    t("screen.surveyResults"),
    t("screen.surveyLink"),
    t("screen.rowData"),
    t("screen.regulations"),
    t("screen.exportReport"),
  ];
  return (
    <PathWrapper>
      <div>
        <span>{t("screen.home")}</span> / {screenFake[screen - 1]}
      </div>
      <Dropdown overlay={menu} placement="bottomLeft">
        <Button>{t("setting.setting")}</Button>
      </Dropdown>
    </PathWrapper>
  );
}

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
