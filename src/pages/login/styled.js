import { Dropdown } from "antd";
import styled from "styled-components";
import background from "../../assets/brand/bg-app.jpg";
export const DropdownLanguage = styled(Dropdown)`
  position: fixed;
  top: 20px;
  right: 20px;
`;
export const LeftContent = styled.div`
  background-image: ${(props) =>
    props?.imgBg ? `url(${props?.imgBg})` : "unset"};
  width: 55vw;
  height: 100vh;
  background-size: cover;
`;
export const RightContent = styled.div`
  background-color: white;
  width: 45vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .login {
    h1 {
      text-align: center;
    }
    .input {
      height: 50px;
      margin-top: 20px;
      background-color: #ecf0f1;
      input {
        background-color: #ecf0f1;
      }
      box-shadow: none;
      border-radius: 8px;

      :hover {
        background-color: #e7e7e7;
      }
    }
    .btn-login {
      margin-top: 20px;
      height: 50px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      background-color: #2e3192;
      font-weight: bold;
      color: white;
      ::before {
        display: none;
      }
    }
    .btn-signUp {
      background-color: white;
      border: 1px solid #2e3192;
      color: #2e3192;
    }
    .error {
      color: tomato;
    }
  }
`;
export const LoginWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${background});
  background-size: cover;
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  .login-form {
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #b2bec3;
    padding: 10px;
    box-shadow: 3px 3px 3px 3px #dfe6e9;
    .form {
      display: flex;
      .logo {
        width: 250px;
        height: 250px;
        border-radius: 125px;
        background-color: white;
        overflow: hidden;
        margin: 16px;
        box-shadow: 2px 3px 5px 2px #b2bec3;
        display: flex;
        align-items: center;
        justify-content: center;
        .image {
          width: 240px;
          height: auto;
        }
      }
      .login {
        display: flex;
        flex-direction: column;
        padding: 16px;
        h1 {
          text-align: center;
          margin-bottom: 10px;
          font-weight: 400;
          font-size: 44px;
          text-shadow: 2px 2px #b2bec3;
        }
        .forgot-password {
          color: #b2bec3;
          text-align: right;
          padding: 10px 0;
          cursor: pointer;
        }
        .forgot-password:hover {
          text-decoration: underline;
        }
        .input {
          width: 300px;
          background: #f1f2f6;
          padding: 10px;
          border-radius: 20px;
          margin: 5px 0;
          .ant-input {
            background: #f1f2f6;
          }
        }
        .btn-login {
          height: 40px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          background-color: #ddfede;
          font-weight: bold;
          ::before {
            display: none;
          }
        }
        .error {
          color: tomato;
        }
      }
    }
  }
`;
