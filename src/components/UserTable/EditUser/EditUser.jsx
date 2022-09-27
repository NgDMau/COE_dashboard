import { Input } from "antd";
import React from "react";
import { Title } from "../../../container/FormInputData/styled";
import {
  ButtonCancel,
  ButtonSave,
  ButtonWrapper,
  EditUserWrapper,
} from "../styled";

const EditUser = ({ setIsOpen }) => {
  return (
    <EditUserWrapper>
      <div>
        <Title>Manager</Title>
        <Input placeholder="Manager Name" />
      </div>
      <div>
        <Title>Role</Title>
        <Input placeholder="Role" />
      </div>
      <div>
        <Title>Hospital</Title>
        <Input placeholder="Hospital Name" />
      </div>
      <div>
        <Title>Address</Title>
        <Input placeholder="Address Name" />
      </div>

      <ButtonWrapper>
        <ButtonCancel onClick={() => setIsOpen(false)}>Cancel</ButtonCancel>
        <ButtonSave onClick={() => setIsOpen(false)}>Save</ButtonSave>
      </ButtonWrapper>
    </EditUserWrapper>
  );
};

export default EditUser;
