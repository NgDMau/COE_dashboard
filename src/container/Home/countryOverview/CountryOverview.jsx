import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { sendGet } from "../../../api/axios";
import { ChartContainerWrapper, ChartWrapper } from "../../styled";

import RadaChart from "../../../components/RadaChart/RadaChart";
import VietNamChart from "../../../components/VietNamChart/VietNamChart";
import PairRadarChart from "../../../components/RadaChart/PairRadarChart";
import { storeSetCountryOverviewData } from "../../../store/data-reducer";
import { useMemo } from "react";
import ExplainChart from "../explainChart/ExplaonChart";
import { useLableData } from "../../../hooks/useLableData";

const CountryOverview = ({ setIsLoading }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const overviewCountry = useSelector((state) => state.data.overviewCountry);
  const currentQuarter = useSelector((state) => state?.data?.currentQuarter);
  const citySelected = useSelector((state) => state.data.citySelected);
  const { labelsNK } = useLableData();

  const checkValue = (dashboardDataProps) => {
    if (!dashboardDataProps) return 0;
    if (dashboardDataProps === "N/A" || !dashboardDataProps) return 0;
    return dashboardDataProps;
  };

  const getOverviewCountry = async () => {
    try {
      setIsLoading(true);
      const response = await sendGet(`/dm/data/country/overview`);
      if (response) {
        dispatch(storeSetCountryOverviewData(response));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!citySelected || citySelected?.code === -1) {
      getOverviewCountry();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citySelected]);

  const dataRadarSK = useMemo(() => {
    if (!overviewCountry) {
      return null;
    }
    const dataST =
      [2, 3, 4, 5, 6, 11]?.map((element) => {
        if (!overviewCountry[currentQuarter]?.data?.SK) return null;
        if (element === 11) {
          const sevenData =
            checkValue(
              overviewCountry[currentQuarter]?.data?.NK[11]?.values?.PER
            ) || 0;
          return sevenData;
        }
        return (
          checkValue(
            overviewCountry[currentQuarter]?.data?.SK[element]?.values?.ST
          ) || 0
        );
      }) || [];
    const dataSM =
      [2, 3, 4, 5, 6, 11]?.map((element) => {
        if (!overviewCountry[currentQuarter]?.data?.SK) return null;
        if (element === 11) {
          const sevenData =
            checkValue(
              overviewCountry[currentQuarter]?.data?.NK[11]?.values?.PER
            ) || 0;
          return sevenData;
        }
        return (
          checkValue(
            overviewCountry[currentQuarter]?.data?.SK[element]?.values?.SM
          ) || 0
        );
      }) || [];
    return {
      ST: dataST,
      SM: dataSM,
    };
  }, [overviewCountry, currentQuarter]);
  const dataRadarNK = useMemo(() => {
    if (!overviewCountry) {
      return null;
    }
    const dataST =
      [1, 2, 3, 4, 5, 8]?.map((element) => {
        if (!overviewCountry[currentQuarter]?.data?.NK) return null;
        if (element === 8) {
          const sevenData =
            checkValue(
              overviewCountry[currentQuarter]?.data?.NK[8]?.values?.PER
            ) || 0;
          return sevenData;
        }
        return (
          checkValue(
            overviewCountry[currentQuarter]?.data?.NK[element]?.values?.ST
          ) || 0
        );
      }) || [];
    return dataST;
  }, [overviewCountry, currentQuarter]);

  return (
    <ChartWrapper>
      <ChartContainerWrapper>
        <PairRadarChart
          data2={dataRadarSK?.ST}
          data1={dataRadarSK?.SM}
          title={t("overview.criteriaObstetrics")}
        />
        <ExplainChart />
      </ChartContainerWrapper>

      <ChartContainerWrapper>
        <RadaChart
          data2={dataRadarNK}
          title={t("chart.pediatric")}
          lables={labelsNK}
        />
      </ChartContainerWrapper>
      <ChartContainerWrapper>
        <VietNamChart countryData={overviewCountry} />
      </ChartContainerWrapper>
    </ChartWrapper>
  );
};

export default CountryOverview;
