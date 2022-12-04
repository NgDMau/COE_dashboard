/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Button, Spin } from "antd";
import { CityWrapper, LinkHeader, SurveyLinkWrapper } from "./styled";

import ChartLink from "./chart";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { sendGet } from "../../api/axios";
import { linkApi } from "../../common/ngok";
import { getListQuanter } from "../../helpers/getListQuanter";

const SurveyLink = () => {
  const { t } = useTranslation();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const citySelected = useSelector((state) => state.data.citySelected);
  const listQuanter = getListQuanter();
  const currentQuarter = useSelector((state) => state?.data?.currentQuarter);

  const [dataTableChart, setDatableChart] = useState([]);
  const [linkUrl, setLineUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getDataDashboard = async (code) => {
    setIsLoading(true);
    try {
      const data = await sendGet(
        `dm/data/province/survey_progress?province_code=${user?.province_code}`
      );
      if (data?.status === "successful") {
        setLineUrl(data?.survey_url);
        const dataClone = [...data?.data[currentQuarter]?.data];
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
    const timeString = listQuanter[currentQuarter]?.split("/");
    const response = await sendGet(
      `/dm/data/province/survey_progress/export?province_code=${citySelected?.code}&year=${timeString[1]}&quarter=${timeString[0][1]}&type=xlsx&data=${data}`
    );
    if (response?.status === "successful") {
      window.open(`${linkApi}/${response?.data?.url}`);
    }
  };

  useEffect(() => {
    getDataDashboard(citySelected?.code);
  }, [citySelected, currentQuarter]);

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
                <Button
                  className="link"
                  onClick={() => indicesState("calls_stats")}
                >
                  {t("surveyLink.summaryReport")} {citySelected?.name}
                </Button>
                <Button
                  className="link"
                  onClick={() => indicesState("indices_stats")}
                >
                  {t("surveyLink.interviews")}
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
