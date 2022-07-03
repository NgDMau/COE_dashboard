import React from "react";
import { LinePoint } from "../line-chart/LinePoint";
import { BornWrapper } from "./styled";
import close from "../../assets/born/close.png";
import accept from "../../assets/born/accept.png";

function RowComponent({ obstetric, index }) {
  return (
    <div className="row" key={obstetric.criteria}>
      <div className="stt">{index + 1}</div>
      <div className="criteria">{obstetric.criteria}</div>
      <div className="chart">
        <div className="container-chart">
          <LinePoint />
        </div>
      </div>
      <div className="w-10">{obstetric.caesarean}</div>
      <div className="w-10">{obstetric.normal}</div>
      <div className="w-10 border-none">
        <img alt="" src={obstetric.achieve ? accept : close} />
      </div>
    </div>
  );
}

const BornComponent = ({ data, isGeneral }) => {
  return (
    <BornWrapper>
      <div className="row sticky">
        <div className="stt font-bold">STT</div>
        <div className="criteria font-bold">Tiêu chí</div>
        <div className="chart font-bold">Biểu đồ</div>
        <div className="w-10 font-bold">
          {isGeneral ? "Bà mẹ sau sinh" : "Sinh thường"}
        </div>
        <div className="w-10 font-bold">
          {isGeneral ? "Bà mẹ/ người CS trẻ" : "Sinh mổ"}
        </div>
        <div className="w-10 font-bold  border-none">Đạt</div>
      </div>
      {data?.map((element, index) => (
        <div key={String(index)}>
          <RowComponent obstetric={element} index={index} />
        </div>
      ))}
    </BornWrapper>
  );
};

export default BornComponent;
