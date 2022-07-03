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
`;
