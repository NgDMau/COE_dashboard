import { Select } from "antd";
import React from "react";
import { hostpitalList, listCity } from "./faleData";
import { FilterWrapper } from "./styled";

const FilterComponent = ({ disabled }) => {
  return (
    <FilterWrapper>
      <div className="adress">
        {!disabled && <span>Tỉnh/ Thành phố: </span>}
        {!disabled && (
          <Select
            labelInValue={listCity[1]}
            className="select-city"
            onChange={() => {}}
            disabled={disabled}
          >
            {listCity.map((element, index) => {
              return (
                <Select.Option key={String(index)}>
                  {index + 1}. {element}
                </Select.Option>
              );
            })}
          </Select>
        )}
        {!disabled && <span className="hostpital">Bệnh viện: </span>}
        {!disabled && (
          <Select
            labelInValue={hostpitalList[1]}
            className="select-hostpital"
            onChange={() => {}}
            disabled={disabled}
          >
            {hostpitalList.map((element, index) => {
              return (
                <Select.Option key={String(index)}>
                  {index + 1}. {element}
                </Select.Option>
              );
            })}
          </Select>
        )}
      </div>
      <div className="export">Xuất báo cáo</div>
    </FilterWrapper>
  );
};

export default FilterComponent;
