import { Select } from "antd";
import React from "react";
import { hostpitalList, listCity } from "./faleData";
import { FilterWrapper } from "./styled";

const FilterComponent = ({ disabled }) => {
  return (
    <FilterWrapper>
      <div className="adress">
        <div className="export">Chuyển Excel</div>

        <span>Tỉnh/ Thành phố: </span>
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

        <span className="hostpital">Bệnh viện: </span>
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
      </div>
    </FilterWrapper>
  );
};

export default FilterComponent;
