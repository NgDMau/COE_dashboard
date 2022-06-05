import React from "react";
import Chart from "react-google-charts";

const options = {
  chartArea: { width: "50%" },
  isStacked: true,
  bar: { groupWidth: "30%" },
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
    ["66015", 100, color],
  ];

  return (
    <div>
      <Chart
        chartType="BarChart"
        width="100%"
        height="300px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default ReportChart;
