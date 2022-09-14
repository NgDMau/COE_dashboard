import React from "react";
import { Radar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { RadarWrapper } from "./styled";

const RadaChart = ({ data, isNomal }) => {
  const dataChart = data ? data : [70, 70, 70, 70, 70, 70];
  const { t } = useTranslation();
  const RadarData = {
    labels: [
      t("obstetricsData.obstetricsKS_1"),
      t("obstetricsData.obstetricsKS_2"),
      t("obstetricsData.obstetricsKS_3"),
      t("obstetricsData.obstetricsKS_4"),
      t("obstetricsData.obstetricsKS_5"),
      t("obstetricsData.obstetricsKS_6"),
    ],
    datasets: [
      {
        label: isNomal ? t("born.vaginalDelivery") : t("born.Csection"),
        backgroundColor: isNomal
          ? "rgba(255, 99, 132, 0.5)"
          : "rgba(34, 202, 236, .2)",
        borderColor: isNomal ? "rgb(255, 99, 132)" : "rgba(34, 202, 236, 1)",
        pointBackgroundColor: isNomal
          ? "rgb(255, 99, 132)"
          : "rgba(34, 202, 236, 1)",
        poingBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: isNomal
          ? "rgb(255, 99, 132)"
          : "rgba(34, 202, 236, 1)",
        data: dataChart,
      },
    ],
  };
  const RadarOptions = {
    scale: {
      min: 0,
      max: 100,
      ticks: {
        stepSize: 20,
        showLabelBackdrop: false,
        backdropColor: "rgba(203, 197, 11, 1)",
      },
      angleLines: {
        color: "rgba(255, 255, 255, .3)",
        lineWidth: 1,
      },
      gridLines: {
        color: "rgba(255, 255, 255, .3)",
        circular: true,
      },
    },
  };

  return (
    <RadarWrapper>
      <Radar data={RadarData} options={RadarOptions} />
    </RadarWrapper>
  );
};

export default RadaChart;
