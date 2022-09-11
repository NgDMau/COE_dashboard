import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { listFormReport } from "./fakeData";
import Report from "./report";
import { ReportFormWrapper } from "./styled";

const ReportForm = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  return (
    <ReportFormWrapper>
      <span className="title">{t("screen.surveyResults")}</span>
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
        title="Kết quả khảo sát"
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
