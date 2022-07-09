import styled from "styled-components";
import background from "../assets/brand/bg-app.jpg";

export const DashboardWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${background});
  background-size: cover;
  display: flex;
  .container {
  }
  /* display: flex;
  flex-flow: column;
  .content {
    flex-grow: 1;
    display: flex;
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
  } */
`;
