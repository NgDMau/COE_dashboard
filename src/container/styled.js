import { Button } from "antd";
import styled from "styled-components";

export const SpinWrapper = styled.div`
  width: 70vw;
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;
export const ChartWrapper = styled.div`
  width: 70vw;
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

export const PathWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-bottom: 0.5px solid #dfe6e9;
  padding: 10px;
  font-size: 18px;
  span {
    cursor: pointer;
  }
  span:hover {
    text-decoration: underline;
  }
`;
export const IConLanguage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;
export const Buttonanguage = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 85px;
 
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
    margin-top: 20px;
    display: flex;
    width: 70vw;
    margin-left: 20px;
    justify-content: space-between;
  }
  .segmented {
    width: 70vw;
    margin-left: 20px;
    margin-top: 20px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    .select-quarter {
      width: 160px;
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
    width: 70vw;
    padding-top: 1em;
    margin-left: 20px;
    margin-top: 20px;
    background-color: white;
    border-radius: 5px;
    h2 {
      margin-left: 20px;
      margin-top: 10px;
    }
  }
`;
