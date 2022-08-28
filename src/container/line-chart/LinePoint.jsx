import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "right",
      min: -0,
      // grid: {
      //   display: false,
      // },
    },
    x: {
      // grid: {
      //   display: false,
      // },
    },
  },
};

export function LinePoint({ dataST, dataSM, time }) {
  const labels = Array.from({ length: 8 }, (_, i) => {
    return time ? time[i] : "";
  });
  const data = {
    labels,
    datasets: [
      {
        label: "Sinh thường",
        data: dataST || [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointStyle: "circle",
        pointRadius: 6,
        pointHoverRadius: 10,
      },
      {
        label: "Sinh mổ",
        data: dataSM || [],
        borderColor: "#0984e3",
        backgroundColor: "rgb(9, 132, 227,0.5)",
        pointStyle: "circle",
        pointRadius: 6,
        pointHoverRadius: 10,
      },
      {
        label: "Mức sinh mổ",
        fill: false,
        backgroundColor: "red",
        borderColor: "red",
        borderDash: [5, 5],
        data: labels.map(() => faker.datatype.number({ min: 75, max: 75 })),
        pointStyle: "hidden",
      },
      {
        label: "Mức sinh thường",
        fill: false,
        backgroundColor: "#0984e3",
        borderColor: "#0984e3",
        borderDash: [5, 5],
        data: labels.map(() => faker.datatype.number({ min: 70, max: 70 })),
        pointStyle: "hidden",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
