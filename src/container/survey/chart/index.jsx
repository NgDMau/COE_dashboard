import React from "react";
import { useMemo } from "react";
import Chart from "react-google-charts";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ChartLinkWrapper } from "./styled";

const ChartLink = ({ dataTableChart, selected }) => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const citiesData = useSelector((state) => state.data.citiesData);
  const { t } = useTranslation();

  const cityName = useMemo(() => {
    if (user?.is_superuser === "True" && selected && selected?.code !== -1) {
      return selected?.name;
    }
    return (
      citiesData?.find(
        (element) => element?.code === Number(user?.province_code)
      )?.name || ""
    );
  });

  const options = {
    title: `${t("chart.surveyStatistics")} - ${cityName}`,
    chartArea: { width: "65%", height: "80%" },
    isStacked: true,
    hAxis: {
      minValue: 0,
      maxValue: 300,
    },
    bar: { groupWidth: 25 },
  };

  return (
    <ChartLinkWrapper>
      <Chart
        chartType="BarChart"
        width="80vw"
        height="600px"
        data={dataTableChart}
        options={options}
      />
    </ChartLinkWrapper>
  );
};

export default ChartLink;
