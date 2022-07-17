import React from "react";
import HeaderExport from "../header";
import { dataExport } from "./fakeData";
import { TableExportWrapper } from "./styled";
import close from "../../../assets/born/close.png";
import accept from "../../../assets/born/accept.png";

const TableExport = () => {
  return (
    <TableExportWrapper>
      <HeaderExport />
      <div className="quarter">Quý Q3/2021</div>
      <div className="header-table">
        <div className="content">Nội dung</div>
        <div className="criteria">Tiêu chí</div>
        <div className="achieve">Đánh giá (Đạt/ không đạt)</div>
      </div>
      {dataExport.map((dataElement, index) => (
        <div className="body-table" key={String(index)}>
          <div className="content">
            {index + 1}. {dataElement.content}
          </div>
          <div className="criteria">{dataElement.criteria}</div>
          <div className="achieve">
            <img alt="" src={dataElement.achieve ? accept : close} />
          </div>
        </div>
      ))}
      <div className="summary-table">
        <div className="content">Kết luận</div>
        <div className="criteria">Đạt nếu tất cả các tiêu chí trên đều đạt</div>
        <div className="achieve">
          <img alt="" src={accept} />
        </div>
      </div>
    </TableExportWrapper>
  );
};

export default TableExport;
