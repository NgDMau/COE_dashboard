import { Select } from "antd";
import React from "react";
import { hostpitalList, listCity } from "../../filter/faleData";
// import ReportChart from "./dake-chart";
// import ReportLineChart from "./line-chart";
import { LinePoint } from "./line-chart/LinePoint";
import { ReportWrapper } from "./styled";

const Report = () => {
  return (
    <ReportWrapper>
      <div className="header">
        <div className="filter">
          <div>
            <span>Tỉnh/ Thành phố: </span>
            <Select
              labelInValue={listCity[1]}
              className="select-city"
              onChange={() => {}}
            >
              {listCity.map((element, index) => {
                return (
                  <Select.Option key={String(index)}>
                    {index + 1}. {element}
                  </Select.Option>
                );
              })}
            </Select>
          </div>
          <div>
            <span className="hostpital">Bệnh viện: </span>
            <Select
              labelInValue={hostpitalList[1]}
              className="select-hostpital"
              onChange={() => {}}
            >
              {hostpitalList.map((element, index) => {
                return (
                  <Select.Option key={String(index)}>
                    {index + 1}. {element}
                  </Select.Option>
                );
              })}
            </Select>
          </div>
        </div>
        <div className="title-chart-container">
          <div>
            1a. Tỷ lệ ca có thực hiện da kề da và thực hiện da kề da đúng yêu
            cầu (đủ 90 phút liên tục) với sinh thường
          </div>
          <div className="title-chart">
            <div>Thực hiện da kề </div>
            <div>Da kề đủ 90 phút liên tục</div>
            <div className="quarter">Quý</div>
          </div>
        </div>
      </div>
      <div className="chart-container">
      <LinePoint />
        {/* <div className="chart">
            <LinePoint />
        </div> */}
        {/* <div className="chart">
          <ReportChart />
        </div>
        <div className="chart">
          {" "}
          <ReportChart color="red" />
        </div> */}
        {/* <div className="quarter">
          <div>Q1/2021</div>
          <div>Q2/2021</div>
          <div>Q3/2021</div>
          <div>Q4/2021</div>
          <div>Q1/2022</div>
          <div>Q2/2022</div>
          <div>Q3/2022</div>
          <div>Q4/2022</div>
        </div> */}
      </div>
    </ReportWrapper>
  );
};

export default Report;
