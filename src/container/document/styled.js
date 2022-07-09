import styled from "styled-components";

export const DocumentWrapper = styled.div`
  width: 100%;
  background: none;
  display: flex;
  justify-content: center;
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
        width: 200px;
      }
    }
    .document {
      width: 60vw;
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
`;
