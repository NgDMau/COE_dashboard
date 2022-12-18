import styled from "styled-components";
import { rem } from "../../../helpers/rem/px-to-rem";

export const STT = styled.div`
  width: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-right: 1px solid #000;
`;
export const TableExportWrapper = styled.div`
  .quarter {
    color: #00a8ff;
    font-weight: 700;
    font-size: 20px;
    width: 100%;
    margin: ${rem(8)} 0;
    text-align: end;
  }
  .header-table {
    display: flex;
    flex-direction: row;
    width: 100%;
    border: 1px solid #000;
    font-weight: 600;
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30%;
      padding: ${rem(10)};
      text-align: center;
      border-right: 1px solid #000;
    }
    .criteria {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      padding: ${rem(10)};
      text-align: center;
      border-right: 1px solid #000;
    }
    .achieve {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 15%;
      padding: ${rem(10)};
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
      width: 30%;
      padding: ${rem(6)};
      border-right: 1px solid #000;
    }
    .criteria {
      width: 50%;
      padding: ${rem(6)};
      border-right: 1px solid #000;
      font-style: italic;
    }
    .achieve {
      width: 15%;
      padding: ${rem(6)};
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
      width: 35%;
      padding: ${rem(10)};
      border-right: 1px solid #000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .criteria {
      width: 50%;
      padding: ${rem(10)};
      border-right: 1px solid #000;
      font-style: italic;
    }
    .achieve {
      width: 15%;
      padding: ${rem(10)};
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
