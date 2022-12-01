import styled from "styled-components";
import { rem } from "../../helpers/rem/px-to-rem";

export const BtnExportCity = styled.div`
  cursor: pointer;
  border: 1px solid rgba(254, 166, 40, 0.5);
  border-radius: 4px;
  padding: 4px 8px;
  background-color: rgba(254, 166, 40, 0.5);
  :hover {
    border: 1px solid rgba(254, 166, 40, 1);
  }
`;
export const FilterWrapper = styled.div`
  width: 100%;
  background-color: white;
  padding: 1em;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${rem(60)};
  .back {
    margin-right: ${rem(20)};
    cursor: pointer;
    height: fit-content;
    font-size: 500;
    padding: ${rem(4)} ${rem(12)};
    background-color: #54a0ff;
    border-radius: 5px;
    color: white;
    :hover {
      box-shadow: 1px 1px 1px 1px #c8d6e5;
      background-color: #2e86de;
    }
  }
  .adress {
    display: flex;
    align-items: center;
    .export {
      padding: 5px 10px;
      width: 110px;
      background-color: white;
      border-radius: 4px;
      margin-right: 1em;
    }
    .select-city {
      margin-left: 1em;
      width: ${rem(160)};
    }
    .hostpital {
      margin-left: 2em;
    }
    .select-hostpital {
      margin-left: 1em;
      width: ${rem(250)};
    }
    .datePicker {
      margin-left: ${rem(40)};
    }
  }
  .fil-other {
    margin-top: 0.5em;
    display: flex;
    align-items: center;
    .input-n {
      width: ${rem(110)};
      border-radius: 2;
      margin-right: 1em;
    }
    .a-style {
      background-color: white;
      height: ${rem(30)};
      display: flex;
      align-items: center;
      justify-content: center;
      width: ${rem(60)};
      border-radius: 4px;
    }
    .information {
      margin-right: 1em;
      margin-left: 0.5em;
    }
    .select-information {
      width: ${rem(708)};
    }
  }
  .export {
    cursor: pointer;
    border: 1px solid #dfe6e9;
    border-radius: 4px;
    padding: 4px 8px;
    background-color: #ccffdd;
    :hover {
      border: 1px solid #00b894;
    }
  }
  box-shadow: 0 1px 2px -1px gray;
  .select-quarter {
    margin-left: 1em;
    width: ${rem(100)};
  }
`;
