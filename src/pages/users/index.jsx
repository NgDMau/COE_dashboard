import React from "react";
import UserTable from "../../components/UserTable/UserTable";
import { LeftContainer, TitleManagerUser, UserManagerWrapper } from "./styled";

const UserManager = () => {
  return (
    <UserManagerWrapper>
      <LeftContainer>
        <TitleManagerUser>Quản trị người dùng</TitleManagerUser>
        <UserTable />
      </LeftContainer>
    </UserManagerWrapper>
  );
};

export default UserManager;
