import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { sendGet } from "../../../api/axios";
import PairRadarChart from "../../../components/RadaChart/PairRadarChart";
import RadaChart from "../../../components/RadaChart/RadaChart";
import { storeSetCityOverviewData } from "../../../store/data-reducer";
import { ChartContainerWrapper, ChartWrapper } from "../../styled";

const CityOverview = ({ setIsLoading }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const citySelected = useSelector((state) => state.data.citySelected);
  const currentQuarter = useSelector((state) => state?.data?.currentQuarter);
  const overviewCity = useSelector((state) => state.data.overviewCity);

  const checkValue = (dashboardDataProps) => {
    if (!dashboardDataProps) return 0;
    if (dashboardDataProps === "N/A" || !dashboardDataProps) return 0;
    return dashboardDataProps;
  };

  const getOverviewCountry = async () => {
    try {
      setIsLoading(false);
      const response = await sendGet(`/dm/data/country/overview`);
      if (response) {
        dispatch(storeSetCityOverviewData(response));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (citySelected) {
      getOverviewCountry();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citySelected]);

  const dataRadarSK = useMemo(() => {
    if (!overviewCity) {
      return null;
    }
    const dataST =
      [1, 2, 3, 4, 5, 6]?.map((element) => {
        if (!overviewCity[currentQuarter]?.data?.SK) return null;

        return (
          checkValue(
            overviewCity[currentQuarter]?.data?.SK[element]?.values?.ST
          ) || 0
        );
      }) || [];
    const dataSM =
      [1, 2, 3, 4, 5, 6]?.map((element) => {
        if (!overviewCity[currentQuarter]?.data?.SK) return null;

        return (
          checkValue(
            overviewCity[currentQuarter]?.data?.SK[element]?.values?.SM
          ) || 0
        );
      }) || [];
    return {
      ST: dataST,
      SM: dataSM,
    };
  }, [overviewCity, currentQuarter]);
  const dataRadarNK = useMemo(() => {
    if (!overviewCity) {
      return null;
    }
    const dataST =
      [1, 2, 3, 4, 5, 6]?.map((element) => {
        if (!overviewCity[currentQuarter]?.data?.NK) return null;

        return (
          checkValue(
            overviewCity[currentQuarter]?.data?.NK[element]?.values?.ST
          ) || 0
        );
      }) || [];
    return dataST;
  }, [overviewCity, currentQuarter]);
  console.log("11111", 111);
  return (
    <ChartWrapper>
      <ChartContainerWrapper>
        <PairRadarChart
          data2={dataRadarSK?.ST}
          data1={dataRadarSK?.SM}
          title={t("overview.criteriaObstetrics")}
        />
      </ChartContainerWrapper>

      <ChartContainerWrapper>
        <RadaChart data2={dataRadarNK} title={t("chart.pediatric")} />
      </ChartContainerWrapper>
    </ChartWrapper>
  );
};

export default CityOverview;
