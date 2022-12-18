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
import { faker } from "@faker-js/faker";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

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
  style: {
    strokewidth: 10,
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "right",
      step: 5,
      min: -10,
      max: 110,
    },
  },
};

export function LinePoint({
  dataST,
  dataSM,
  time,
  hiddenCaesarean,
  department,
  passLevelST,
  passLevelSM,
}) {
  const { t } = useTranslation();
  const labels = Array.from({ length: 8 }, (_, i) => {
    return time ? time[i] : "";
  });

  const position = (value) => {
    if (!value && value !== 0) return "0";
    if (value === 100) {
      return "6";
    }
    if (value === 0) return "18";
    return "12";
  };

  const renderCircle = (innerText = "100", size = 30, color = "red") => {
    const svg_encoded = encodeURIComponent(`
    <svg width="49" height="52" viewBox="0 0 49 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="49" height="52" rx="24.5" fill="${color}"/>
      <text x="${position(
        innerText
      )}" y="33" font-size="1.5em" font-weight="bold" fill="white">${innerText}</text>
    </svg>
    `);
    const svg_uri = `data:image/svg+xml;charset=UTF-8,${svg_encoded}`;
    const illu = new Image(size, size);
    illu.src = svg_uri;
    return illu;
  };

  function difference(a, b) {
    return Math.abs(a - b);
  }

  function findMin(a, b) {
    if (a > b) {
      return b;
    }
    return a;
  }

  const dataSMFormat = useMemo(() => {
    let sum = 0;
    const listNull = [];
    const format = dataSM.map((element, index) => {
      if (element !== null) {
        sum++;
      }
      if (sum !== 0 && element === null) {
        let space = 0;
        let nextData = [];
        let leftData = null;
        let min = 0;
        let max = [];
        for (let i = 0; i < dataSM?.length; i++) {
          if (index > i && dataSM[i] !== null) {
            leftData = dataSM[i];
            min = i;
          }
          if (index < i && dataSM[i] !== null) {
            nextData.push(dataSM[i]);
            max.push(i);
          }
          if (dataSM[i] === null) {
            space += 1;
          }
        }
        if (nextData?.length > 0 && space !== 0 && leftData !== null) {
          const TU =
            (difference(leftData, nextData[0]) * (index - min)) /
            (max[0] - min);
          listNull.push(index);
          return TU + findMin(leftData, nextData[0]);
        }
      }
      return element;
    });
    return {
      format,
      listNull,
    };
  }, [dataSM]);

  const dataSTFormat = useMemo(() => {
    let sum = 0;
    const listNull = [];
    const format = dataST.map((element, index) => {
      if (element !== null) {
        sum++;
      }
      if (sum !== 0 && element === null) {
        let nextData = [];
        let leftData = null;
        let min = 0;
        let max = [];
        for (let i = 0; i < dataST?.length; i++) {
          if (index > i && dataST[i] !== null) {
            leftData = dataST[i];
            min = i;
          }
          if (index < i && dataST[i] !== null) {
            nextData.push(dataST[i]);
            max.push(i);
          }
        }
        if (nextData?.length > 0 && leftData !== null) {
          const TU =
            (difference(leftData, nextData[0]) * (index - min)) /
            (max[0] - min);
          listNull.push(index);
          return TU + findMin(leftData, nextData[0]);
        }
      }
      return element;
    });
    return {
      format,
      listNull,
    };
  }, [dataST]);

  const rateCaesarean = passLevelSM === null ? passLevelSM : passLevelSM || 75;
  const rateNormal = passLevelST === null ? passLevelST : passLevelST || 0;

  const dataSK = {
    labels,

    datasets: [
      {
        label: t("chart.vaginalDelievery"),
        data: dataSTFormat?.format || [],
        borderColor: "#0984e3",
        backgroundColor: "rgb(9, 132, 227,0.5)",
        pointStyle: dataSTFormat?.format?.map((element) =>
          renderCircle(element, 25, `rgb(9, 132, 227, 0.8)`)
        ),
        borderWidth: 2,
        pointRadius: (element) => {
          const checked = dataSTFormat?.listNull.find(
            (elementFind) => elementFind === element?.index
          );
          return checked ? 0 : 6;
        },
        pointHoverRadius: (element) => {
          const checked = dataSTFormat?.listNull.find(
            (elementFind) => elementFind === element?.index
          );
          return checked ? 0 : 6;
        },
      },
      {
        label: t("chart.CSection"),
        data: dataSMFormat?.format || [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointStyle: dataSTFormat?.format?.map((element) =>
          renderCircle(element, 25, `rgba(255, 99, 132, 0.8)`)
        ),
        borderWidth: 2,
        pointRadius: (element) => {
          const checked = dataSMFormat?.listNull.find(
            (elementFind) => elementFind === element?.index
          );
          return checked ? 0 : 6;
        },
        pointHoverRadius: (element) => {
          const checked = dataSMFormat?.listNull.find(
            (elementFind) => elementFind === element?.index
          );
          return checked ? 0 : 6;
        },
      },
      {
        label: t("chart.normalRate"),
        fill: false,
        backgroundColor: "#0984e3",
        borderColor: "#0984e3",
        borderDash: [5, 5],
        data: labels.map(() =>
          faker.datatype.number({ min: rateNormal, max: rateNormal })
        ),
        borderWidth: 2,
        pointStyle: "hidden",
        pointRadius: 0,
        pointHoverRadius: 0,
      },
      {
        label: t("chart.caesareanRate"),
        fill: false,
        backgroundColor: "red",
        borderColor: "red",
        borderDash: [3, 3],
        borderWidth: 2,
        data: labels.map(() =>
          faker.datatype.number({ min: rateCaesarean, max: rateCaesarean })
        ),
        pointStyle: "hidden",
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  };

  if (hiddenCaesarean) {
    dataSK.datasets.pop();
    dataSK.datasets.pop();
  }

  const dataNK = {
    labels,
    datasets: [
      {
        label: t("chart.parameter"),
        data: dataSTFormat?.format || [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointStyle: dataSTFormat?.format?.map((element) =>
          renderCircle(element, 25, `rgba(255, 99, 132, 0.8)`)
        ),
        borderWidth: 2,
        pointRadius: (element) => {
          const checked = dataSTFormat?.listNull.find(
            (elementFind) => elementFind === element?.index
          );
          return checked ? 0 : 6;
        },
        pointHoverRadius: (element) => {
          const checked = dataSTFormat?.listNull.find(
            (elementFind) => elementFind === element?.index
          );
          return checked ? 0 : 6;
        },
      },
      {
        label: t("chart.passLevel"),
        fill: false,
        backgroundColor: "red",
        borderColor: "red",
        borderDash: [5, 5],
        borderWidth: 2,
        data: labels.map(() =>
          faker.datatype.number({ min: rateNormal, max: rateNormal })
        ),
        pointStyle: "hidden",
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  };

  return (
    <Line options={options} data={department === "NK" ? dataNK : dataSK} />
  );
}
