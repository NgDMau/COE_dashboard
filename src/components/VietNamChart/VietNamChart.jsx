import { Select, Tag } from "antd";
import React, { useMemo } from "react";
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

const listColor = ["#b7eb8f", "#95de64", "#73d13d", "#52c41a", "#389e0d"];
const VietNamChart = ({ countryData }) => {
  const { t } = useTranslation();
  const vietnam = [vietnamGeoUrl];
  const citiesData = useSelector((state) => state.data.citiesData);
  const currentQuarter = useSelector((state) => state?.data?.currentQuarter);

  const [content, setContent] = useState("");
  const [selected, setSelected] = useState("");

  const getmedium = (arr) => {
    let sum = 0;
    let number = 0;
    arr.forEach((element) => {
      if (element !== "N/A" && element !== "NaN") {
        sum += element;
        number++;
      }
    });
    console.log(sum / number);
    return sum / number;
  };

  const getCityData = (cityName) => {
    if (!cityName) {
      return 0;
    }

    const find =
      citiesData?.find(
        (element) =>
          element?.code_name ===
          removeVietnameseTones(cityName?.toLowerCase())?.replaceAll(" ", "")
      ) || null;
    if (find) {
      const dataCity = countryData[currentQuarter]?.data?.map_data?.data?.find(
        (element) => element?.province_code === find?.code
      );
      if (selected == 0) {
        return getmedium([
          dataCity?.SK_4_ST,
          dataCity?.SK_4_SM,
          dataCity?.SK_5_ST,
          dataCity?.SK_5_SM,
          dataCity?.NK_4,
        ]);
      }
      if (selected == 1) {
        return returnNumber(dataCity?.SK_4_ST);
      }
      if (selected == 2) {
        return returnNumber(dataCity?.SK_4_SM);
      }
      if (selected == 3) {
        return returnNumber(dataCity?.SK_5_ST);
      }
      if (selected == 4) {
        return returnNumber(dataCity?.SK_5_SM);
      }
      if (selected == 5) {
        return returnNumber(dataCity?.NK_4);
      }
    } else {
      return 0;
    }
  };

  const returnNumber = (value) => {
    if (value === "NaN") {
      return 0;
    }
    if (value === "N/A") {
      return 0;
    }
    return value || 0;
  };

  const checkColor = (number) => {
    if (number < 20) {
      return listColor[0];
    }
    if (number >= 20 && number < 40) {
      return listColor[1];
    }
    if (number >= 40 && number < 60) {
      return listColor[2];
    }
    if (number >= 60 && number < 80) {
      return listColor[3];
    }
    if (number >= 80 && number < 100) {
      return listColor[4];
    }
    return listColor[0];
  };

  const selectData = useMemo(() => {
    const list = [
      t("common.none"),
      t("common.afterBirth") + t("common.vaginalDelievery"),
      t("common.afterBirth") + t("common.CSection"),
      t("common.hospitalStay") + t("common.vaginalDelievery"),
      t("common.hospitalStay") + t("common.CSection"),
      t("common.exclusivelyBreastfed") + t("common.vaginalDelievery"),
    ];
    return list;
  }, [countryData, t]);

  return (
    <VietNamChartWrapper>
      <CountryWrapper>
        <Select
          defaultValue={selectData[0]}
          className="select"
          onChange={(e) => {
            setSelected(Number(e));
          }}
        >
          {selectData?.map((element, index) => {
            return <Select.Option key={String(index)}>{element}</Select.Option>;
          })}
        </Select>
      </CountryWrapper>
      <div>
        <ColorGroup>
          <Tag color="#b7eb8f">0-20</Tag>
          <Tag color="#95de64">20-40</Tag>
          <Tag color="#73d13d">40-60</Tag>
          <Tag color="#52c41a">60-80</Tag>
          <Tag color="#389e0d">80-100</Tag>
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
                      checkColor(getCityData(geo?.properties?.ten_tinh));
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
                        // fill: listColor[Math.floor(geo?.properties?.gid / 10)],
                        fill: checkColor(
                          getCityData(geo?.properties?.ten_tinh)
                        ),
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
