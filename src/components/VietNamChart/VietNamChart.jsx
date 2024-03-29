import { Select, Tag } from "antd";
import React, { useMemo } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { removeVietnameseTones } from "../../helpers/convertVie";
import {
  BornWrapper,
  BothWrapper,
  ColorGroup,
  Content,
  ContentWrapper,
  CountryWrapper,
  HeaderTableWrapper,
  TextBlack,
  VietNamChartWrapper,
} from "./styled";

const vietnamGeoUrl =
  "https://res.cloudinary.com/pv-duc/raw/upload/v1626132866/province.json?fbclid=IwAR1fDTBNTPRKAq9Vw2JXrKWmhL8mQI_S9yLcgB9uTyTPKxUe492rj1-vowQ";

const listColor = [
  "#bdc3c7",
  "#b7eb8f",
  "#95de64",
  "#73d13d",
  "#52c41a",
  "#389e0d",
];
const VietNamChart = ({ countryData }) => {
  const { t } = useTranslation();
  const vietnam = [vietnamGeoUrl];
  const citiesData = useSelector((state) => state.data.citiesData);
  const currentQuarter = useSelector((state) => state?.data?.currentQuarter);

  const [content, setContent] = useState("");
  const [selected, setSelected] = useState("");
  const [selectCity, setSelectCity] = useState("");

  const getCityDataSelected = async (cityName) => {
    const find = citiesData?.find((element) =>
      removeVietnameseTones(cityName?.toLowerCase())
        ?.replaceAll(" ", "")
        .includes(element?.code_name)
    );
    if (find) {
      const dataCity = countryData[currentQuarter]?.data?.map_data?.data?.find(
        (element) => element?.province_code === find?.code
      );
      setSelectCity(dataCity);
    }
  };

  const returnNumberSelected = (value) => {
    if (value === "NaN") {
      return "0%";
    }
    if (!value) {
      return "0%";
    }
    return `${value.toFixed(2) || 0}%`;
  };

  const getmedium = (arr) => {
    let sum = 0;
    let number = 0;
    arr.forEach((element) => {
      if (element !== "N/A" && element !== "NaN") {
        sum += element;
        number++;
      }
    });
    return sum / number;
  };

  const getCityData = (cityName) => {
    if (!cityName) {
      return 0;
    }

    const find =
      citiesData?.find((element) =>
        removeVietnameseTones(cityName?.toLowerCase())
          ?.replaceAll(" ", "")
          .includes(element?.code_name)
      ) || null;
    if (find) {
      if (
        !countryData ||
        !countryData[currentQuarter] ||
        !countryData[currentQuarter]?.data?.map_data?.data
      ) {
        return 0;
      }
      const dataCity =
        countryData[currentQuarter]?.data?.map_data?.data?.find(
          (element) => element?.province_code === find?.code
        ) || null;
      if (!dataCity) {
        return 0;
      }
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
      return null;
    }
  };

  const returnNumber = (value) => {
    return value;
  };

  const checkColor = (number) => {
    if (number === null) {
      return "#fff";
    }
    if (number === 0 || number === "NaN") {
      return listColor[0];
    }
    if (number < 20) {
      return listColor[1];
    }
    if (number >= 20 && number < 40) {
      return listColor[2];
    }
    if (number >= 40 && number < 60) {
      return listColor[3];
    }
    if (number >= 60 && number < 80) {
      return listColor[4];
    }
    if (number >= 80 && number < 100) {
      return listColor[5];
    }
    return listColor[0];
  };

  const selectData = useMemo(() => {
    const list = [
      t("common.none"),
      t("common.afterBirth") + t("common.vaginalDelievery2"),
      t("common.afterBirth") + t("common.CSection2"),
      t("common.hospitalStay") + t("common.vaginalDelievery2"),
      t("common.hospitalStay") + t("common.CSection2"),
      t("common.exclusivelyBreastfed") + t("common.vaginalDelievery2"),
    ];
    return list;
  }, [t, listColor]);

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
      <CountryWrapper>
        <b>
          {t("userManagement.city")}: {selectCity?.province_name}
        </b>
        <HeaderTableWrapper>
          <Content>
            <b>{t("overview.index")}</b>
          </Content>
          <BornWrapper>
            <b>{t("common.vaginalDelievery")}</b>
          </BornWrapper>
          <BornWrapper>
            <b>{t("common.CSection")}</b>
          </BornWrapper>
        </HeaderTableWrapper>
        <HeaderTableWrapper>
          <Content>{t("common.afterBirth")}</Content>
          <BornWrapper>{returnNumberSelected(selectCity?.SK_4_ST)}</BornWrapper>
          <BornWrapper>{returnNumberSelected(selectCity?.SK_4_SM)}</BornWrapper>
        </HeaderTableWrapper>
        <HeaderTableWrapper>
          <Content>{t("common.hospitalStay")}</Content>
          <BornWrapper>{returnNumberSelected(selectCity?.SK_5_ST)}</BornWrapper>
          <BornWrapper>{returnNumberSelected(selectCity?.SK_5_SM)}</BornWrapper>
        </HeaderTableWrapper>
        <HeaderTableWrapper borderbottom>
          <Content>{t("common.exclusivelyBreastfed")} </Content>
          <BothWrapper>{returnNumberSelected(selectCity?.NK_4)}</BothWrapper>
        </HeaderTableWrapper>
      </CountryWrapper>
      <div>
        <ColorGroup>
          <Tag color="#fff">
            <TextBlack>{t("overview.notParticipate")}</TextBlack>
          </Tag>
          <Tag color="#bdc3c7">{t("overview.noDataYet")}</Tag>
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
                      getCityDataSelected(geo?.properties?.ten_tinh);
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
