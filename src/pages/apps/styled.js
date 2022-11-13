import styled from "styled-components";
import background from "../../assets/brand/bg-app.jpg";
import background1 from "../../assets/brand/img_1.JPG";
import background2 from "../../assets/brand/img_2.jpg";

export const AppsWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${background});
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo {
    position: absolute;
    top: 20px;
    left: 20px;
    img {
      width: 80px;
      height: 80px;
    }
  }
  .item {
    width: 33vw;
    height: 33vw;
    padding: 10px;
    font-size: 30px;
    box-shadow: 1px 2px 2px 1px #dfe6e9;
    line-height: 35px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: flex-end;
    text-align: center;
    color: #ffffff;
    justify-content: center;
  }
  .title {
    height: 10vw;
    width: 329px;
    text-align: center;
  }
  .blue {
    background-image: url(${background1});
    background-size: cover;
    :hover {
      .hover-image-1 {
        visibility: visible;
      }
    }
  }
  .yellow {
    background-image: url(${background2});
    background-size: cover;
    margin: 0 4px;
    :hover {
      .hover-image-2 {
        visibility: visible;
      }
    }
  }
  .green {
    background-image: url(${background1});
    background-size: cover;
    :hover {
      .hover-image-3 {
        visibility: visible;
      }
    }
  }
  .hover-image-1 {
    visibility: hidden;
    background-color: #000;
    width: 33vw;
    height: 33vw;
    position: absolute;
    margin-bottom: -10px;
    opacity: 0.3;
    z-index: 2;
  }
  .hover-image-2 {
    visibility: hidden;
    background-color: #000;
    width: 33vw;
    height: 33vw;
    position: absolute;
    margin-bottom: -10px;
    opacity: 0.3;
    z-index: 2;
  }
  .hover-image-3 {
    visibility: hidden;
    background-color: #000;
    width: 33vw;
    height: 33vw;
    position: absolute;
    margin-bottom: -10px;
    opacity: 0.3;
    z-index: 2;
  }
  .footer {
    width: 100vw;
    height: 60px;
    background-color: #ecf0f1;
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    img {
      width: auto;
      height: 40px;
      margin-right: 60px;
      margin-left: 12px;
    }
    div:first-child {
      margin-right: 60px;
    }
  }
`;
