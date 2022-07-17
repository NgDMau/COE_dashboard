import styled from "styled-components";

export const TableExportWrapper = styled.div`
  .quarter {
    color: #00a8ff;
    font-weight: 700;
    font-size: 20px;
    width: 100%;
    margin: 8px 0;
    text-align: end;
  }
  .header-table {
    display: flex;
    flex-direction: row;
    width: 100%;
    border: 1px solid #000;
    font-weight: 600;
    .content {
      width: 25%;
      padding: 10px;
      text-align: center;
      border-right: 1px solid #000;
    }
    .criteria {
      width: 60%;
      padding: 10px;
      text-align: center;
      border-right: 1px solid #000;
    }
    .achieve {
      width: 15%;
      padding: 10px;
      text-align: center;
    }
  }
  .body-table {
    display: flex;
    flex-direction: row;
    width: 100%;
    border: 1px solid #000;
    border-top: none;
    font-weight: 600;
    .content {
      width: 25%;
      padding: 6px;
      border-right: 1px solid #000;
    }
    .criteria {
      width: 60%;
      padding: 6px;
      border-right: 1px solid #000;
      font-style: italic;
    }
    .achieve {
      width: 15%;
      padding: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .summary-table {
    display: flex;
    flex-direction: row;
    width: 100%;
    border: 1px solid #000;
    border-top: none;
    font-weight: 600;
    .content {
      width: 25%;
      padding: 10px;
      border-right: 1px solid #000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .criteria {
      width: 60%;
      padding: 10px;
      border-right: 1px solid #000;
      font-style: italic;
    }
    .achieve {
      width: 15%;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
