import { Button } from "antd";
import styled from "styled-components";
import { rem } from "../helpers/rem/px-to-rem";

export const ChartContainerWrapper = styled.div`
  border: 1px solid #ecf0f1;
  padding: 12px;
  margin-bottom: 20px;
  position: relative;
`;
export const SpinWrapper = styled.div`
  width: 70vw;
  display: flex;
  justify-content: center;
  margin-top: ${rem(100)};
`;
export const ChartWrapper = styled.div`
  ${(props) =>
    props?.isCollapse
      ? `calc(100vw - ${rem(85)})`
      : `calc(100vw - ${rem(230)})`};
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: ${rem(100)};
  align-items: center;
`;

export const PathWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-bottom: 0.5px solid #dfe6e9;
  padding: ${rem(10)};
  font-size: 18px;
  span {
    cursor: pointer;
  }
  span:hover {
    text-decoration: underline;
  }
`;
export const IConLanguage = styled.img`
  width: ${rem(20)};
  height: ${rem(20)};
  margin-right: ${rem(8)};
`;
export const Buttonanguage = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${rem(85)};
`;

export const ContainerWrapper = styled.div`
  height: 100vh;
  overflow: auto;
  padding-bottom: 2em;
  .header {
    z-index: 1000;
    position: sticky;
    top: 0;
  }
  width: 100%;
  .Widgets-container {
    margin-top: ${rem(20)};
    display: flex;
    width: 70vw;
    margin-left: ${rem(20)};
    justify-content: space-between;
  }
  .segmented {
    width: 70vw;
    margin-left: ${rem(20)};
    margin-top: ${rem(20)};
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    .select-quarter {
      width: ${rem(160)};
    }
    .ant-segmented {
      /* border-radius: 10px; */
      .ant-segmented-item-selected {
        /* border-radius: 10px; */
        color: #6f21d1;
        font-weight: 700;
      }
    }
  }
  .content-chart {
    width: ${(props) =>
      props?.isCollapse
        ? `calc(100vw - ${rem(85)})`
        : `calc(100vw - ${rem(230)})`};
    padding-top: 1em;
    margin-left: ${rem(10)};
    margin-top: ${rem(20)};
    background-color: white;
    border-radius: 5px;
    h2 {
      margin-left: ${rem(20)};
      margin-top: ${rem(20)};
    }
  }
`;
