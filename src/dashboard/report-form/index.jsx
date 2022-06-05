import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { listFormReport } from "./fakeData";
import Report from "./report";
import { ReportFormWrapper } from "./styled";

const ReportForm = () => {
  const [visible, setVisible] = useState(false);
  return (
    <ReportFormWrapper>
      <span className="title">Mẫu Báo cáo</span>
      {listFormReport.map((element, index) => (
        <div
          className="report"
          onClick={() => setVisible(true)}
          key={String(index)}
        >
          {element}
        </div>
      ))}
      <Modal
        title="Mẫu báo cáo"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={1380}
      >
        <Report />
      </Modal>
    </ReportFormWrapper>
  );
};

export default ReportForm;
