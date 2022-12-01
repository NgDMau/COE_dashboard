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

const Country = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const overviewCountry = useSelector((state) => state.data.overviewCountry);
  const currentQuarter = useSelector((state) => state?.data?.currentQuarter);
  const hospitalSelected = useSelector(
    (state) => state?.data?.hospitalSelected
  );

  const checkValue = (dashboardDataProps) => {
    if (!dashboardDataProps) return 0;
    if (dashboardDataProps === "N/A" || !dashboardDataProps) return 0;
    return dashboardDataProps;
  };

  const getOverviewCountry = async () => {
    try {
      const response = await sendGet(`/dm/data/country/overview`);
      if (response) {
        dispatch(storeSetCountryOverviewData(response));
      }
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    if (!hospitalSelected) {
      getOverviewCountry();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hospitalSelected]);

  const dataRadarSK = useMemo(() => {
    if (!overviewCountry) {
      return null;
    }
    const dataST =
      [1, 2, 3, 4, 5, 6]?.map((element) => {
        if (!overviewCountry[currentQuarter]?.data?.SK) return null;

        return (
          checkValue(
            overviewCountry[currentQuarter]?.data?.SK[element]?.values?.ST
          ) || 0
        );
      }) || [];
    const dataSM =
      [1, 2, 3, 4, 5, 6]?.map((element) => {
        if (!overviewCountry[currentQuarter]?.data?.SK) return null;

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
      [1, 2, 3, 4, 5, 6]?.map((element) => {
        if (!overviewCountry[currentQuarter]?.data?.NK) return null;

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
      </ChartContainerWrapper>

      <ChartContainerWrapper>
        <RadaChart data2={dataRadarNK} title={t("chart.pediatric")} />
      </ChartContainerWrapper>
      <VietNamChart />
    </ChartWrapper>
  );
};

export default Country;
