import React from "react";
import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const vietnamGeoUrl =
  "https://res.cloudinary.com/pv-duc/raw/upload/v1626132866/province.json?fbclid=IwAR1fDTBNTPRKAq9Vw2JXrKWmhL8mQI_S9yLcgB9uTyTPKxUe492rj1-vowQ";

const VietNamChart = () => {
  const vietnam = [vietnamGeoUrl];
  const [content, setContent] = useState("");
  console.log("content", content);
  return (
    <div>
      <ComposableMap
        data-tip=""
        projection="geoMercator"
        projectionConfig={{
          scale: 2000,
          center: [105, 15],
        }}
        style={{
          marginTop: "100px",
          width: "500px",
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
                      fill: geo?.properties?.gid === 46 ? "red" : "#808080",
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
  );
};

export default VietNamChart;
