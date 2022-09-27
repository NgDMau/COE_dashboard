import ModalWrapper from "./styled";

const ModalNormal = ({
  visible,
  setVisible,
  className,
  onCancel,
  children,
  maskClosable = false,
  title = "Modal",
  ...props
}) => {
  return (
    <ModalWrapper
      title={title}
      maskClosable={maskClosable}
      maskTransitionName=""
      className={className}
      visible={visible}
      onOk={() => setVisible((prev) => !prev)}
      onCancel={() => {
        setVisible((prev) => !prev);
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
