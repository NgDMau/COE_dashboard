import React from "react";
import { WidgetsWrapper } from "./styled";

const WidgetsDropdown = ({ amount, semibold, percent, color }) => {
  return (
    <WidgetsWrapper color={color}>
      <div className="title">
        <span>{amount}</span> (-{percent}% )
      </div>
      <div>{semibold}</div>
    </WidgetsWrapper>
  );
};

export default WidgetsDropdown;
