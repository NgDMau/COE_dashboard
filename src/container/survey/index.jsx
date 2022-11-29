/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Button, Spin } from "antd";
import { CityWrapper, LinkHeader, SurveyLinkWrapper } from "./styled";

import ChartLink from "./chart";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { linkApi } from "../../common/ngok";
import { useTranslation } from "react-i18next";

const SurveyLink = () => {
  const { t } = useTranslation();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const hospitalSelected = useSelector(
    (state) => state?.data?.hospitalSelected
  );
  const citySelected = useSelector((state) => state.data.citySelected);
  const [dataTableChart, setDatableChart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDataDashboard = async (code) => {
    setIsLoading(true);
    const myHeaders = new Headers({
      Authorization: "Token " + user?.token,
      "Content-Type": "application/x-www-form-urlencoded",
    });
    fetch(`${linkApi}/dm/data/process?province=${code}`, {
      method: "POST",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        const dataClone = [...data?.data];
        const chartData = [];
        chartData.push([
          "hospital_name",
          t("surveyLink.underMonth"),
          t("surveyLink.sectionMothers"),
          t("surveyLink.normalMother"),
          { role: "style" },
        ]);
        dataClone.forEach((element) => {
          const item = [];
          item.push(element.hospital_name);
          item.push(element.no_ST);
          item.push(element.no_SM);
          item.push(element.no_D1TT);
          item.push("stroke-width: 4");
          chartData.push(item);
        });
        setDatableChart(chartData || []);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getDataDashboard(citySelected?.code);
  }, [citySelected]);
  console.log("dataTableChartdataTableChartdataTableChart", dataTableChart);
  return (
    <SurveyLinkWrapper>
      <div className="container">
        <div className="link-selected">
          {isLoading ? (
            <div className="loading-wrapper">
              <Spin size="large" />
            </div>
          ) : (
            <>
              <LinkHeader>
                <CityWrapper>{citySelected?.name}</CityWrapper>
                <Button
                  className="link"
                  onClick={() => {
                    window.open("https://bmte.vn/form/quang_nam/v2");
                  }}
                >
                  {" "}
                  {t("screen.surveyLink")}
                </Button>
              </LinkHeader>

              {dataTableChart?.length > 0 && (
                <div className="chart">
                  <ChartLink
                    dataTableChart={dataTableChart}
                    selected={citySelected}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </SurveyLinkWrapper>
  );
};

export default SurveyLink;
