import React from "react";
import { HeaderExportWrapper } from "./styled";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const HeaderExport = () => {
  const { t } = useTranslation();
  const dashboardData =
    useSelector((state) => state?.data?.dashboardData) || null;
  const currentQuarter =
    useSelector((state) => state?.data?.currentQuarter) || null;
  const hospitalSelected = useSelector(
    (state) => state?.data?.hospitalSelected
  );
  return (
    <HeaderExportWrapper>
      <div className="title">{t("exportData.title")}</div>
      <div className="last-update">
        {t("exportData.updateTo")} {dashboardData?.time[currentQuarter]}
      </div>
      <div className="hospital">{hospitalSelected?.name}</div>
    </HeaderExportWrapper>
  );
};

export default HeaderExport;
