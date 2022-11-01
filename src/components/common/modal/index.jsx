import ModalWrapper from "./styled";

const ModalNormal = ({
  visible,
  setVisible,
  className,
  onCancel,
  children,
  maskClosable = false,
  title = "Modal",
  afterClose,
  ...props
}) => {
  return (
    <ModalWrapper
      title={title}
      maskClosable={maskClosable}
      maskTransitionName=""
      className={className}
      open={visible}
      onOk={() => setVisible((prev) => !prev)}
      afterClose={afterClose}
      onCancel={() => {
        setVisible(false);
        if (onCancel) onCancel();
      }}
      footer={[]}
      {...props}
    >
      {children}
    </ModalWrapper>
  );
};

export default ModalNormal;
