import { Spin } from "antd";
import React from "react";
import { LoadingWrapper } from "./loadingStyle";

const Loading = () => {
  return (
    <LoadingWrapper>
      <Spin tip="Loading..." />
    </LoadingWrapper>
  );
};

export default Loading;
