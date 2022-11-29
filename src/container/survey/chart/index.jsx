import React from "react";
import Chart from "react-google-charts";
import { useTranslation } from "react-i18next";
import { ChartLinkWrapper } from "./styled";

const ChartLink = ({ dataTableChart, selected }) => {
  const { t } = useTranslation();
  const options = {
    title: `${t("chart.surveyStatistics")} - ${selected?.name}`,
    chartArea: { width: "65%" },
    isStacked: true,
    // hAxis: {
    //   minValue: 0,
    //   maxValue: 300,
    // },
    bar: { groupWidth: 40 },
    vAxis: {
      viewWindow: {
        max: 300,
        min: 0,
      },
    },
  };

  return (
    <ChartLinkWrapper>
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={dataTableChart}
        options={options}
      />
    </ChartLinkWrapper>
  );
};

export default ChartLink;
