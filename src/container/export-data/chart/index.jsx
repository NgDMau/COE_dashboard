import React from "react";
import HeaderExport from "../header";
import { ChartExportWrapper } from "./styled";
import { useSelector } from "react-redux";
import { LinePoint } from "../../../components/common/line-chart/LinePoint";
import TableChart from "./table-chart";

const ChartExport = ({ elementST, elementSM, criteria, index, department }) => {
  const dashboardData = useSelector((state) => state?.data?.dashboardData);
  return (
    <ChartExportWrapper>
      <HeaderExport />
      <div className="chart">
        <div className="title">{criteria}</div>
        <LinePoint
          dataST={elementST}
          dataSM={elementSM}
          time={dashboardData?.time}
        />
      </div>
      <TableChart index={index} criteria={criteria} department={department} />
    </ChartExportWrapper>
  );
};

export default ChartExport;
