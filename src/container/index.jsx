/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from "react";

import Document from "./document";
import i18next from "i18next";

import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Menu, Segmented, Spin } from "antd";

import RowData from "./row-data";
import RadaChart from "../components/RadaChart/RadaChart";
import SurveyLink from "./survey";
import ExportData from "./export-data";
import iconVietnam from "../assets/icon/vietnam.png";
import VietNamChart from "../components/VietNamChart/VietNamChart";
import BornComponent from "./born";
import FilterComponent from "../dashboard/filter";
import iconUnitedStates from "../assets/icon/united-states.png";
import UserManager from "./../pages/users/index";

import { sendGet } from "../api/axios";
import { showConfirm } from "../helpers/modal-confirm";
import { EDepartment } from "../common/const";
import { SCREEN_DEFAULT } from "../common/ngok";
import { storeSetLanguage } from "../store/auth-reducer";
import { storeSetDashboardData } from "../store/data-reducer";
import {
  Buttonanguage,
  ChartContainerWrapper,
  ChartWrapper,
  ContainerWrapper,
  IConLanguage,
  PathWrapper,
  SpinWrapper,
} from "./styled";
import PairRadarChart from "../components/RadaChart/PairRadarChart";

const AppContainer = ({ screen, title, setScreen }) => {
  const { t } = useTranslation();
  const dispath = useDispatch();
  const location = useLocation();
  const patch = location?.pathname || "/dashboard";
  const currentQuarter = useSelector((state) => state?.data?.currentQuarter);
  const isCollapse = useSelector((state) => state.dashboard.isCollapse);
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

  const dashboardData = useSelector((state) => state?.data?.dashboardData);
  const hospitalSelected = useSelector(
    (state) => state?.data?.hospitalSelected
  );

  const [value, setValue] = useState(EDepartment.OBSTETRIC);
  const [isLoading, setIsLoading] = useState(false);

  const getDataDashboard = async (selectedCode) => {
    try {
      setIsLoading(true);
      const response = await sendGet(
        `/dm/data/evaluation?hospital=${selectedCode}`
      );
      if (response) {
        dispath(storeSetDashboardData(response));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (hospitalSelected) {
      getDataDashboard(hospitalSelected?.code);
      setValue(EDepartment.OBSTETRIC);
    }
  }, [hospitalSelected]);

  const checkValue = (dashboardDataProps, elementProps) => {
    if (!dashboardDataProps) {
      return 0;
    }
    if (
      dashboardDataProps[currentQuarter] === "N/A" ||
      !dashboardDataProps[currentQuarter]
    ) {
      return 0;
    }
    return dashboardDataProps[currentQuarter];
  };

  const dataRadarSM = useMemo(() => {
    if (!dashboardData) {
      return null;
    }
    const data =
      [1, 2, 3, 4, 5, 6]?.map((element) => {
        if (
          value === EDepartment.OBSTETRIC &&
          !dashboardData?.SK[element]?.values?.SM
        ) {
          return 0;
        }
        if (
          value === EDepartment.PEDIATRIC &&
          !dashboardData?.NK[element]?.values?.SM
        ) {
          return 0;
        }

        return value === EDepartment.OBSTETRIC
          ? checkValue(dashboardData?.SK[element]?.values?.SM) || 0
          : checkValue(dashboardData?.NK[element]?.values?.SM) || 0;
      }) || [];
    return data || null;
  }, [dashboardData, value, currentQuarter]);

  const dataRadarST = useMemo(() => {
    if (!dashboardData) {
      return null;
    }
    const data =
      [1, 2, 3, 4, 5, 6]?.map((element) => {
        if (value === 1 && !dashboardData?.SK[element]?.values?.ST) {
          return null;
        }
        if (value === 2 && !dashboardData?.NK[element]?.values?.ST) {
          return null;
        }
        return value === 1
          ? checkValue(dashboardData?.SK[element]?.values?.ST) || 0
          : checkValue(dashboardData?.NK[element]?.values?.ST) || 0;
      }) || [];
    return data || null;
  }, [dashboardData, value, currentQuarter]);

  const isAllNaNK = useMemo(() => {
    if (!dashboardData?.SK) {
      return false;
    }
    let sum = 0;
    [1, 2, 3, 4, 5, 6]?.forEach((element) => {
      if (
        dashboardData?.NK[element]?.values?.SM?.find(
          (findElement) => findElement !== "N/A"
        )
      ) {
        sum++;
      }
      if (
        dashboardData?.NK[element]?.values?.ST?.find(
          (findElement) => findElement !== "N/A"
        )
      ) {
        sum++;
      }
    });
    if (sum !== 0) {
      return true;
    }
    return false;
  }, [dashboardData, value, currentQuarter]);

  return (
    <ContainerWrapper isCollapse={isCollapse}>
      <div className="header">
        <PathComponent screen={screen} setScreen={setScreen} />
        <FilterComponent
          disabled={
            patch === SCREEN_DEFAULT[2] ||
            patch === SCREEN_DEFAULT[4] ||
            patch === SCREEN_DEFAULT[6]
          }
          screen={screen}
          setScreen={setScreen}
        />
      </div>
      {patch === SCREEN_DEFAULT[1] || patch === "/" ? (
        <div>
          {!hospitalSelected && (
            <ChartWrapper>
              <ChartContainerWrapper>
                <PairRadarChart
                  data2={[60, 80, 50, 90, 95, 75]}
                  data1={[70, 75, 80, 85, 60, 65]}
                  title="Tiêu chí về Sản khoa"
                />
              </ChartContainerWrapper>

              <ChartContainerWrapper>
                <RadaChart
                  data2={[70, 70, 70, 70, 70, 70]}
                  title={t("chart.pediatric")}
                />
              </ChartContainerWrapper>
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
                {dataRadarST && (
                  <ChartContainerWrapper>
                    <RadaChart
                      data2={dataRadarST}
                      isNomal
                      title={t("chart.vaginalDelievery")}
                    />
                  </ChartContainerWrapper>
                )}
                {dataRadarSM && (
                  <ChartContainerWrapper>
                    <RadaChart
                      data2={dataRadarSM}
                      title={t("chart.CSection")}
                    />
                  </ChartContainerWrapper>
                )}
              </ChartWrapper>
              {
                <HeaderScreen
                  value={value}
                  setValue={(e) => {
                    if (!isAllNaNK) {
                      showConfirm({
                        title: t("dashBoard.pediatricNodata"),
                        hideCancel: true,
                      });
                      return;
                    }
                    setValue(e);
                  }}
                />
              }
              <div className="content-chart">
                {/* <h2>{value}</h2> */}
                {value === EDepartment.OBSTETRIC && (
                  <BornComponent
                    data={ObstetricsData}
                    dataList={dashboardData?.SK}
                  />
                )}
                {value === EDepartment.PEDIATRIC ? (
                  <BornComponent
                    data={ChildData}
                    dataList={dashboardData?.NK}
                  />
                ) : (
                  <div />
                )}
              </div>
            </>
          ) : null}
        </div>
      ) : (
        <div />
      )}

      {patch === SCREEN_DEFAULT[2] && <SurveyLink />}
      {patch === SCREEN_DEFAULT[3] && <RowData />}
      {patch === SCREEN_DEFAULT[4] && <Document title={title} />}
      {patch === SCREEN_DEFAULT[6] && <ExportData />}
      {patch === SCREEN_DEFAULT[7] && <UserManager />}
    </ContainerWrapper>
  );
};

export default AppContainer;

function PathComponent({ screen, setScreen }) {
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
        <span onClick={() => setScreen(1)}>{t("screen.home")}</span> /{" "}
        {screenFake[screen - 1]}
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
          { label: t("dashBoard.obstetricDept"), value: EDepartment.OBSTETRIC },
          { label: t("dashBoard.pediatricDept"), value: EDepartment.PEDIATRIC },
        ]}
        value={value}
        onChange={setValue}
        size="large"
      />
    </div>
  );
}
