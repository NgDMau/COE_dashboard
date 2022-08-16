import React from "react";
import Chart from "react-google-charts";

const data = [
  ["hospital_name", "no_D1TT", "no_SM", "no_ST"],
  ["BV Phụ sản Nhi Đà Nẵng", 14, 27, 37],
  ["Bệnh viện Gia đình Đà Nẵng", 92, 21, 25],
  ["TTYT Quận Cẩm Lệ", 42, 18, 98],
  ["TTYT Quận Sơn Trà", 61, 14, 79],
  ["TTYT Quận Hải Châu", 64, 70, 67],
];

const ChartLink = ({ dataTableChart, selected }) => {
  const options = {
    title: `Thống kê khảo sát - ${selected.name}`,
    chartArea: { width: "50%" },
    isStacked: true,
    // hAxis: {
    //   minValue: 0,
    //   maxValue: 300,
    // },
    vAxis: {
      viewWindow: {
        max: 300,
        min: 0,
      },
    },
  };

  return (
    <div>
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={dataTableChart}
        options={options}
      />
    </div>
  );
};

export default ChartLink;
