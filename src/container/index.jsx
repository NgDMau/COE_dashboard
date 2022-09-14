/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import FilterComponent from "../dashboard/filter";
import {
  Buttonanguage,
  ChartWrapper,
  ContainerWrapper,
  IConLanguage,
  PathWrapper,
  SpinWrapper,
} from "./styled";
import { useState } from "react";
import { Dropdown, Menu, Segmented, Spin } from "antd";
import BornComponent from "./born";
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
import iconUnitedStates from "../assets/icon/united-states.png";
import iconVietnam from "../assets/icon/vietnam.png";
import { storeSetLanguage } from "../store/auth-reducer";

const AppContainer = ({ screen, title, setScreen }) => {
  const { t } = useTranslation();
  const dispath = useDispatch();

  const ObstetricsData = [
    {
      criteria: t("obstetricsData.obstetricsKS_1"),
    },
    {
      criteria: t("obstetricsData.obstetricsKS_2"),
    },
    {
      criteria: t("obstetricsData.obstetricsKS_3"),
    },
    {
      criteria: t("obstetricsData.obstetricsKS_4"),
    },
    {
      criteria: t("obstetricsData.obstetricsKS_5"),
    },
    {
      criteria: t("obstetricsData.obstetricsKS_6"),
    },
    {
      criteria: t("obstetricsData.obstetricsKS_7"),
    },
    {
      criteria: t("obstetricsData.obstetricsKS_8"),
    },
  ];

  const ChildData = [
    {
      criteria: t("obstetricsData.obstetricsKN_1"),
    },
    {
      criteria: t("obstetricsData.obstetricsKN_2"),
    },
    {
      criteria: t("obstetricsData.obstetricsKN_3"),
    },
    {
      criteria: t("obstetricsData.obstetricsKN_4"),
    },
    {
      criteria: t("obstetricsData.obstetricsKN_5"),
    },
    {
      criteria: t("obstetricsData.obstetricsKN_6"),
    },
    {
      criteria: t("obstetricsData.obstetricsKN_7"),
    },
  ];

  const user = JSON.parse(localStorage.getItem("user"));
  const dashboardData = useSelector((state) => state?.data?.dashboardData);
  const hospitalSelected = useSelector(
    (state) => state?.data?.hospitalSelected
  );

  const [value, setValue] = useState(1);
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
    if (hospitalSelected) {
      getDataDashboard(hospitalSelected?.code);
    }
  }, [hospitalSelected]);

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
          {!hospitalSelected && (
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
          {hospitalSelected && !isLoading ? (
            <>
              <ChartWrapper>
                <RadaChart />
                <RadaChart />
              </ChartWrapper>
              <HeaderScreen value={value} setValue={setValue} />
              <div className="content-chart">
                <h2>{value}</h2>
                {value === 1 && (
                  <BornComponent
                    data={ObstetricsData}
                    dataList={dashboardData?.SK}
                  />
                )}
                {value === 2 && (
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
  const dispatch = useDispatch();
  const language = useSelector((state) => state?.auth?.language);
  const setLanguage = (languageChange) => {
    dispatch(storeSetLanguage(languageChange));
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <div
              onClick={() => {
                i18next.changeLanguage("vi");
                setLanguage("vi");
              }}
            >
              <IConLanguage src={iconVietnam} alt="" /> {t("common.vietNam")}
            </div>
          ),
        },
        {
          key: "2",
          label: (
            <div
              onClick={() => {
                i18next.changeLanguage("en");
                setLanguage("en");
              }}
            >
              <IConLanguage src={iconUnitedStates} alt="" />{" "}
              {t("common.engLish")}
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
        <Buttonanguage>
          {" "}
          <IConLanguage
            src={language === "vi" ? iconVietnam : iconUnitedStates}
            alt=""
          />{" "}
          {language}
        </Buttonanguage>
      </Dropdown>
    </PathWrapper>
  );
}

function HeaderScreen({ value, setValue }) {
  const { t } = useTranslation();
  return (
    <div className="segmented">
      <Segmented
        options={[
          { label: t("dashBoard.obstetricDept"), value: 1 },
          { label: t("dashBoard.pediatricDept"), value: 2 },
        ]}
        value={value}
        onChange={setValue}
        size="large"
      />
    </div>
  );
}
