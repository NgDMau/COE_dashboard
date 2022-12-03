import React from "react";
import { useTranslation } from "react-i18next";
import { BoxColor, ContainerExplain, ExplainWrapper } from "./styled";

const ExplainChart = () => {
  const { t } = useTranslation();
  return (
    <ExplainWrapper>
      <ContainerExplain>
        <BoxColor color="#FEA628" />
        <span>{t("common.vaginalDelievery")}</span>
      </ContainerExplain>
      <ContainerExplain>
        <BoxColor color="#5A6882" />
        <span>{t("common.CSection")}</span>
      </ContainerExplain>
    </ExplainWrapper>
  );
};

export default ExplainChart;
