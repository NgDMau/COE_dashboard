/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";
import ChartExport from "./chart";
import RankExport from "./rank";
import { ExportWrapper, ObstetricTitle } from "./styled";
import TableExport from "./table";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { SpinWrapper } from "../styled";
import { Spin } from "antd";
import GroupColumn from "../../components/GroupColumn/GroupColumn";

const ExportData = () => {
  const { t } = useTranslation();

  const dashboardData = useSelector((state) => state?.data?.dashboardData);
  const tableData = useSelector((state) => state?.data?.tableData);

  const ObstetricsData = [
    {
      criteria: t("obstetricsData.obstetricsKS_1"),
      STRate: 80,
      SMRate: 50,
    },
    {
      criteria: t("obstetricsData.obstetricsKS_2"),
      STRate: 80,
      SMRate: 50,
    },
    {
      criteria: t("obstetricsData.obstetricsKS_3"),
      STRate: 95,
      SMRate: null,
    },
    {
      criteria: t("obstetricsData.obstetricsKS_4"),
      STRate: 80,
      SMRate: 50,
    },
    {
      criteria: t("obstetricsData.obstetricsKS_5"),
      STRate: 90,
      SMRate: 90,
    },
    {
      criteria: t("obstetricsData.obstetricsKS_6"),
      STRate: 80,
      SMRate: 80,
    },
    {
      criteria: t("obstetricsData.obstetricsKS_7"),
      STRate: 0,
      SMRate: 0,
    },
    {
      criteria: t("obstetricsData.obstetricsKS_8"),
      STRate: 0,
      SMRate: 0,
    },
  ];

  const ChildData = [
    {
      criteria: t("obstetricsData.obstetricsKN_1"),
      STRate: 80,
      SMRate: 50,
    },
    {
      criteria: t("obstetricsData.obstetricsKN_2"),
      STRate: 80,
      SMRate: 50,
    },
    {
      criteria: t("obstetricsData.obstetricsKN_3"),
      STRate: 95,
      SMRate: null,
    },
    {
      criteria: t("obstetricsData.obstetricsKN_4"),
      STRate: 80,
      SMRate: 50,
    },
    {
      criteria: t("obstetricsData.obstetricsKN_5"),
      STRate: 90,
      SMRate: 50,
    },
    {
      criteria: t("obstetricsData.obstetricsKN_6"),
      STRate: 0,
      SMRate: 0,
    },
    {
      criteria: t("obstetricsData.obstetricsKN_7"),
      STRate: 0,
      SMRate: 0,
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
    const find = arr?.find((findElement) => findElement !== null);
    if (!find && find !== 0) {
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
        const point = dataElement?.data?.SK[index + 1]?.values?.ST;
        return point === "N/A" ? null : point;
      });
    });
    const responseSM = ObstetricsData?.map((element, index) => {
      return dashboardData?.map((dataElement) => {
        const point = dataElement?.data?.SK[index + 1]?.values?.SM;
        return point === "N/A" ? null : point;
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
        const point = dataElement?.data?.NK[index + 1]?.values?.ST;
        return point === "N/A" ? null : point;
      });
    });
    const responseSM = ObstetricsData?.map((element, index) => {
      return dashboardData?.map((dataElement) => {
        const point = dataElement?.data?.NK[index + 1]?.values?.SM;
        return point === "N/A" ? null : point;
      });
    });
    return (
      {
        SM: responseSM,
        ST: responseST,
      } || []
    );
  }, [ObstetricsData, dashboardData]);

  const checkNotData = () => {
    const checked =
      ChildData?.filter(
        (element, index) => !!checkFullNa(lineChartNK?.ST[index])
      ) || [];
    if (checked?.length > 0) return true;
    return false;
  };

  if (!tableData) {
    return (
      <SpinWrapper>
        <Spin size="large" />
      </SpinWrapper>
    );
  }

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
                    criteria={element}
                    elementST={lineChartSK?.ST[index]}
                    elementSM={lineChartSK?.SM[index]}
                    evaluation={timeLine}
                    index={index}
                    department="SK"
                  />
                </div>
              );
            })}
            <div className="page html2pdf__page-break">
              <ObstetricTitle>{t("exportData.obstetric")}</ObstetricTitle>
              <GroupColumn department="SK" />
            </div>
          </div>
        ) : (
          <SpinWrapper>
            <Spin size="large" />
          </SpinWrapper>
        )}
      </ExportWrapper>
      {checkNotData() && (
        <ExportWrapper id="exportDagta2">
          {lineChartNK && (
            <div>
              <div className="page html2pdf__page-break">
                <ObstetricTitle>{t("exportData.pediatric")}</ObstetricTitle>
                <TableExport department="NK" />
              </div>
              {ChildData.map((element, index) => {
                if (
                  !checkFullNa(lineChartNK?.ST[index]) &&
                  !checkFullNa(lineChartNK?.SM[index])
                ) {
                  return <div />;
                }

                return (
                  <div className="page html2pdf__page-break">
                    <ObstetricTitle>{t("exportData.pediatric")}</ObstetricTitle>
                    <ChartExport
                      criteria={element}
                      elementST={lineChartNK?.ST[index]}
                      elementSM={lineChartNK?.SM[index]}
                      evaluation={timeLine}
                      index={index}
                      department="NK"
                    />
                  </div>
                );
              })}
            </div>
          )}
          <div className="page html2pdf__page-break">
            <ObstetricTitle>{t("exportData.pediatric")}</ObstetricTitle>
            <GroupColumn department="NK" />
          </div>
        </ExportWrapper>
      )}
    </>
  );
};

export default ExportData;
