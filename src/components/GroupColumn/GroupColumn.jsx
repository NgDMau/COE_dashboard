import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getListQuanter } from "../../helpers/getListQuanter";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  ChartDataLabels
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const GroupColumn = ({ department }) => {
  const { t } = useTranslation();
  const dashboardData = useSelector((state) => state?.data?.dashboardData);
  const dataChart = useMemo(() => {
    if (!dashboardData) {
      return null;
    }
    const arrA = [0, 1, 2, 3, 4, 5, 6, 7].map((element) => {
      const data =
        dashboardData[element]?.data[department][department === "SK" ? 11 : 8]
          ?.values?.A || 0;
      return data;
    });
    const arrB = [0, 1, 2, 3, 4, 5, 6, 7].map((element) => {
      const data =
        dashboardData[element]?.data[department][department === "SK" ? 11 : 8]
          ?.values?.B || 0;
      return data;
    });
    const Line = [0, 1, 2, 3, 4, 5, 6, 7].map((element) => {
      const data =
        dashboardData[element]?.data[department][department === "SK" ? 11 : 8]
          ?.values?.PER || 0;
      return data;
    });
    return {
      AData: arrA,
      BData: arrB,
      lineData: Line,
    };
  }, [dashboardData, department]);
  console.log("dataChartdataChartdataChart", dataChart);
  const data = {
    labels,
    datasets: [
      {
        type: "line",
        label: t("obstetricsData.radar_5"),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(255, 99, 132,0.8)",

        // pointStyle: renderCircle("5", 25, `rgb(9, 132, 227, 0.8)`),
        yAxisID: "y1",
        borderWidth: 0,
        pointRadius: 12,
        fill: false,
        data: dataChart?.lineData,
        datalabels: { textAlign: "center", color: "white" },
      },
      {
        type: "bar",
        label: t("exportData.formulaMilk"),
        backgroundColor: "rgb(75, 192, 192)",
        data: dataChart?.AData,
        borderColor: "white",
        borderWidth: 2,
        datalabels: {},
      },
      {
        type: "bar",
        label: t("exportData.hospitalPremises"),
        datalabels: {},

        backgroundColor: "rgb(53, 162, 235)",
        data: dataChart?.BData,
      },
    ],
  };
  // const options = {
  //   type: "line",
  //   data: data,
  //   options: {
  //     responsive: true,
  //     interaction: {
  //       mode: "index",
  //       intersect: false,
  //     },
  //     stacked: false,
  //     plugins: {
  //       title: {
  //         display: true,
  //         text: "Chart.js Line Chart - Multi Axis",
  //       },
  //     },
  //     scales: {
  //       y: {
  //         type: "linear",
  //         display: true,
  //         position: "left",
  //       },
  //       y1: {
  //         type: "linear",
  //         display: true,
  //         position: "right",
  //         labels: (value) => {
  //           console.log(value);
  //           return 10;
  //         },
  //         min: 0,
  //         max: 100,
  //         // grid line settings
  //         grid: {
  //           drawOnChartArea: false, // only want the grid lines for one axis to show up
  //         },
  //       },
  //     },
  //   },
  // };
  return (
    <Chart
      options={{
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
          },
          y1: {
            ticks: {
              // Include a dollar sign in the ticks
              callback: function (value, index, ticks) {
                return value + "%";
              },
            },
            min: -10,
            max: 100,
            type: "linear",
            display: true,
            position: "right",

            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        },
      }}
      type="bar"
      data={data}
    />
  );
};

export default GroupColumn;
