import React from "react";
import ChartExport from "./chart";
import RankExport from "./rank";
import { ExportWrapper } from "./styled";
import TableExport from "./table";

const ExportData = () => {
  return (
    <ExportWrapper>
      <div className="page">
        <TableExport />
      </div>
      <div className="page">
        <ChartExport />
      </div>
      <div className="page">
        <RankExport />
      </div>
    </ExportWrapper>
  );
};

export default ExportData;
