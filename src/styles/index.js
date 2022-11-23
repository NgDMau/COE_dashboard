import { createGlobalStyle } from "styled-components";

const StyleGlobal = createGlobalStyle`
  html,
  body, html {
      /* font-family: Roboto, "Segoe UI"; */
  }
  .alert-comfirm-modal {
      .ant-btn-default {
        display: none;
      }
    }
  .confirmCustom {
      position: absolute;
      left: -50%;
      right: -50%;
      top: 35%;
      .ant-modal-body {
          padding: 20px;
          min-height: 5.875rem;
          margin-right: 0;
      }
      .ant-modal-content {
          border-radius: 5px;
          min-height: 5.875rem;
          .ant-modal-confirm-body-wrapper {
              width: 100%;
              min-height: 5.875rem;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .anticon-exclamation-circle {
                  display: none;
              }
              .ant-modal-confirm-title {
                  margin-top: -1em;
                  font-weight: 400;
                  font-size: 14px;
              }
              .ant-modal-confirm-btns {
                  width: 100%;
                  display: flex;
                  justify-content: flex-end;
                  margin-bottom: -1em;
                  margin-top: 0;
                  .ant-btn-default {
                      color: #bdbdbd;
                      border: none;
                      text-transform: uppercase;
                      font-size: 14px;
                      outline: none;
                  }
                  .ant-btn-primary {
                      background: none;
                      border: none;
                      text-shadow: none;
                      box-shadow: none;
                      color: #fea628;
                      font-size: 14px;
                      font-weight: 500;
                  }
                  button:focus {
                      outline: none;
                  }
                  button:focus {
                      outline: none;
                  }
              }
          }
      }
  }
`;
export default StyleGlobal;
