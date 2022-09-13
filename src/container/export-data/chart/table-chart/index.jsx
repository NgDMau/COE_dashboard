import React from "react";
import { useTranslation } from "react-i18next";
import { dataTableExport } from "./fakeData";
import { TableChartWrapper } from "./styled";

const TableChart = () => {
  const { t } = useTranslation();
  const checkWarning = (data) => {
    if (Number(data) < 80) {
      return true;
    }
    return false;
  };

  return (
    <TableChartWrapper>
      <div className="header-chart background-color">
        <div className="criteria">{t("exportData.indexHospitals")}</div>
        <div className="quarter">Q1/20</div>
        <div className="quarter">Q1/20</div>
        <div className="quarter">Q1/20</div>
        <div className="quarter">Q1/20</div>
        <div className="quarter">Q1/20</div>
        <div className="quarter">Q1/20</div>
        <div className="quarter">Q1/20</div>
        <div className="quarter border-right-none">Q1/20</div>
      </div>
      {dataTableExport.map((element, index) => (
        <div key={String(index)}>
          <div className="header-chart margin-top-2">
            <div className="criteria title-content">{element.content}</div>
            <div className="quarter" />
            <div className="quarter" />
            <div className="quarter" />
            <div className="quarter" />
            <div className="quarter" />
            <div className="quarter" />
            <div className="quarter" />
            <div className="quarter border-right-none" />
          </div>
          {element.hospitals.map((hospital, indexSub) => (
            <div
              className="header-chart border-top-none"
              key={String(indexSub)}
            >
              <div className="criteria padding-left-30">{hospital.name}</div>
              <div
                className={`quarter ${
                  checkWarning(hospital.q1_20) && "warning"
                }`}
              >
                {hospital.q1_20}
              </div>
              <div
                className={`quarter ${
                  checkWarning(hospital.q2_20) && "warning"
                }`}
              >
                {hospital.q2_20}
              </div>
              <div
                className={`quarter ${
                  checkWarning(hospital.q3_20) && "warning"
                }`}
              >
                {hospital.q3_20}
              </div>
              <div
                className={`quarter ${
                  checkWarning(hospital.q4_20) && "warning"
                }`}
              >
                {hospital.q4_20}
              </div>
              <div
                className={`quarter ${
                  checkWarning(hospital.q1_21) && "warning"
                }`}
              >
                {hospital.q1_21}
              </div>
              <div
                className={`quarter ${
                  checkWarning(hospital.q2_21) && "warning"
                }`}
              >
                {hospital.q2_21}
              </div>
              <div
                className={`quarter ${
                  checkWarning(hospital.q3_21) && "warning"
                }`}
              >
                {hospital.q3_21}
              </div>
              <div
                className={`quarter border-right-none ${
                  checkWarning(hospital.q4_21) && "warning"
                }`}
              >
                {hospital.q4_21}
              </div>
            </div>
          ))}
        </div>
      ))}
    </TableChartWrapper>
  );
};

export default TableChart;
