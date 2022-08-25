import { Tag } from "antd";
import React from "react";
import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { ColorGroup, ContentWrapper, VietNamChartWrapper } from "./styled";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

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
const VietNamChart = () => {
  const vietnam = [vietnamGeoUrl];
  const [content, setContent] = useState("");
  console.log("content", content);
  return (
    <VietNamChartWrapper>
      <ContentWrapper>{content}</ContentWrapper>
      <div>
        <ColorGroup>
          <Tag color="#d9f7be">Dưới 100</Tag>
          <Tag color="#b7eb8f">100 - 200</Tag>
          <Tag color="#95de64">200 - 300</Tag>
          <Tag color="#73d13d">300 - 400</Tag>
          <Tag color="#52c41a">400 - 500</Tag>
          <Tag color="#389e0d">500 - 600</Tag>
          <Tag color="#237804">Trên 600</Tag>
        </ColorGroup>
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
                    onMouseEnter={() => {
                      console.log("geo", geo);
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
