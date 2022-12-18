import React from "react";
import { Spin } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { HeaderScreen } from "..";
import { EDepartment } from "../../common/const";
import { showConfirm } from "../../helpers/modal-confirm";
import { useLableData } from "../../hooks/useLableData";
import { ChartContainerWrapper, ChartWrapper, SpinWrapper } from "../styled";

import CountryOverview from "./countryOverview/CountryOverview";
import BornComponent from "../born";
import CityOverview from "./cityOverView/CityOverview";
import RadaChart from "../../components/RadaChart/RadaChart";

const Home = ({ isLoading, value, setValue, setIsLoading }) => {
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
                  dashboardData[currentQuarter]?.data?.SK[11]?.values?.PER
                ) || 0
              : checkValue(
                  dashboardData[currentQuarter]?.data?.NK[8]?.values?.PER
                ) || 0;
          return sevenData;
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
              ? checkValue(
                  dashboardData[currentQuarter]?.data?.SK[11]?.values?.PER
                ) || 0
              : checkValue(
                  dashboardData[currentQuarter]?.data?.NK[8]?.values?.PER
                ) || 0;
          return sevenData;
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
      {!hospitalSelected || hospitalSelected?.code === -1 ? (
        <>
          {!citySelected || citySelected?.code === -1 ? (
            <CountryOverview setIsLoading={setIsLoading} />
          ) : (
            <CityOverview setIsLoading={setIsLoading} />
          )}
        </>
      ) : (
        <div />
      )}

      {isLoading && (
        <SpinWrapper>
          <Spin size="large" />
        </SpinWrapper>
      )}
      {hospitalSelected && hospitalSelected?.code !== -1 && !isLoading ? (
        <>
          <ChartWrapper>
            {dataRadarST && (
              <ChartContainerWrapper>
                <RadaChart
                  data2={dataRadarST}
                  isNormal
                  lables={value !== EDepartment.OBSTETRIC && labelsNK}
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
                <RadaChart data2={dataRadarSM} title={t("chart.CSection")} />
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
