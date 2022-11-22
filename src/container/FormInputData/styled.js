import { Button, Input } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import styled from 'styled-components';
import { rem } from '../../helpers/rem/px-to-rem';

export const DraggerFile = styled(Dragger)`
  width: 400;
  .ant-upload {
  }
`;
export const ButtonSave = styled(Button)`
  margin-top: ${rem(12)};
`;
export const Title = styled.div`
  margin-top: 1.5em;
  margin-bottom: ${rem(8)};
`;
export const ButtonUpdate = styled.div`
  cursor: pointer;
  text-decoration: underline;
  margin-left: ${rem(20)};
  font-size: ${rem(14)};
  img {
    cursor: pointer;
    width: ${rem(28)};
    height: ${rem(28)};
  }
  :hover {
    color: green;
  }
`;
export const FormWrapper = styled.div`
  padding: ${rem(40)} ${rem(20)} ${rem(20)} ${rem(20)};
  form {
    margin-top: ${rem(200)};
  }
  .ant-col-4 {
    flex: 1;
  }
  .ant-form-item-control {
    margin-left: ${rem(40)};
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
    margin-left: ${rem(8)};
  }
  .blue {
    margin-left: ${rem(8)};
    color: blue;
  }
`;
export const UploadWrapper = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${rem(16)};
  img {
    cursor: pointer;
    width: ${rem(28)};
    height: ${rem(28)};
  }
`;
export const TitleUpdateDoc = styled.div`
  font-size: 20px;
  margin-top: ${rem(50)};
  font-weight: 500;
`;
export const CeckName = styled.span``;
export const SelectName = styled.span`
  color: tomato;
  font-weight: 500;
`;
export const InputDelete = styled(Input)`
  margin-top: ${rem(12)};
`;
export const ConfirmWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: ${rem(16)};
`;
export const DeleteButton = styled(Button)`
  background-color: #74b9ff;
  width: ${rem(200)};
  font-weight: 500;
`;
export const CancelButton = styled(Button)`
  width: ${rem(200)};
  font-weight: 500;
`;
