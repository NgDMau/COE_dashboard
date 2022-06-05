import React from "react";
import ContentComponent from "./content";
import FilterComponent from "./filter";
import ReportForm from "./report-form";
import { DashboardWrapper } from "./styled";

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <FilterComponent />
      <div className="content">
        <ReportForm />
        <ContentComponent />
      </div>
    </DashboardWrapper>
  );
};

export default Dashboard;
