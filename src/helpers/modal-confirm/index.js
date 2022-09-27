import { Modal } from "antd";
const { confirm } = Modal;
export const showConfirm = ({ ...props }) => {
  confirm({
    title: props.title,
    width: props.width,
    className: `confirmCustom ${props.className} ${
      props.hideCancel ? " alert-comfirm-modal" : ""
    }`,
    content: props.content,
    onOk() {
      if (props.onOk) props.onOk();
    },
    onCancel() {
      if (props.onCancel) props.onCancel();
    },
  });
};
