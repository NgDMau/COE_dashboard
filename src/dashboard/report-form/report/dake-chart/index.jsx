import React from "react";
import Chart from "react-google-charts";

const options = {
  isStacked: true,
  hAxis: {
    title: "Total Population",
    minValue: 0,
  },
  legend: { position: "none" },
};

const ReportChart = ({ color }) => {
  const data = [
    ["City", "2010 Population", { role: "style" }],
    ["66001", 98, color],
    ["66015", 80, color],
    ["66015", 96, color],
    ["66015", 98, color],
    ["66015", 100, color],
    ["66015", 98, color],
    ["66015", 96, color],
  ];

  return (
    <div>
      <Chart
        chartType="BarChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default ReportChart;
