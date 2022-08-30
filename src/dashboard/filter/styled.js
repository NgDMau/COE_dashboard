import styled from "styled-components";

export const FilterWrapper = styled.div`
  width: 100%;
  background-color: white;
  padding: 1em;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  .back {
    margin-right: 20px;
    cursor: pointer;
    height: fit-content;
    font-size: 500;
    padding: 4px 12px;
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
      width: 200px;
    }
    .hostpital {
      margin-left: 2em;
    }
    .select-hostpital {
      margin-left: 1em;
      width: 400px;
    }
    .datePicker {
      margin-left: 40px;
    }
  }
  .fil-other {
    margin-top: 0.5em;
    display: flex;
    align-items: center;
    .input-n {
      width: 110px;
      border-radius: 2;
      margin-right: 1em;
    }
    .a-style {
      background-color: white;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      border-radius: 4px;
    }
    .information {
      margin-right: 1em;
      margin-left: 0.5em;
    }
    .select-information {
      width: 708px;
    }
  }
  .export {
    cursor: pointer;
    border: 1px solid #dfe6e9;
    border-radius: 4px;
    padding: 4px 16px;
    background-color: #ccffdd;
    :hover {
      border: 1px solid #00b894;
    }
  }
  box-shadow: 0 1px 2px -1px gray;
  .select-quarter {
    margin-left: 1em;
    width: 100px;
  }
`;
