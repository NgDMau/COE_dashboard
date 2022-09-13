import React, { useMemo, useState } from "react";
import { Button, Spin, Tooltip } from "antd";
import { ButtonSelectCity, SurveyLinkWrapper } from "./styled";

import Input from "antd/lib/input/Input";
import ChartLink from "./chart";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import buttonCity from "../../assets/icon/button-city.png";
import { toNomal } from "../../helpers/to-nomal";
import { linkApi } from "../../common/ngok";
import { listCity } from "./faleData";
import VietNamChart from "../../components/VietNamChart/VietNamChart";
import { useTranslation } from "react-i18next";

const SurveyLink = () => {
  const { t } = useTranslation();

  const user = JSON.parse(localStorage.getItem("user"));
  const citiesDefault = useSelector((state) => state.data.citiesData);
  const [cities, setCities] = useState([]);
  const [selected, setSelected] = useState(null);

  const [dataTableChart, setDatableChart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const citiesDataMap = useMemo(() => {
    const data = listCity.map((element) => {
      const find = citiesDefault.find((city) =>
        toNomal(element)
          .trim()
          .toLowerCase()
          .includes(toNomal(city.name).trim().toLowerCase())
      );
      if (find) {
        return find;
      }
      return {
        code_name: toNomal(element).trim().toLowerCase(),
        name: element,
        survey_url: "https://ee.humanitarianresponse.info/x/68",
      };
    });
    return data || [];
  }, [citiesDefault]);

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
        ]);
        dataClone.forEach((element) => {
          const item = [];
          item.push(element.hospital_name);
          item.push(element.no_ST);
          item.push(element.no_SM);
          item.push(element.no_D1TT);
          chartData.push(item);
        });
        setDatableChart(chartData || []);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setCities([...citiesDataMap]);
  }, [citiesDataMap]);

  const onSelectCity = (city) => {
    const find = cities?.find(
      (element) =>
        toNomal(element?.name).trim().toLowerCase() ===
        toNomal(city).trim().toLowerCase()
    );
    if (find) {
      setSelected(find);
      getDataDashboard(find?.code);
    }
  };

  return (
    <SurveyLinkWrapper>
      <Input
        className="search-input"
        placeholder={t("surveyLink.search")}
        onChange={(e) => {
          setCities(
            citiesDataMap.filter((element) =>
              toNomal(element.code_name)
                .trim()
                .toLowerCase()
                .includes(toNomal(e?.target?.value).trim().toLowerCase())
            )
          );
        }}
      />

      <div className="container">
        <div className="city-link">
          {cities.map((element, index) => (
            <div
              className={`link-container ${!element?.id && "not-participate"} ${
                selected?.id && element?.id === selected?.id && element?.id
                  ? "selected"
                  : ""
              }`}
              onClick={() => {
                if (isLoading) {
                  return;
                }
                if (element === selected) {
                  setSelected(null);
                } else {
                  setSelected(element);
                  getDataDashboard(element?.code);
                }
              }}
              key={String(index)}
            >
              <Tooltip
                placement="rightTop"
                title={!element?.id ? t("surveyLink.notParticipate") : ""}
              >
                <ButtonSelectCity>
                  <img src={buttonCity} alt="" />
                  <div>{element.name}</div>
                </ButtonSelectCity>
              </Tooltip>
            </div>
          ))}
        </div>
        <VietNamChart onSelectCity={onSelectCity} />

        {selected !== null && (
          <div className="link-selected">
            {isLoading ? (
              <div className="loading-wrapper">
                <Spin size="large" />
              </div>
            ) : (
              <>
                <div>
                  <Button
                    className="link"
                    onClick={() => {
                      window.open("https://bmte.vn/form/quang_nam/v2");
                    }}
                  >
                    {" "}
                    {t("screen.surveyLink")}
                  </Button>
                </div>

                {dataTableChart?.length > 0 && (
                  <div className="chart">
                    <ChartLink
                      dataTableChart={dataTableChart}
                      selected={selected}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </SurveyLinkWrapper>
  );
};

export default SurveyLink;
