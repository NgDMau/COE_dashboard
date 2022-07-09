import React from "react";
import Chart from "react-google-charts";

const data = [
  ["City", "2010 Population", "2000 Population", "Clothing"],
  ["New York City, NY", 8175000, 8008000, 1800800],
  ["Los Angeles, CA", 3792000, 3694000, 1800800],
  ["Chicago, IL", 2695000, 2896000, 1800800],
  ["Houston, TX", 2099000, 1953000, 1800800],
  ["Philadelphia, PA", 1526000, 1517000, 1800800],
];
const options = {
  title: "Population of Largest U.S. Cities",
  chartArea: { width: "50%" },
  isStacked: true,
  hAxis: {
    title: "Total Population",
    minValue: 0,
  },
};
const ChartLink = () => {
  return (
    <div>
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default ChartLink;
