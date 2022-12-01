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
import { useLableData } from "../../hooks/useLableData";
import BornComponent from "../born";
import { ChartContainerWrapper, ChartWrapper, SpinWrapper } from "../styled";

const Home = ({ isLoading, value, setValue }) => {
  const { t } = useTranslation();
  const currentQuarter = useSelector((state) => state?.data?.currentQuarter);
  const citySelected = useSelector((state) => state.data.citySelected);
  const hospitalSelected = useSelector(
    (state) => state?.data?.hospitalSelected
  );
  const dashboardData = useSelector((state) => state?.data?.dashboardData);

  const { ObstetricsData, ChildData, labelsNK } = useLableData();

  const isAllNaNK = useMemo(() => {
    return true;
  }, []);

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
        if (element === 5) {
          const sevenData =
            value === 1
              ? checkValue(
                  dashboardData[currentQuarter]?.data?.SK[7]?.values?.ST
                ) || 0
              : checkValue(
                  dashboardData[currentQuarter]?.data?.NK[6]?.values?.ST
                ) || 0;
          const eightData =
            value === 1
              ? checkValue(
                  dashboardData[currentQuarter]?.data?.SK[8]?.values?.ST
                ) || 0
              : checkValue(
                  dashboardData[currentQuarter]?.data?.NK[7]?.values?.ST
                ) || 0;
          return (sevenData + eightData) / 2;
        }
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
        if (element === 5) {
          const sevenData =
            value === 1
              ? checkValue(dashboardData[7]?.data?.SK[element]?.values?.SM)
              : checkValue(dashboardData[6]?.data?.NK[element]?.values?.SM);
          const eightData =
            value === 1
              ? checkValue(dashboardData[8]?.data?.SK[element]?.values?.SM)
              : checkValue(dashboardData[7]?.data?.NK[element]?.values?.SM);
          return (sevenData + eightData) / 2;
        }
        return value === 1
          ? checkValue(
              dashboardData[currentQuarter]?.data?.SK[element]?.values?.SM
            )
          : checkValue(
              dashboardData[currentQuarter]?.data?.NK[element]?.values?.SM
            );
      }) || [];
    return data || null;
  }, [dashboardData, value, currentQuarter]);

  return (
    <div>
      {!hospitalSelected && (
        <>
          {!citySelected && !isLoading ? (
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
          ) : (
            <ChartWrapper>
              <ChartContainerWrapper>
                <PairRadarChart
                  data2={[23, 79, 87, 98, 78, 65]}
                  data1={[34, 56, 87, 54, 43, 43]}
                  title="Tiêu chí về Sản khoa"
                />
              </ChartContainerWrapper>

              <ChartContainerWrapper>
                <RadaChart
                  data2={[34, 56, 87, 54, 43, 43]}
                  title={t("chart.pediatric")}
                />
              </ChartContainerWrapper>
            </ChartWrapper>
          )}
        </>
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
                  isNormal
                  title={
                    value === EDepartment.OBSTETRIC
                      ? t("chart.vaginalDelievery")
                      : ""
                  }
                />
              </ChartContainerWrapper>
            )}
            {dataRadarSM && value === EDepartment.OBSTETRIC ? (
              <ChartContainerWrapper>
                <RadaChart
                  data2={dataRadarSM}
                  title={t("chart.CSection")}
                  lables={labelsNK}
                />
              </ChartContainerWrapper>
            ) : (
              <div />
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
