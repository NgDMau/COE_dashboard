import styled from "styled-components";
import background from "../assets/brand/bg-app.jpg";

export const ContainerWrapper = styled.div`
  height: 100vh;
  overflow: auto;
  padding-bottom: 2em;
  .header {
    position: sticky;
    top: 0;
  }
  .path {
    /* height: 50px; */
    background-color: white;
    border-bottom: 0.5px solid #dfe6e9;
    padding: 10px;
    font-size: 18px;
    span {
      cursor: pointer;
    }
    span:hover {
      text-decoration: underline;
    }
  }
  width: 100%;
  .Widgets-container {
    margin-top: 20px;
    display: flex;
    width: 70vw;
    margin-left: 20px;
    justify-content: space-between;
  }
  .segmented {
    margin-left: 20px;
    margin-top: 20px;
    /* .ant-segmented {
      border-radius: 10px;
      .ant-segmented-item-selected {
        border-radius: 10px;
      }
    } */
  }
  .content-chart {
    width: 70vw;
    height: 90vh;
    padding-top: 1em;
    margin-left: 20px;
    margin-top: 20px;
    background-color: white;
    border-radius: 5px;
    h2 {
      margin-left: 20px;
      margin-top: 10px;
    }
  }
  .document-container {
    width: fit-content;
    padding: 20px;
    height: 100%;
    background-color: white;
    margin: 20px;
    overflow: auto;
    background-image: url(${background});
    border-radius: 8px;
  }
  .link-container {
    background-image: url(${background});
    width: 90%;
    background-size: cover;
    padding: 20px;
    margin: 20px;
    font-size: 20px;
  }
  .link {
    cursor: pointer;
    margin-left: 1em;
  }
  .link:hover {
    text-decoration: underline;
    color: blue;
  }
`;
