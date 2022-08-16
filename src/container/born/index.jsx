import React from "react";
import { LinePoint } from "../line-chart/LinePoint";
import { BornWrapper } from "./styled";
import close from "../../assets/born/close.png";
import accept from "../../assets/born/accept.png";
import { useSelector } from "react-redux";

function RowComponent({ obstetric, index, elementST, elementSM, evaluation }) {
  const dashboardData = useSelector((state) => state?.data?.dashboardData);
  const currentQuarter = useSelector((state) => state?.data?.currentQuarter);

  return (
    <div className="row" key={obstetric.criteria}>
      <div className="stt">{index + 1}</div>
      <div className="criteria">{obstetric.criteria}</div>
      <div className="chart">
        <div className="container-chart">
          <LinePoint
            dataST={elementST}
            dataSM={elementSM}
            time={dashboardData?.time}
          />
        </div>
      </div>
      {elementSM ? (
        <>
          <div className="w-10">{elementST[currentQuarter] || ""}%</div>
          <div className="w-10">{elementSM[currentQuarter] || ""}%</div>
        </>
      ) : (
        <div className="w-20">{elementST[currentQuarter] || ""}%</div>
      )}

      <div className="w-10 border-none">
        <img
          alt=""
          src={evaluation[currentQuarter] === "passed" ? accept : close}
        />
      </div>
    </div>
  );
}

const BornComponent = ({ data, isGeneral, dataList, evaluation }) => {
  return (
    <BornWrapper>
      <div className="row sticky">
        <div className="stt font-bold">STT</div>
        <div className="criteria font-bold">Tiêu chí</div>
        <div className="chart font-bold">Biểu đồ</div>
        {dataList && dataList[1]?.values?.SM ? (
          <>
            <div className="w-10 font-bold">
              {isGeneral ? "Bà mẹ sau sinh" : "Sinh thường"}
            </div>
            <div className="w-10 font-bold">
              {isGeneral ? "Bà mẹ/ người CS trẻ" : "Sinh mổ"}
            </div>
          </>
        ) : (
          <div className="w-10 font-bold w-20">
            {isGeneral ? "Bà mẹ sau sinh" : "Chỉ số"}
          </div>
        )}
        <div className="w-10 font-bold  border-none">Đạt</div>
      </div>
      {dataList &&
        data?.map((element, index) => (
          <div key={String(index)}>
            <RowComponent
              obstetric={element}
              index={index}
              elementST={dataList[index + 1]?.values?.ST}
              elementSM={dataList[index + 1]?.values?.SM}
              evaluation={dataList[index + 1]?.values?.evaluation}
            />
          </div>
        ))}
    </BornWrapper>
  );
};

export default BornComponent;
