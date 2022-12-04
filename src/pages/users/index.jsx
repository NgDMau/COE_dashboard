import React from "react";
import { useTranslation } from "react-i18next";
import UserTable from "../../components/UserTable/UserTable";
import { LeftContainer, TitleManagerUser, UserManagerWrapper } from "./styled";

const UserManager = () => {
  const { t } = useTranslation();
  return (
    <UserManagerWrapper>
      <LeftContainer>
        <TitleManagerUser>
          {t("userManagement.userAdministration")}
        </TitleManagerUser>
        <UserTable />
      </LeftContainer>
    </UserManagerWrapper>
  );
};

export default UserManager;
