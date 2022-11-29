import { useTranslation } from "react-i18next";

export const useLableData = () => {
  const { t } = useTranslation();
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

  const labelsNK = [
    t("obstetricsData.radar_NK_1"),
    t("obstetricsData.radar_NK_2"),
    t("obstetricsData.radar_NK_3"),
    t("obstetricsData.radar_NK_4"),
    t("obstetricsData.radar_NK_5"),
    t("obstetricsData.radar_NK_6"),
  ];

  return {
    ObstetricsData,
    ChildData,
    labelsNK,
  };
};
