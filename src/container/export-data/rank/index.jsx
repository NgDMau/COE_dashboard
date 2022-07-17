import React from "react";
import HeaderExport from "../header";
import { rankingData } from "./fakeData";
import { RankExporttWrapper } from "./styled";
import { Progress } from "antd";

const RankExport = () => {
  const getStattus = (array) => {
    let sum = 0;
    let count = 0;
    array.forEach((element) => {
      if (element !== null) {
        sum += element;
        count++;
      }
    });
    return (sum * 100) / (5 * count);
  };

  return (
    <RankExporttWrapper>
      <HeaderExport />
      <div className="table">
        <div className="title">
          <div>Xếp hạng bệnh viện dựa trên kết quả</div>
          <div>KSĐT Báo cáo quý: Q3/2021</div>
        </div>
        <div className="row-table background-color">
          <div className="hospital">Bệnh viện/ TTYT</div>
          <div className="count">S1</div>
          <div className="count">S2</div>
          <div className="count">S3</div>
          <div className="count">S4</div>
          <div className="count">S5</div>
          <div className="count">S6</div>
          <div className="progess center">Số điểm</div>
        </div>
        {rankingData.map((element, index) => (
          <div className="row-table border-top-none" key={String(index)}>
            <div className="hospital padding-left-14">{element.name}</div>
            {element?.count?.map((countElement, indexSub) => (
              <div className="count" key={String(indexSub)}>
                {countElement || ""}
              </div>
            ))}

            <div className="progess padding-left-14 flex-row">
              <Progress
                percent={getStattus(element?.count)}
                strokeLinecap="butt"
                className="progess-ant"
                size="lage"
                showInfo={false}
              />
              <div className="total">
                {((getStattus(element?.count) * 100 * 5) / 100 / 100).toFixed(
                  2
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </RankExporttWrapper>
  );
};

export default RankExport;
