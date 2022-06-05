import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import React from "react";
import { listCity } from "./listCity";
import { FilterWraper } from "./styled";

const FilterComponent = () => {
  return (
    <FilterWraper>
      <div className="adress">
        <span>Tinhr/Thành phố: </span>
        <Select
          defaultValue={listCity[1]}
          className="select"
          onChange={() => {}}
        >
          {listCity.map((element, index) => {
            return (
              <Option key={String(index)}>
                {index + 1}. {element}
              </Option>
            );
          })}
        </Select>

        <div className="hostpital"></div>
      </div>
    </FilterWraper>
  );
};

export default FilterComponent;
