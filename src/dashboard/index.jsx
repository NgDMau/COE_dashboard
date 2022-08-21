import React, { useState } from "react";
import VietNamChart from "../components/VietNamChart/VietNamChart";
import AppContainer from "../container";
import AppSidebar from "../sidebar";
import { DashboardWrapper } from "./styled";

const Dashboard = () => {
  const [screen, setScreen] = useState(1);
  const [title, setTitle] = useState("");
  return (
    <DashboardWrapper>
      <AppSidebar screen={screen} setScreen={setScreen} setTitle={setTitle} />
      <AppContainer screen={screen} title={title} setScreen={setScreen} />
      {/* <VietNamChart /> */}
    </DashboardWrapper>
  );
};

export default Dashboard;
