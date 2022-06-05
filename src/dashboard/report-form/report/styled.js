import styled from "styled-components";

export const ReportWrapper = styled.div`
  .header {
    display: flex;
    .filter {
      display: flex;
      flex-direction: column;
      width: 415px;
      align-items: flex-end;
      margin-right: 1em;
      .hostpital {
      }
      .select-hostpital {
        width: 300px;
      }
      .select-city {
        width: 300px;
      }
    }
    .title-chart-container {
      div {
        height: 30px;
      }
      .title-chart {
        display: flex;
        align-items: center;
        justify-content: center;
        div {
          margin-top: 0.5em;
          display: flex;
          align-items: flex-end;
          width: 410px;
        }
        div:nth-child(2) {
          padding-left: 0.5em;
        }
        .quarter {
          padding-left: 1em;
          width: 70px;
        }
      }
    }
  }
  .chart-container {
    display: flex;
    .chart {
      width: 410px;
      height: 400px;
      margin: 0.5em;
      border: 1px solid gray;
    }
    .quarter {
      div {
        width: 70px;
        padding: 0.2em 0.3em;
        cursor: default;
      }
      div:hover {
        background-color: gray;
      }
    }
  }
`;
