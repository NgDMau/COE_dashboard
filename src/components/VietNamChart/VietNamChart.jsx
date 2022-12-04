import { Tag } from "antd";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { removeVietnameseTones } from "../../helpers/convertVie";
import {
  ColorGroup,
  ContentWrapper,
  CountryWrapper,
  VietNamChartWrapper,
} from "./styled";

const vietnamGeoUrl =
  "https://res.cloudinary.com/pv-duc/raw/upload/v1626132866/province.json?fbclid=IwAR1fDTBNTPRKAq9Vw2JXrKWmhL8mQI_S9yLcgB9uTyTPKxUe492rj1-vowQ";

const listColor = [
  "#d9f7be",
  "#b7eb8f",
  "#95de64",
  "#73d13d",
  "#52c41a",
  "#389e0d",
  "#237804",
];
const VietNamChart = ({ countryData }) => {
  const { t } = useTranslation();
  const vietnam = [vietnamGeoUrl];
  const citiesData = useSelector((state) => state.data.citiesData);
  const currentQuarter = useSelector((state) => state?.data?.currentQuarter);

  const [content, setContent] = useState("");
  const [selectCity, setSelectCity] = useState("");

  const getCityData = async (cityName) => {
    const find = citiesData?.find(
      (element) =>
        element?.code_name ===
        removeVietnameseTones(cityName?.toLowerCase())?.replaceAll(" ", "")
    );
    console.log("findfindfindfind", find);
    if (find) {
      const dataCity = countryData[currentQuarter]?.data?.map_data?.data?.find(
        (element) => element?.province_code === find?.code
      );
      setSelectCity(dataCity);
    }
  };

  const returnNumber = (value) => {
    if (value === "NaN") {
      return "(0%)";
    }
    return `(${value || 0}%)`;
  };

  return (
    <VietNamChartWrapper>
      {selectCity && (
        <CountryWrapper>
          <b>
            {t("userManagement.city")}: {selectCity?.province_name}
          </b>
          <div>
            {t("common.afterBirth")} : {t("common.vaginalDelievery")}{" "}
            {returnNumber(selectCity?.SK_4_ST)}, {t("common.CSection")}
            {returnNumber(selectCity?.SK_4_SM)}
          </div>
          <div>
            {t("common.hospitalStay")} : {t("common.vaginalDelievery")}
            {returnNumber(selectCity?.SK_5_ST)}, {t("common.CSection")}
            {returnNumber(selectCity?.SK_5_SM)}
          </div>
          <div>
            {t("common.exclusivelyBreastfed")} : {t("common.vaginalDelievery")}{" "}
            {returnNumber(selectCity?.NK_4)}
          </div>
        </CountryWrapper>
      )}
      <div>
        <ColorGroup>
          <Tag color="#d9f7be">{t("chart.under")} 100</Tag>
          <Tag color="#b7eb8f">100 - 200</Tag>
          <Tag color="#95de64">200 - 300</Tag>
          <Tag color="#73d13d">300 - 400</Tag>
          <Tag color="#52c41a">400 - 500</Tag>
          <Tag color="#389e0d">500 - 600</Tag>
          <Tag color="#237804">{t("chart.above")} 600</Tag>
        </ColorGroup>
        <ContentWrapper>{content}</ContentWrapper>
        <ComposableMap
          data-tip=""
          projection="geoMercator"
          projectionConfig={{
            scale: 1950,
            center: [105, 15],
          }}
          style={{
            marginTop: "30px",
            width: "700px",
            height: "auto",
          }}
        >
          {vietnam.map((geoUrl) => (
            <Geographies key={geoUrl} geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      getCityData(geo?.properties?.ten_tinh);
                    }}
                    onMouseEnter={() => {
                      if (geo?.properties?.ten_tinh) {
                        setContent(geo?.properties?.ten_tinh);
                      }
                    }}
                    onMouseLeave={() => {
                      setContent("");
                    }}
                    style={{
                      default: {
                        fill: listColor[Math.floor(geo?.properties?.gid / 10)],
                        // fill: geo?.properties?.gid === 46 ? "red" : "#808080",
                        stroke: "#212529",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: "#e6dfd9",
                        stroke: "#212529",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>
          ))}
        </ComposableMap>
      </div>
    </VietNamChartWrapper>
  );
};

export default VietNamChart;
