import { Button, Input } from "antd";
import Dragger from "antd/lib/upload/Dragger";
import styled from "styled-components";

export const DraggerFile = styled(Dragger)`
  width: 400;
  .ant-upload {
  }
`;
export const ButtonSave = styled(Button)`
  margin-top: 12px;
`;
export const Title = styled.div`
  margin-top: 1.5em;
  margin-bottom: 8px;
`;
export const ButtonUpdate = styled.div`
  cursor: pointer;
  text-decoration: underline;
  margin-left: 20px;
  font-size: 14px;
  img {
    cursor: pointer;
    width: 28px;
    height: 28px;
  }
  :hover {
    color: green;
  }
`;
export const FormWrapper = styled.div`
  padding: 40px 20px 20px 20px;
  form {
    margin-top: 200px;
  }
  .ant-col-4 {
    flex: 1;
  }
  .ant-form-item-control {
    margin-left: 40px;
  }
  .Awarded {
    font-size: 18px;
    font-weight: 500;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .green {
    color: green;
    margin-left: 8px;
  }
  .blue {
    margin-left: 8px;
    color: blue;
  }
`;
export const UploadWrapper = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  img {
    cursor: pointer;
    width: 28px;
    height: 28px;
  }
`;
export const TitleUpdateDoc = styled.div`
  font-size: 20px;
  margin-top: 50px;
  font-weight: 500;
`;
export const CeckName = styled.span``;
export const SelectName = styled.span`
  color: tomato;
  font-weight: 500;
`;
export const InputDelete = styled(Input)`
  margin-top: 12px;
`;
export const ConfirmWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 16px;
`;
export const DeleteButton = styled(Button)`
  background-color: #74b9ff;
  width: 200px;
  font-weight: 500;
`;
export const CancelButton = styled(Button)`
  width: 200px;
  font-weight: 500;
`;
