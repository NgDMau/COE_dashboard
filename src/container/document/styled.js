import { Button, Select } from "antd";
import styled from "styled-components";

export const DocumentWrapper = styled.div`
  width: 100%;
  background: none;
  display: flex;
  .width-300 {
    width: 300px;
  }
  .document-container {
    width: fit-content;
    background-color: white;
    padding: 20px;
    margin: 20px;
    overflow: auto;
    border-radius: 8px;
    .document-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .select-document {
        width: 250px;
      }
    }
    .document {
      width: 60vw;
      height: 80vh;
      height: fit-content;
    }
    .title {
      border: 1px solid #ecf0f1;
      border-radius: 4px;
      display: flex;
      align-items: center;
      padding: 6px 10px;
      cursor: pointer;
      font-weight: 500;
      img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
    .title:hover {
      color: green;
      cursor: pointer;
    }
  }
  .container {
    /* To position the loading */
    position: relative;
  }

  .loading {
    /* Absolute position */
    left: 0;
    position: absolute;
    top: 0;

    /* Take full size */
    height: 100%;
    width: 100%;

    /* Center */
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;
export const ButtonDownload = styled.div`
  border-radius: 4px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  padding: 6px 10px;
  cursor: pointer;
  font-weight: 500;
  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  :hover {
    color: green;
    cursor: pointer;
  }
`;
export const SelectWrapper = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  div {
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  img {
    width: 20px;
    height: 20px;
  }
`;
export const SelectWrapperDoc = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;
export const CreatefromWrapper = styled.div`
  margin-top: -50px;
  width: 800px;
  height: 800px;
`;
export const ButtonCustom = styled(Button)`
  margin-right: 12px;
`;
