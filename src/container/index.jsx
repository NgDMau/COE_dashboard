import React from "react";
import FilterComponent from "../dashboard/filter";
import { LinePoint } from "./line-chart/LinePoint";
import { ContainerWrapper } from "./styled";
import WidgetsDropdown from "./widgets/WidgetsDropdown";

const AppContainer = () => {
  return (
    <ContainerWrapper>
      <div className="header">
        <div className="path">
          <span>Home</span> / Dashboard
        </div>
        <FilterComponent />
      </div>
      <div className="Widgets-container">
        <WidgetsDropdown
          amount="26K"
          semibold="Users"
          percent="12.4"
          color="#321fdb"
        />
        <WidgetsDropdown
          amount="$6.200"
          semibold="Income"
          percent="40.9"
          color="#39f"
        />
        <WidgetsDropdown
          amount="2.49"
          semibold="Conversion Rate"
          percent="84.7"
          color="#f9b115"
        />
        <WidgetsDropdown
          amount="44K"
          semibold="Sessions"
          percent="23.6"
          color="#e55353"
        />
      </div>
      <div className="content-chart">
        <h2>1.a Da kề st</h2>

        <LinePoint />
      </div>
    </ContainerWrapper>
  );
};

export default AppContainer;
