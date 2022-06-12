import React from "react";
import FilterComponent from "../dashboard/filter";
import { LinePoint } from "./line-chart/LinePoint";
import { ContainerWrapper } from "./styled";
import WidgetsDropdown from "./widgets/WidgetsDropdown";
import document from "../assets/brand/document.png";
import { screenFake } from "./screen";

const AppContainer = ({ screen, title }) => {
  return (
    <ContainerWrapper>
      <div className="header">
        <div className="path">
          <span>Home</span> / Dashboard / {screenFake[screen - 1]}
        </div>
        <FilterComponent disabled={screen === 2} />
      </div>
      {screen === 1 && (
        <div>
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
            <h2>{title}</h2>
            <LinePoint />
          </div>
        </div>
      )}
      {screen === 2 && (
        <div className="document-container">
          <h3 className="title">{title}</h3>
          <img src={document} alt="" className="document" />
        </div>
      )}
      {screen === 3 && <div>Quy định tài liệu</div>}
    </ContainerWrapper>
  );
};

export default AppContainer;
