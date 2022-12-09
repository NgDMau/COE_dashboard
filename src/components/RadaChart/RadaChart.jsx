import React from "react";
// import { Radar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { RadarWrapper, TitleChart } from "./styled";
import { Radar } from "@ant-design/plots";

const RadaChart = React.meno(({ data2, isNormal, title, lables }) => {
  const { t } = useTranslation();
  const labelsData = lables || [
    t("obstetricsData.radar_1"),
    t("obstetricsData.radar_2"),
    t("obstetricsData.radar_3"),
    t("obstetricsData.radar_4"),
    t("obstetricsData.radar_5"),
    t("obstetricsData.radar_6"),
  ];

  const data =
    data2?.map((element, index) => {
      return {
        item: labelsData[index],
        score: element,
      };
    }) || [];

  const config = {
    data,
    fill: "red",
    xField: "item",

    yField: "score",

    seriesField: "type",

    legend: false,

    meta: {
      score: {
        alias: "score",

        min: 0,

        max: 100,
      },
    },
    xAxis: {
      line: null,

      tickLine: null,

      // label: null,

      grid: {
        line: {
          style: {
            lineDash: null,
            stroke: "#CFD8DC",
          },
        },
      },
    },
    yAxis: {
      line: null,

      tickLine: null,

      grid: {
        line: {
          type: "line",

          style: {
            lineDash: null,

            stroke: "#CFD8DC",
          },
        },
      },
    },

    area: { color: ["rgba(254, 166, 40, 1)", "rgb(45, 153, 255,0.24)"] },
    point: {
      size: 6,
      stroke: "red",
      shape: "circle",
      color: (datum) => {
        return isNormal ? "#FEA628" : "#5A6882";
      },
    },

    lineStyle: (x) => {
      return {
        stroke: isNormal ? "#FEA628" : "#5A6882",
        shadowColor: "#FEA628",
        lineWidth: 3,
      };
    },
  };
  return (
    <RadarWrapper>
      <TitleChart>{title}</TitleChart>
      <Radar {...config} />
    </RadarWrapper>
  );
});

export default RadaChart;
