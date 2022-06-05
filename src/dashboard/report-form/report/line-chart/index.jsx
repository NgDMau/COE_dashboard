import React from "react";
import Chart from "react-google-charts";

const options = {
  title: "Company Performance",
  // hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
  vAxis: { minValue: 0 },
  chartArea: { width: "85%", height: "70%" },
  legend: { position: "none" },
};

const ReportLineChart = ({ color }) => {
  const data = [
    ["Quý", "Sales", "Expenses"],
    ["Q1/2021", 100, 85],
    ["Q2/2021", 80, 90],
    ["Q3/2021", 72, 100],
    ["Q4/2021", 90, 72],
    ["Q1/2022", 85, 85],
    ["Q2/2022", 100, 90],
    ["Q3/2022", 80, 87],
    ["Q4/2022", 85, 100],

  ];

  return (
    <div>
      <Chart
        chartType="AreaChart"
        width="400px"
        height="300px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default ReportLineChart;
