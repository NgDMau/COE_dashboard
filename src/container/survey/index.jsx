import React, { useState } from "react";
import { LinkOutlined } from "@ant-design/icons";
import { SurveyLinkWrapper } from "./styled";
import Input from "antd/lib/input/Input";
import ChartLink from "./chart";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Select, Spin } from "antd";
import { linkApi } from "../../common/ngok";
import VietNamChart from "../../components/VietNamChart/VietNamChart";

function toNomal(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
}
const SurveyLink = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const citiesDefault = useSelector((state) => state.data.citiesData);

  const [cities, setCities] = useState([]);
  const [selected, setSelected] = useState(null);

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
    setCities([...citiesDefault]);
  }, [citiesDefault]);

  return (
    <SurveyLinkWrapper>
      <Input
        className="search-input"
        placeholder="Tìm kiếm..."
        onChange={(e) => {
          setCities(
            citiesDefault.filter((element) =>
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
          {cities?.map((element, index) => (
            <div
              className={`link-container ${
                element?.id === selected?.id && "selected"
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
              {"   "} {element?.name}{" "}
            </div>
          ))}
        </div>
        {selected === null && <VietNamChart />}
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

                <Select className="select-hostpital" onChange={(e) => {}}>
                  {[
                    "Q1/21",
                    "Q2/21",
                    "Q3/21",
                    "Q4/21",
                    "Q1/22",
                    "Q2/22",
                    "Q3/22",
                    "Q4/22",
                  ]?.map((element, index) => {
                    return (
                      <Select.Option key={String(index)}>
                        {index + 1}. {element}
                      </Select.Option>
                    );
                  })}
                </Select>

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
