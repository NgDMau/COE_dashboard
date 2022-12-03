import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { sendDelete, sendGet, sendPatch, sendPost } from "../api/axios";
import { showConfirm } from "../helpers/modal-confirm";

export const useUserAdmin = () => {
  const [userList, setUser] = useState([]);

  const getListUser = async () => {
    try {
      const response = await sendGet("/user/read");
      if (response?.status === "successfully") {
        setUser(response?.data);
      }
    } catch (error) {}
  };

  const createUser = async ({
    password,
    username,
    email,
    role,
    province_code,
    callback,
  }) => {
    try {
      const response = await sendPost("/user/create", {
        username,
        email,
        password,
        role,
        province_code: province_code || "none",
      });
      if (response?.status === "successful") {
        getListUser();
        showConfirm({
          title: "Thêm mới thành công!",
          hideCancel: true,
        });
        callback();
      } else {
        showConfirm({
          title: "Thêm mới không thành công!",
          hideCancel: true,
        });
      }
    } catch (error) {
      showConfirm({
        title: "Thêm mới không thành công!",
        hideCancel: true,
      });
    }
  };

  const updateUser = async ({
    username,
    email,
    password,
    user_id,
    callback,
  }) => {
    try {
      const response = await sendPatch("/user/update", {
        username,
        email,
        password,
        user_id,
      });
      if (response?.status === "successfully") {
        setUser(
          userList?.map((element) => {
            if (element?.id === user_id) {
              return {
                ...element,
                username,
                email,
                password,
                id: user_id,
              };
            }
            return element;
          })
        );
        callback();
        showConfirm({
          title: "Chỉnh sửa thành công !",
          hideCancel: true,
        });
      }
    } catch (error) {}
  };
  const deleteUser = async ({ user_id }) => {
    try {
      const response = await sendDelete("/user/delete", {
        user_id,
      });
      if (response?.status === "successful") {
        getListUser();
        showConfirm({
          title: "Xóa người dùng thành công !",
          hideCancel: true,
        });
      } else {
        showConfirm({
          title: "Xóa người dùng không thành công !",
          hideCancel: true,
        });
      }
    } catch (error) {}
  };
  useEffect(() => {
    getListUser();
  }, []);

  return {
    userList,
    setUser,
    createUser,
    updateUser,
    deleteUser,
  };
};
