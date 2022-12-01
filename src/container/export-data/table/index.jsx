import React from "react";
import { useMemo } from "react";
import HeaderExport from "../header";
import { TableExportWrapper } from "./styled";
import close from "../../../assets/born/close.png";
import accept from "../../../assets/born/accept.png";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { TitleContainer } from "../chart/styled";

const TableExport = ({ department, listData }) => {
  const { t } = useTranslation();
  const dashboardData = useSelector((state) => state?.data?.dashboardData);
  const currentQuarter = useSelector((state) => state?.data?.currentQuarter);

  const dataExportSK = [
    {
      content: t("obstetricsData.obstetricsKS_1"),
      criteria: t("obstetricsData.obstetricsPassKS_1"),
      achieve: true,
    },
    {
      content: t("obstetricsData.obstetricsKS_2"),
      criteria: t("obstetricsData.obstetricsPassKS_2"),
      achieve: true,
    },
    {
      content: t("obstetricsData.obstetricsKS_3"),
      criteria: t("obstetricsData.obstetricsPassKS_3"),
      achieve: true,
    },
    {
      content: t("obstetricsData.obstetricsKS_4"),
      criteria: t("obstetricsData.obstetricsPassKS_4"),
      achieve: true,
    },
    {
      content: t("obstetricsData.obstetricsKS_5"),
      criteria: t("obstetricsData.obstetricsPassKS_5"),
      achieve: true,
    },
    {
      content: t("obstetricsData.obstetricsKS_6"),
      criteria: t("obstetricsData.obstetricsPassKS_6"),
      achieve: true,
    },
    {
      content: t("obstetricsData.obstetricsKS_7"),
      criteria: t("obstetricsData.obstetricsPassKS_7"),
      achieve: true,
    },
    {
      content: t("obstetricsData.obstetricsKS_8"),
      criteria: t("obstetricsData.obstetricsPassKS_8"),
      achieve: true,
    },
  ];
  const dataExportNK = [
    {
      content: t("obstetricsData.obstetricsKN_1"),
      criteria: t("obstetricsData.obstetricsPassNK_1"),
      achieve: true,
    },
    {
      content: t("obstetricsData.obstetricsKN_2"),
      criteria: t("obstetricsData.obstetricsPassNK_2"),
      achieve: true,
    },
    {
      content: t("obstetricsData.obstetricsKN_3"),
      criteria: t("obstetricsData.obstetricsPassNK_3"),
      achieve: true,
    },
    {
      content: t("obstetricsData.obstetricsKN_4"),
      criteria: t("obstetricsData.obstetricsPassNK_4"),
      achieve: true,
    },
    {
      content: t("obstetricsData.obstetricsKN_5"),
      criteria: t("obstetricsData.obstetricsPassNK_5"),
      achieve: true,
    },
    {
      content: t("obstetricsData.obstetricsKN_6"),
      criteria: t("obstetricsData.obstetricsPassNK_6"),
      achieve: true,
    },
    {
      content: t("obstetricsData.obstetricsKN_7"),
      criteria: t("obstetricsData.obstetricsPassNK_7"),
      achieve: true,
    },
  ];

  const dataExport = department === "SK" ? dataExportSK : dataExportNK;

  const checkSuccess = useMemo(() => {
    if (!dashboardData) {
      return null;
    }
    const arr = dataExport?.map((element, index) => {
      if (index >= dataExport?.length - 2) {
        return "passed";
      }
      return (
        dashboardData[currentQuarter]?.data[department][index + 1]?.values
          ?.result || null
      );
    });
    const find = arr?.find((element) => !element || element !== "passed");
    if (find) {
      return false;
    }
    return true;
  }, [dataExport, department, dashboardData, currentQuarter]);
  return (
    <TableExportWrapper>
      <HeaderExport />
      <div className="quarter">
        {t("exportData.quarter")} {dashboardData[currentQuarter]?.time}
      </div>
      <div className="header-table">
        <div className="content">{t("export.content")}</div>
        <div className="criteria">{t("export.criteria")}</div>
        <div className="achieve">{t("export.Assessment")}</div>
      </div>
      {dataExport.map((dataElement, index) => (
        <div className="body-table" key={String(index)}>
          <div className="content">
            {index + 1}. {dataElement.content}
          </div>
          <div className="criteria">{dataElement.criteria}</div>
          <div className="achieve">
            {dashboardData[currentQuarter]?.data[department][index + 1]?.values
              ?.result === "passed" || index >= dataExport?.length - 2 ? (
              <img alt="" src={accept} />
            ) : (
              <div />
            )}
          </div>
        </div>
      ))}
      <div className="summary-table">
        <div className="content">{t("export.conclusion")}</div>
        <div className="criteria">{t("export.conclusionContent")}</div>
        <div className="achieve">
          {checkSuccess && <img alt="" src={accept} />}
        </div>
      </div>
    </TableExportWrapper>
  );
};

export default TableExport;
