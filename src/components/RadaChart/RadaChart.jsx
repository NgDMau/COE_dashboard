import React from "react";
import { Radar } from "react-chartjs-2";
import { RadarWrapper } from "./styled";

const RadaChart = () => {
  const RadarData = {
    labels: [
      "Thực hiện da kề da",
      "Thực hiện da kề da đủ 90 phút",
      "Không cách ly mẹ con",
      "Hoàn thành cữ bú đầu tiên trong 1h đầu sau sinh",
      "Bú mẹ hoàn toàn trong lúc ở viện",
      "Nhân viên y tế tư vấn NCBSM cho sản phụ sau sinh",
    ],
    datasets: [
      {
        label: "March",
        backgroundColor: "rgba(34, 202, 236, .2)",
        borderColor: "rgba(34, 202, 236, 1)",
        pointBackgroundColor: "rgba(34, 202, 236, 1)",
        poingBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(34, 202, 236, 1)",
        data: [70, 70, 70, 70, 70, 70],
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
