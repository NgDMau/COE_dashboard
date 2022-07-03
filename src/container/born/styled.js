import styled from "styled-components";

export const BornWrapper = styled.div`
  padding: 10px;
  .font-bold {
    font-weight: 500;
    font-size: 16px !important;
  }
  .sticky {
    position: sticky;
    top: 109px;
    background-color: white;
    border-top: 1px solid #ced6e0 !important;
    border-bottom: 1px solid #ced6e0;
  }
  .row {
    display: flex;
    flex-direction: row;
    border: 1px solid #ced6e0;
    border-top: none;
    div {
      padding: 10px;
      border-right: 1px solid #ced6e0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .stt {
      width: 5%;
      font-size: 20px;
      font-weight: 500;
    }
    .w-10 {
      width: 7%;
      display: flex;
      justify-content: center;
      font-size: 20px;
      img {
        margin-top: 10px;
        width: fit-content;
        height: fit-content;
      }
    }
    .criteria {
      width: 20%;
      font-size: 20px;
    }
    .chart {
      width: 54%;
      height: auto;
      .container-chart {
        width: 100%;
        height: 100%;
        border: 1px solid #ced6e0;
      }
    }
    .border-none {
      border-right: none;
    }
  }
`;
