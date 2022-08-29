import React, { useMemo, useState } from "react";
import { LinkOutlined } from "@ant-design/icons";
import { SurveyLinkWrapper } from "./styled";
import Input from "antd/lib/input/Input";
import ChartLink from "./chart";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { linkApi } from "../../common/ngok";
import VietNamChart from "../../components/VietNamChart/VietNamChart";
import { listCity } from "./faleData";
import { toNomal } from "../../helpers/to-nomal";

const SurveyLink = () => {
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
  console.log("cities", citiesDataMap);

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
          "Bà mẹ có con dưới 1 tháng tuôi",
          "Bà mẹ sinh mổ",
          "Bà mẹ sinh thường",
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

  return (
    <SurveyLinkWrapper>
      <Input
        className="search-input"
        placeholder="Tìm kiếm..."
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
              className={`link-container ${
                element?.id === selected?.id && element?.id ? "selected" : ""
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
              <LinkOutlined />
              {"   "} {element.name}{" "}
            </div>
          ))}
        </div>
        <VietNamChart />

        {selected !== null && (
          <div className="link-selected">
            {isLoading ? (
              <div className="loading-wrapper">
                <Spin size="large" />
              </div>
            ) : (
              <>
                <div>
                  <span
                    className="link"
                    onClick={() => {
                      window.open("https://bmte.vn/form/quang_nam/v2");
                    }}
                  >
                    {" "}
                    {selected?.survey_url}
                  </span>
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
