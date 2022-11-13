import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { TableChartWrapper } from "./styled";

const TableChart = ({ index, criteria, department }) => {
  const tableData = useSelector((state) => state?.data?.tableData);
  const dashboardData = useSelector((state) => state?.data?.dashboardData);

  const timeLine = useMemo(() => {
    if (!dashboardData) {
      return null;
    }
    const response = dashboardData?.map((element) => {
      return element?.time?.slice(0, 3) + element?.time?.slice(5);
    });
    return response || [];
  }, [dashboardData]);

  const listData = useMemo(() => {
    const dataST = tableData?.map((element) => {
      return {
        ...element,
        hospital_data: JSON.parse(element?.hospital_data)?.map((subElement) => {
          return {
            number: subElement?.data[department][index + 1]?.values?.ST || 0,
            result:
              subElement?.data[department][index + 1]?.values?.result || "",
          };
        }),
      };
    });
    const dataSM = tableData?.map((element) => {
      return {
        ...element,
        hospital_data: JSON.parse(element?.hospital_data)?.map((subElement) => {
          return {
            number: subElement?.data[department][index + 1]?.values?.SM || 0,
            result:
              subElement?.data[department][index + 1]?.values?.result || "",
          };
        }),
      };
    });
    return {
      ST: dataST,
      SM: dataSM,
    };
  }, [tableData, index, department]);

  const { t } = useTranslation();
  const checkWarning = (data) => {
    if (data?.result !== "passed") {
      return true;
    }
    return false;
  };

  return (
    <TableChartWrapper>
      <div className="header-chart background-color">
        <div className="criteria">{t("exportData.indexHospitals")}</div>
        {timeLine?.map((element, indexTime) => (
          <div className={`quarter ${indexTime === 7 && "border-right-none"}`}>
            {element}
          </div>
        ))}
      </div>
      {[t("exportData.withVaginalDelivery"), t("exportData.withCSection")].map(
        (element, indexBorn) => {
          const dataTable = indexBorn === 1 ? listData?.ST : listData?.SM;
          return (
            <div key={String(indexBorn)}>
              <div className="header-chart margin-top-2">
                <div className="criteria title-content">
                  {criteria} {element}
                </div>
                <div className="quarter" />
                <div className="quarter" />
                <div className="quarter" />
                <div className="quarter" />
                <div className="quarter" />
                <div className="quarter" />
                <div className="quarter" />
                <div className="quarter border-right-none" />
              </div>
              {dataTable?.map((hospital, indexSub) => (
                <div
                  className="header-chart border-top-none"
                  key={String(indexSub)}
                >
                  <div className="criteria padding-left-30">
                    {hospital.hospital_name}
                  </div>
                  {hospital?.hospital_data?.map(
                    (dataHostPital, indexDataHostpital) => (
                      <div
                        key={String(indexDataHostpital)}
                        className={`quarter ${
                          indexDataHostpital === 7 && "border-right-none"
                        } ${checkWarning(dataHostPital) && "warning"}`}
                      >
                        {dataHostPital?.number === "N/A"
                          ? ""
                          : dataHostPital?.number}
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          );
        }
      )}
    </TableChartWrapper>
  );
};

export default TableChart;
