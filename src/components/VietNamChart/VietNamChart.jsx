import { Tag } from "antd";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { ColorGroup, ContentWrapper, VietNamChartWrapper } from "./styled";

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
const VietNamChart = ({ onSelectCity }) => {
  const { t } = useTranslation();
  const vietnam = [vietnamGeoUrl];
  const [content, setContent] = useState("");
  return (
    <VietNamChartWrapper>
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
            marginTop: "50px",
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
                      if (onSelectCity) {
                        onSelectCity(geo?.properties?.ten_tinh);
                      }
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
