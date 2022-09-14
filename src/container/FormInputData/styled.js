import { Button } from "antd";
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
