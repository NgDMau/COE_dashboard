import styled from "styled-components";
import background from "../../assets/brand/bg-logo.jpg";
export const AppsWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${background});
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    padding: 40px 60px 80px 60px;
    display: flex;
    background-color: white;
    border-radius: 10px;
    border: 1px solid #b2bec3;
    box-shadow: 3px 3px 3px 3px #dfe6e9;
    background: rgba(51, 170, 51, 0.007);
    .item {
      width: 250px;
      height: 250px;
      margin: 30px;
      padding: 40px 30px 40px 30px;
      font-size: 30px;
      box-shadow: 1px 2px 2px 1px #dfe6e9;
      border-radius: 20px;
      line-height: 35px;
      font-weight: 500;
      cursor: pointer;
    }
    .blue {
      background-color: #aed7ff;
    }
    .yellow {
      background-color: #ecb846;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .green {
      background-color: #81f681;
    }
  }
`;
