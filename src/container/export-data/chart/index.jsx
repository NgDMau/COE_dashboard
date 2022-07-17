import React from "react";
import { LinePoint } from "../../line-chart/LinePoint";
import HeaderExport from "../header";
import { ChartExportWrapper } from "./styled";
import TableChart from "./table-chart";

const ChartExport = () => {
  return (
    <ChartExportWrapper>
      <HeaderExport />
      <div className="chart">
        <div className="title">
          Chỉ số 1a. EENC - Tỷ lệ ca có thực hiện da kề da và thực hiện da kề da
          đúng yêu cầu (đủ 90 phút liên tục) với sinh thường
        </div>
        <LinePoint />
      </div>
      <TableChart />
    </ChartExportWrapper>
  );
};

export default ChartExport;
