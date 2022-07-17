import styled from "styled-components";

export const RankExporttWrapper = styled.div`
  width: 100%;
  .title {
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 10px;
    color: #00a8ff;
  }
  .padding-left-14 {
    padding-left: 14px !important;
  }
  .border-top-none {
    border-top: none !important;
  }
  .background-color {
    background-color: #00a8ff;
    color: white;
  }
  .center {
    text-align: center;
    font-weight: 700;
  }
  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .table {
    font-weight: 500;
    .row-table {
      display: flex;
      flex-direction: row;
      border: 1px solid #000;
      .hospital {
        padding: 4px 0px;
        width: 30%;
        border-right: 1px solid #000;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .count {
        padding: 4px 0px;
        width: 3%;
        border-right: 1px solid #000;
        text-align: center;
      }
      .progess {
        padding: 4px 0px;
        width: 52%;
      }
    }
  }
  .progess-ant {
    width: 300px;
    .ant-progress-inner {
      height: 14px;
      .ant-progress-bg {
        height: 14px !important;
      }
    }
  }
  .total {
    margin-left: 10px;
  }
`;
