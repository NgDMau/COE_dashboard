import { Input, Radio, Select } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Title } from "../../../container/FormInputData/styled";
import { showConfirm } from "../../../helpers/modal-confirm";
import {
  ButtonCancel,
  ButtonSave,
  ButtonWrapper,
  EditUserWrapper,
  SelectedCity,
} from "../styled";

const EditUser = ({ modalData, setIsOpen, createUser, updateUser }) => {
  const { t } = useTranslation();
  const citiesData = useSelector((state) => state.data.citiesData);
  const [isSupperUser, setIsSupperUser] = useState(false);
  const [useName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  console.log("citycitycitycity", modalData);

  useEffect(() => {
    if (modalData && modalData !== false && modalData?.isEdit) {
      setIsSupperUser(modalData?.is_superuser || false);
      setUserName(modalData?.username || "");
      setEmail(modalData?.email || "");
      setPassword("");
      const find = citiesData?.find(
        (element) => element?.code === Number(modalData?.province_code)
      );
      if (find) {
        console.log("findddd", find);
        setCity(find);
      } else {
        setCity("");
      }
    } else {
      setIsSupperUser(false);
      setUserName("");
      setEmail("");
      setPassword("");
      setCity("");
    }
  }, [modalData, citiesData]);

  return (
    <EditUserWrapper>
      <div>
        <Title>{t("userManagement.permission")}</Title>
        <Radio
          checked={isSupperUser}
          disabled={modalData?.isEdit}
          onChange={(e) => setIsSupperUser(e?.target?.checked)}
        >
          {t("userManagement.superuser")}
        </Radio>
        <Radio
          checked={!isSupperUser}
          disabled={modalData?.isEdit}
          onChange={(e) => setIsSupperUser(!e?.target?.checked)}
        >
          {t("userManagement.staff")}
        </Radio>
      </div>
      <div>
        <Title>{t("userManagement.city")}</Title>
        <SelectedCity
          defaultValue={city?.name || t("common.none")}
          value={city?.name || t("common.none")}
          onChange={(e) => {
            setCity(citiesData[e]);
          }}
          disabled={modalData?.isEdit}
        >
          {citiesData?.map((element, index) => {
            return (
              <Select.Option key={String(index)}>
                {index + 1}. {element?.name}
              </Select.Option>
            );
          })}
        </SelectedCity>
      </div>
      <div>
        <Title>{t("userManagement.userName")}</Title>
        <Input
          placeholder={t("userManagement.userName")}
          value={useName}
          disabled={modalData?.isEdit}
          onChange={(e) => setUserName(e?.target?.value)}
        />
      </div>
      <div>
        <Title>{t("userManagement.email")}</Title>
        <Input
          placeholder={t("userManagement.email")}
          value={email}
          disabled={modalData?.isEdit}
          onChange={(e) => setEmail(e?.target?.value)}
        />
      </div>

      <div>
        <Title>{t("userManagement.password")}</Title>
        <Input
          placeholder={t("userManagement.password")}
          value={password}
          // type="password"
          onChange={(e) => setPassword(e?.target?.value)}
        />
      </div>

      <ButtonWrapper>
        <ButtonCancel onClick={() => setIsOpen(false)}>
          {t("userManagement.cancel")}
        </ButtonCancel>
        <ButtonSave
          onClick={() => {
            if (modalData?.isEdit) {
              if (!password) {
                showConfirm({
                  title: t("userManagement.inputNewPassword"),
                  hideCancel: true,
                });
                return;
              }
              updateUser({
                password: password,
                username: useName,
                email: email,
                user_id: modalData?.id,
                callback: () => {
                  setIsOpen(false);
                },
              });
            } else {
              if (
                !password ||
                !useName ||
                !email ||
                city.code === -1 ||
                !city
              ) {
                showConfirm({
                  title: t("userManagement.fullInformation"),
                  hideCancel: true,
                });
                return;
              }
              createUser({
                password: password,
                username: useName,
                email: email,
                role: isSupperUser ? "admin" : null,
                province_code: city?.code,
                callback: () => {
                  setIsSupperUser(false);
                  setUserName("");
                  setEmail("");
                  setPassword("");
                  setIsOpen(false);
                },
              });
            }
          }}
        >
          {t("userManagement.save")}
        </ButtonSave>
      </ButtonWrapper>
    </EditUserWrapper>
  );
};

export default EditUser;
