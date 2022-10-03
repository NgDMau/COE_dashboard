import React from "react";
import HeaderExport from "../header";
import { ChartExportWrapper } from "./styled";
import { useSelector } from "react-redux";
import { LinePoint } from "../../../components/common/line-chart/LinePoint";

const ChartExport = ({ elementST, elementSM, criteria }) => {
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
      {/* <TableChart /> */}
    </ChartExportWrapper>
  );
};

export default ChartExport;
