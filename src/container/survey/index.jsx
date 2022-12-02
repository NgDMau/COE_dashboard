/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Button, Spin } from "antd";
import { CityWrapper, LinkHeader, SurveyLinkWrapper } from "./styled";

import ChartLink from "./chart";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { sendGet } from "../../api/axios";

const SurveyLink = () => {
  const { t } = useTranslation();

  const citySelected = useSelector((state) => state.data.citySelected);
  const [dataTableChart, setDatableChart] = useState([]);
  const [linkUrl, setLineUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getDataDashboard = async (code) => {
    setIsLoading(true);
    try {
      const data = await sendGet(`/dm/data/process?province=${code}`);
      if (data?.status === "successful") {
        setLineUrl(data?.survey_url);
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
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const indicesState = async (data) => {
    const response = sendGet(
      `/dm/data/province/survey_progress/export?province_code=66&year=2021&quarter=2&type=xlsx&data=${data}`
    );
    console.log(response);
  };

  useEffect(() => {
    getDataDashboard(citySelected?.code);
  }, [citySelected]);

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
                  onClick={() => indicesState("calls_stats")}
                >
                  indices_stats
                </Button>
                <Button
                  className="link"
                  onClick={() => indicesState("indices_stats")}
                >
                  calls_stats
                </Button>
                <Button className="link" onClick={() => window.open(linkUrl)}>
                  {t("surveyLink.link")}
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
