import styled from "styled-components";

export const TableChartWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  .border-right-none {
    border-right: none !important;
  }
  .border-top-none {
    border-top: none !important;
  }
  .margin-top-2 {
    margin-top: 2px;
  }
  .title-content {
    color: #00a8ff;
    font-weight: 700;
  }
  .padding-left-30 {
    padding-left: 30px !important;
  }
  .background-color {
    background-color: #00a8ff;
    color: white;
  }
  .warning {
    color: tomato;
    text-decoration: underline;
  }
  .header-chart {
    display: flex;
    flex-direction: row;
    border: 1px solid #000;
    .criteria {
      padding: 4px 4px;
      width: 60%;
      border-right: 1px solid #000;
      font-weight: 500;
    }
    .quarter {
      padding: 4px 0;
      width: 5%;
      border-right: 1px solid #000;
      text-align: center;
      font-weight: 500;
    }
  }
`;
