import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
    </DashboardWrapper>
  );
};

export default Dashboard;
