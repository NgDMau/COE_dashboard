import styled from "styled-components";

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
  .content-chart {
    width: 70vw;
    height: 80vh;
    margin-left: 20px;
    margin-top: 20px;
    background-color: white;
    border-radius: 5px;
    h2 {
      margin-left: 20px;
      margin-top: 10px;
    }
  }
`;
