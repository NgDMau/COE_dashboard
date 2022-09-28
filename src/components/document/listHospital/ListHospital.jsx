import React from "react";
import { rankingData } from "../../../container/export-data/rank/fakeData";
import { ListHospitalWrapper, TitleListHospital } from "./styled";

const ListHospital = () => {
  return (
    <ListHospitalWrapper>
      <TitleListHospital>
        List of hospitals that won the title
      </TitleListHospital>
      {rankingData.map((element) => (
        <div>{element.name}</div>
      ))}
    </ListHospitalWrapper>
  );
};

export default ListHospital;
