import React from "react";
import Chart from "react-google-charts";
import { ChartLinkWrapper } from "./styled";

const ChartLink = ({ dataTableChart, selected }) => {
  const options = {
    title: `Thống kê khảo sát - ${selected?.name}`,
    chartArea: { width: "60%" },
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
    <ChartLinkWrapper>
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={dataTableChart}
        options={options}
      />
      <div className="certificate">Đã nhận danh hiệu BV xuất sắc 2022</div>
    </ChartLinkWrapper>
  );
};

export default ChartLink;
