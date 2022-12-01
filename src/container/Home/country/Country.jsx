import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { sendGet } from "../../../api/axios";
import { ChartContainerWrapper, ChartWrapper } from "../../styled";

import RadaChart from "../../../components/RadaChart/RadaChart";
import VietNamChart from "../../../components/VietNamChart/VietNamChart";
import PairRadarChart from "../../../components/RadaChart/PairRadarChart";

const Country = () => {
  const { t } = useTranslation();
  const hospitalSelected = useSelector(
    (state) => state?.data?.hospitalSelected
  );
  const getOverviewCountry = async () => {
    try {
      const response = await sendGet(`/dm/data/country/overview`);
      if (response) {
        console.log(response);
      }
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    if (!hospitalSelected) {
      getOverviewCountry();
    }
  }, [hospitalSelected]);

  return (
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
  );
};

export default Country;
