import { Table } from "antd";
import React from "react";
import editTable from "../../assets/icon/edit.svg";
import trashTable from "../../assets/icon/trash.svg";
import { BtnAddUser, IconWrapper, UserTableWrapper } from "./styled";
import ModalNormal from "../common/modal";
import { useState } from "react";
import EditUser from "./EditUser/EditUser";
import { showConfirm } from "../../helpers/modal-confirm";
import { useUserAdmin } from "../../hooks/useUserAdmin";
import moment from "moment";

const UserTable = () => {
  const [modalData, setModalData] = useState(false);
  const closeModal = (open) => {
    setModalData(open);
  };
  const { userList, createUser, updateUser, deleteUser } = useUserAdmin();

  const columns = [
    {
      title: "STT",
      dataIndex: "",
      key: "stt",
      width: "5%",
      render: (_, _item, index) => <div>{index + 1}</div>,
    },
    {
      title: "Người dùng",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Địa chỉ mail",
      dataIndex: "province_name",
      key: "province_name",
    },
    {
      title: "Tỉnh/Thành phố",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Quyền",
      dataIndex: "is_superuser",
      key: "is_superuser",
      render: (record) => <div>{record ? "Admin" : "Người dùng"}</div>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "date_joined",
      key: "date_joined",
      render: (record) => <div>{moment(record).format("DD/MM/YYYY")}</div>,
    },
    {
      title: () => {
        return (
          <BtnAddUser onClick={() => setModalData(true)}>
            Thêm người dùng
          </BtnAddUser>
        );
      },
      key: "action",
      width: "10%",
      render: (record, item) => (
        <IconWrapper
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <img
            src={editTable}
            alt=""
            onClick={() =>
              setModalData({
                ...item,
                isEdit: true,
              })
            }
          />
          <img
            src={trashTable}
            alt=""
            onClick={() => {
              showConfirm({
                title: "Bạn có chắc muốn xóa người dùng?",
                onOk: () => {
                  deleteUser({ user_id: String(item?.id) });
                },
              });
            }}
          />
        </IconWrapper>
      ),
    },
  ];

  return (
    <UserTableWrapper>
      <Table
        className="table-row-data"
        columns={columns}
        dataSource={userList}
        key={(recod) => recod.id}
        showSizeChanger={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              // console.log(record);
            }, // click row
          };
        }}
        pagination={false}
      />
      <ModalNormal
        visible={!!modalData}
        setVisible={closeModal}
        width={500}
        title={modalData?.isEdit ? "Chỉnh sửa người dùng" : "Tạo tài khoản"}
        onCancel={() => {
          setModalData(false);
        }}
        beforelose={() => {
          setModalData(false);
        }}
      >
        <EditUser
          modalData={modalData}
          setIsOpen={closeModal}
          createUser={createUser}
          updateUser={updateUser}
        />
      </ModalNormal>
    </UserTableWrapper>
  );
};

export default UserTable;
