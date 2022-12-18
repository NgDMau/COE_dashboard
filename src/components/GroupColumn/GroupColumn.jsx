import React, { useState, useEffect, useMemo } from "react";
import { Column } from "@ant-design/plots";
import HeaderExport from "../../container/export-data/header";
import { useSelector } from "react-redux";
import { getListQuanter } from "../../helpers/getListQuanter";
import { useTranslation } from "react-i18next";

const GroupColumn = ({ department }) => {
  const { t } = useTranslation();
  const dashboardData = useSelector((state) => state?.data?.dashboardData);
  const listQuanter = getListQuanter().reverse();
  const dataChart = useMemo(() => {
    if (!dashboardData) {
      return null;
    }
    const arrA = [0, 1, 2, 3, 4, 5, 6, 7].map((element) => {
      const data =
        dashboardData[element]?.data[department][department === "SK" ? 11 : 8]
          ?.values?.A || 0;
      return {
        name: t("exportData.formulaMilk"),
        time: listQuanter[element],
        data: data,
      };
    });
    const arrB = [0, 1, 2, 3, 4, 5, 6, 7].map((element) => {
      const data =
        dashboardData[element]?.data[department][department === "SK" ? 11 : 8]
          ?.values?.B || 0;
      return {
        name: t("exportData.hospitalPremises"),
        time: listQuanter[element],
        data: data,
      };
    });
    return arrA.concat(arrB);
  }, [dashboardData, department, t, listQuanter]);
  //  const quanterViolation = useMemo(() => {
  //     if (!dataList) {
  //       return {};
  //     }
  //     return department === "SK"
  //       ? dataList[currentQuarter]?.data[department]?.[11]?.values || {}
  //       : dataList[currentQuarter]?.data[department]?.[8]?.values || {};
  //   }, [currentQuarter, dataList, department]);

  const config = {
    data: dataChart,
    isGroup: true,
    xField: "time",
    yField: "data",
    seriesField: "name",

    /** 设置颜色 */
    //color: ['#1ca9e6', '#f88c24'],

    /** 设置间距 */
    // marginRatio: 0.1,
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: "interval-adjust-position",
        }, // 数据标签防遮挡
        {
          type: "interval-hide-overlap",
        }, // 数据标签文颜色自动调整
        {
          type: "adjust-color",
        },
      ],
    },
  };
  return (
    <>
      <HeaderExport />
      <Column {...config} />;
    </>
  );
};

export default GroupColumn;
