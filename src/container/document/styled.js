import styled from "styled-components";
import background from "../../assets/brand/bg-app.jpg";

export const DocumentWrapper = styled.div`
  width: fit-content;
  padding: 20px;
  height: 100%;
  background-color: white;
  margin: 20px;
  overflow: auto;
  background-image: url(${background});
  border-radius: 8px;
  .document-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .select-document {
      width: 200px;
    }
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
`;
