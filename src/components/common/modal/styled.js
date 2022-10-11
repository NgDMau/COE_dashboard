import { Modal } from "antd";
import styled from "styled-components";

import closeNewModal from "../../../assets/brand/close-circle.svg";

const ModalWrapper = styled(Modal)`
  .ant-modal-header {
    background-color: #222433;
    height: 3.125rem;
    display: flex;
    align-items: center;
    padding: 0 0 0 1.563rem;
  }

  .ant-modal-close {
    height: 3.125rem;
    display: flex;
    align-items: center;
    .ant-modal-close-x {
      background-image: url(${closeNewModal});
      background-size: auto;
      background-repeat: no-repeat;
      background-position: center;
      span {
      }
      svg {
        display: none;
      }
    }
  }
  .ant-modal-title {
    color: #fff;
    font-size: 20px;
  }
  .ant-modal-footer {
    display: none;
  }
  .ant-modal-body {
    padding: ${(props) => (props?.padding ? `${props.padding}` : "24px")};
  }
  .ant-modal-content {
    border-radius: 5px;
  }
`;

export default ModalWrapper;
