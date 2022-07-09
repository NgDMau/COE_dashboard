import React, { useState } from "react";
import { LinkOutlined } from "@ant-design/icons";
import { SurveyLinkWrapper } from "./styled";
import { listCity } from "../../dashboard/filter/faleData";
import Input from "antd/lib/input/Input";
import ChartLink from "./chart";
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
  const [cities, setCities] = useState([...listCity]);
  const [selected, setSelected] = useState(null);

  return (
    <SurveyLinkWrapper>
      <Input
        className="search-input"
        placeholder="Tìm kiếm..."
        onChange={(e) => {
          setCities(
            listCity.filter((element) =>
              toNomal(element)
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
              className={`link-container ${element === selected && "selected"}`}
              onClick={() => setSelected(element)}
            >
              <LinkOutlined />
              {"   "} {element}:{" "}
            </div>
          ))}
        </div>
        <div className="link-selected">
          <span
            className="link"
            onClick={() => {
              window.open("https://bmte.vn/form/quang_nam/v2");
            }}
          >
            {" "}
            https://bmte.vn/form/quang_nam/v2
          </span>
          <div className="chart">
            <ChartLink />
          </div>
        </div>
      </div>
    </SurveyLinkWrapper>
  );
};

export default SurveyLink;
