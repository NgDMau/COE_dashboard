import { Table } from "antd";
import React from "react";
import { dataSource } from "./FakeDataUsers";
import editTable from "../../assets/icon/edit.svg";
import trashTable from "../../assets/icon/trash.svg";
import { IconWrapper, UserTableWrapper } from "./styled";
import ModalNormal from "../common/modal";
import { useState } from "react";
import EditUser from "./EditUser/EditUser";
import { showConfirm } from "../../helpers/modal-confirm";

const UserTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const columns = [
    {
      title: "User",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Manager",
      dataIndex: "manager",
      key: "manager",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Hospital",
      dataIndex: "hospital",
      key: "hospital",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "",
      key: "action",
      width: "10%",
      render: (record) => (
        <IconWrapper
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <img src={editTable} alt="" onClick={() => setIsOpen(true)} />
          <img
            src={trashTable}
            alt=""
            onClick={() => {
              showConfirm({
                title: "Are you sure you want to delete this user?",
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
        dataSource={dataSource}
        key={(recod) => recod.hosp_hospname}
        showSizeChanger={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              console.log(record);
            }, // click row
          };
        }}
        pagination={false}
      />
      <ModalNormal
        visible={isOpen}
        setVisible={setIsOpen}
        width={500}
        title="Edit user"
      >
        <EditUser setIsOpen={setIsOpen} />
      </ModalNormal>
    </UserTableWrapper>
  );
};

export default UserTable;
