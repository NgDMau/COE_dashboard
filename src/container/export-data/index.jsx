import React, { useMemo } from "react";
import ChartExport from "./chart";
import RankExport from "./rank";
import { ExportWrapper, ObstetricTitle } from "./styled";
import TableExport from "./table";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { SpinWrapper } from "../styled";
import { Spin } from "antd";

const ExportData = () => {
  const { t } = useTranslation();

  const dashboardData = useSelector((state) => state?.data?.dashboardData);

  const ObstetricsData = [
    {
      criteria: t("obstetricsData.obstetricsKS_1"),
    },
    {
      criteria: t("obstetricsData.obstetricsKS_2"),
    },
    {
      criteria: t("obstetricsData.obstetricsKS_3"),
    },
    {
      criteria: t("obstetricsData.obstetricsKS_4"),
    },
    {
      criteria: t("obstetricsData.obstetricsKS_5"),
    },
    {
      criteria: t("obstetricsData.obstetricsKS_6"),
    },
    {
      criteria: t("obstetricsData.obstetricsKS_7"),
    },
    {
      criteria: t("obstetricsData.obstetricsKS_8"),
    },
  ];

  const ChildData = [
    {
      criteria: t("obstetricsData.obstetricsKN_1"),
    },
    {
      criteria: t("obstetricsData.obstetricsKN_2"),
    },
    {
      criteria: t("obstetricsData.obstetricsKN_3"),
    },
    {
      criteria: t("obstetricsData.obstetricsKN_4"),
    },
    {
      criteria: t("obstetricsData.obstetricsKN_5"),
    },
    {
      criteria: t("obstetricsData.obstetricsKN_6"),
    },
    {
      criteria: t("obstetricsData.obstetricsKN_7"),
    },
  ];

  const timeLine = useMemo(() => {
    if (!dashboardData) {
      return null;
    }
    const response = dashboardData?.map((element) => {
      return element?.time;
    });
    return response || [];
  }, [dashboardData]);

  const checkFullNa = (arr) => {
    const find = arr?.find((findElement) => findElement !== "N/A");
    if (!find) {
      return false;
    }
    return true;
  };

  const lineChartSK = useMemo(() => {
    if (!dashboardData) {
      return null;
    }
    const responseST = ObstetricsData?.map((element, index) => {
      return dashboardData?.map((dataElement) => {
        const point = dataElement?.data?.SK[index + 1]?.values?.ST || 0;
        return point === "N/A" ? 0 : point;
      });
    });
    const responseSM = ObstetricsData?.map((element, index) => {
      return dashboardData?.map((dataElement) => {
        const point = dataElement?.data?.SK[index + 1]?.values?.SM || 0;
        return point === "N/A" ? 0 : point;
      });
    });
    return (
      {
        SM: responseSM,
        ST: responseST,
      } || []
    );
  }, [ObstetricsData, dashboardData]);

  const lineChartNK = useMemo(() => {
    if (!dashboardData) {
      return null;
    }
    const responseST = ObstetricsData?.map((element, index) => {
      return dashboardData?.map((dataElement) => {
        const point = dataElement?.data?.NK[index + 1]?.values?.ST || 0;
        return point === "N/A" ? 0 : point;
      });
    });
    const responseSM = ObstetricsData?.map((element, index) => {
      return dashboardData?.map((dataElement) => {
        const point = dataElement?.data?.NK[index + 1]?.values?.SM || 0;
        return point === "N/A" ? 0 : point;
      });
    });
    return (
      {
        SM: responseSM,
        ST: responseST,
      } || []
    );
  }, [ObstetricsData, dashboardData]);

  return (
    <>
      <ExportWrapper id="exportDagta">
        {lineChartSK ? (
          <div>
            <div className="page html2pdf__page-break">
              <ObstetricTitle>{t("exportData.obstetric")}</ObstetricTitle>
              <TableExport department="SK" />
            </div>
            {ObstetricsData.map((element, index) => {
              if (
                !checkFullNa(lineChartSK?.ST[index]) &&
                !checkFullNa(lineChartSK?.SM[index])
              ) {
                return <div />;
              }
              return (
                <div className="page html2pdf__page-break">
                  <ObstetricTitle>{t("exportData.obstetric")}</ObstetricTitle>
                  <ChartExport
                    criteria={element.criteria}
                    elementST={lineChartSK?.ST[index]}
                    elementSM={lineChartSK?.SM[index]}
                    evaluation={timeLine}
                    index={index}
                    department="SK"
                  />
                </div>
              );
            })}

            {/* <div className="page html2pdf__page-break">
              <ObstetricTitle>{t("exportData.obstetric")}</ObstetricTitle>
              <RankExport />
            </div> */}
          </div>
        ) : (
          <SpinWrapper>
            <Spin size="large" />
          </SpinWrapper>
        )}
      </ExportWrapper>
      <ExportWrapper id="exportDagta2">
        {lineChartNK && (
          <div>
            <div className="page html2pdf__page-break">
              <ObstetricTitle>{t("exportData.pediatric")}</ObstetricTitle>
              <TableExport department="NK" />
            </div>
            {ChildData.map((element, index) => {
              // if (
              //   !checkFullNa(dataList[index + 1]?.values?.ST) ||
              //   !checkFullNa(dataList[index + 1]?.values?.SM)
              // ) {
              //   return <div />;
              // }
              return (
                <div className="page html2pdf__page-break">
                  <ObstetricTitle>{t("exportData.pediatric")}</ObstetricTitle>
                  <ChartExport
                    criteria={element.criteria}
                    elementST={lineChartNK?.ST[index]}
                    elementSM={lineChartNK?.SM[index]}
                    evaluation={timeLine}
                    index={index}
                    department="NK"
                  />
                </div>
              );
            })}

            <div className="page html2pdf__page-break">
              {/* <ObstetricTitle>{t("exportData.pediatric")}</ObstetricTitle> */}
              <RankExport />
            </div>
          </div>
        )}
      </ExportWrapper>
    </>
  );
};

export default ExportData;
