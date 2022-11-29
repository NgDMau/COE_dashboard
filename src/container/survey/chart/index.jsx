import React from "react";
import Chart from "react-google-charts";
import { useTranslation } from "react-i18next";
import { ChartLinkWrapper } from "./styled";

const ChartLink = ({ dataTableChart, selected }) => {
  const { t } = useTranslation();
  const options = {
    title: `${t("chart.surveyStatistics")} - ${selected?.name}`,
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
