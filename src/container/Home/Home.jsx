import { Spin } from "antd";
import React from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { HeaderScreen } from "..";
import { EDepartment } from "../../common/const";
import PairRadarChart from "../../components/RadaChart/PairRadarChart";
import RadaChart from "../../components/RadaChart/RadaChart";
import VietNamChart from "../../components/VietNamChart/VietNamChart";
import { showConfirm } from "../../helpers/modal-confirm";
import BornComponent from "../born";
import { ChartContainerWrapper, ChartWrapper, SpinWrapper } from "../styled";

const Home = ({ isLoading, value, setValue }) => {
  const { t } = useTranslation();
  const currentQuarter = useSelector((state) => state?.data?.currentQuarter);

  const hospitalSelected = useSelector(
    (state) => state?.data?.hospitalSelected
  );
  const dashboardData = useSelector((state) => state?.data?.dashboardData);

  const isAllNaNK = useMemo(() => {
    return true;
  }, []);

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

  const checkValue = (dashboardDataProps) => {
    if (!dashboardDataProps) return 0;
    if (dashboardDataProps === "N/A" || !dashboardDataProps) return 0;
    return dashboardDataProps;
  };

  const dataRadarST = useMemo(() => {
    if (!dashboardData) {
      return null;
    }
    const data =
      [1, 2, 3, 4, 5, 6]?.map((element) => {
        if (value === 1 && !dashboardData[currentQuarter]?.data?.SK)
          return null;
        if (value === 2 && !dashboardData[currentQuarter]?.data?.NK)
          return null;
        return value === 1
          ? checkValue(
              dashboardData[currentQuarter]?.data?.SK[element]?.values?.ST
            ) || 0
          : checkValue(
              dashboardData[currentQuarter]?.data?.NK[element]?.values?.ST
            ) || 0;
      }) || [];
    return data || null;
  }, [dashboardData, value, currentQuarter]);
  const dataRadarSM = useMemo(() => {
    if (!dashboardData) {
      return null;
    }
    const data =
      [1, 2, 3, 4, 5, 6]?.map((element) => {
        if (value === 1 && !dashboardData[currentQuarter]?.data?.SK)
          return null;
        if (value === 2 && !dashboardData[currentQuarter]?.data?.NK)
          return null;
        return value === 1
          ? checkValue(
              dashboardData[currentQuarter]?.data?.SK[element]?.values?.SM
            ) || 0
          : checkValue(
              dashboardData[currentQuarter]?.data?.NK[element]?.values?.SM
            ) || 0;
      }) || [];
    return data || null;
  }, [dashboardData, value, currentQuarter]);

  return (
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
                <RadaChart data2={dataRadarSM} title={t("chart.CSection")} />
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
            {value === EDepartment.OBSTETRIC && (
              <BornComponent
                data={ObstetricsData}
                dataList={dashboardData}
                department="SK"
              />
            )}
            {value === EDepartment.PEDIATRIC ? (
              <BornComponent
                data={ChildData}
                dataList={dashboardData}
                department="NK"
              />
            ) : (
              <div />
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Home;
