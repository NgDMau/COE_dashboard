import React from "react";
import AppContainer from "../container";
import AppSidebar from "../sidebar";
import { DashboardWrapper } from "./styled";

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <AppSidebar />
      <AppContainer />
    </DashboardWrapper>
  );
};

export default Dashboard;
