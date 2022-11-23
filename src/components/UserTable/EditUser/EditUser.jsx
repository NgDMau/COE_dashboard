import { Input, Radio } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { Title } from "../../../container/FormInputData/styled";
import { showConfirm } from "../../../helpers/modal-confirm";
import {
  ButtonCancel,
  ButtonSave,
  ButtonWrapper,
  EditUserWrapper,
} from "../styled";

const EditUser = ({ modalData, setIsOpen, createUser, updateUser }) => {
  const [isSupperUser, setIsSupperUser] = useState(false);
  const [useName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (modalData && modalData !== false && modalData?.isEdit) {
      setIsSupperUser(modalData?.is_superuser || false);
      setUserName(modalData?.username || "");
      setEmail(modalData?.email || "");
      setPassword("");
    } else {
      setIsSupperUser(false);
      setUserName("");
      setEmail("");
      setPassword("");
    }
  }, [modalData]);

  return (
    <EditUserWrapper>
      <div>
        <Title>Quyền tài khoản</Title>
        <Radio
          checked={isSupperUser}
          disabled={modalData?.isEdit}
          onChange={(e) => setIsSupperUser(e?.target?.checked)}
        >
          superuser
        </Radio>
        <Radio
          checked={!isSupperUser}
          disabled={modalData?.isEdit}
          onChange={(e) => setIsSupperUser(!e?.target?.checked)}
        >
          staff
        </Radio>
      </div>
      <div>
        <Title>Tên tài khoản</Title>
        <Input
          placeholder="Tên tài khoản"
          value={useName}
          disabled={modalData?.isEdit}
          onChange={(e) => setUserName(e?.target?.value)}
        />
      </div>
      <div>
        <Title>Email</Title>
        <Input
          placeholder="Email"
          value={email}
          disabled={modalData?.isEdit}
          onChange={(e) => setEmail(e?.target?.value)}
        />
      </div>

      <div>
        <Title>Mật khẩu</Title>
        <Input
          placeholder="Mật khẩu"
          value={password}
          // type="password"
          onChange={(e) => setPassword(e?.target?.value)}
        />
      </div>

      <ButtonWrapper>
        <ButtonCancel onClick={() => setIsOpen(false)}>Cancel</ButtonCancel>
        <ButtonSave
          onClick={() => {
            if (modalData?.isEdit) {
              if (!password) {
                showConfirm({
                  title: "Vui lòng nhập mật khẩu mới !",
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
              createUser({
                password: password,
                username: useName,
                email: email,
                role: isSupperUser ? "admin" : null,
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
          Save
        </ButtonSave>
      </ButtonWrapper>
    </EditUserWrapper>
  );
};

export default EditUser;
