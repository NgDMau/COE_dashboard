import { Button, Input, Select } from "antd";
import styled from "styled-components";

export const ItemHospitalWrapp = styled.div`
  margin-top: 8px;
  font-weight: 500;
`;
export const NotUpdateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const ImageItem = styled.img`
  width: 20px;
  height: auto;
  cursor: pointer;
  margin-left: 12px;
`;

// isUpdate
export const IsUpdateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const InputYear = styled(Input)`
  width: 50px;
  border-right: none;
  padding-right: 2px;
  padding-left: 2px;
`;
export const InputName = styled(Input)`
  width: 180px;
`;
export const ButtonSave = styled(Button)`
  background-color: #74b9ff;
  margin-left: 12px;
  :hover {
    border-color: green;
    background-color: #74b9ff;
    color: green;
  }
`;
export const ButtonCancel = styled(Button)`
  margin-left: 12px;
  :hover {
    border-color: green;
    color: green;
  }
`;
