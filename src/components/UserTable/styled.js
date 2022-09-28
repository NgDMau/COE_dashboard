import { Button } from "antd";
import styled from "styled-components";

export const UserTableWrapper = styled.div`
  .table-row-data {
    .ant-table-tbody > tr > td {
      cursor: pointer;

      border-bottom: none;
    }
    .ant-empty-description {
      visibility: hidden;
    }
    .ant-empty-description:after {
      visibility: visible;
      display: block;
      margin-top: -25px;
    }
    .table-striped-rows tr:nth-child(2n) td {
      background: #fbfbfb;
      height: 57px;
    }

    .ant-table-thead > tr > th {
      background: #e8f0f9;
      ::before {
        /* display: none; */
      }
    }
    table tr:nth-child(2n) td {
      background-color: #f3f3f4;
    }
    .action-row {
      display: flex;
      justify-content: flex-end;
      img {
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
  .visible {
    table {
      visibility: hidden;
    }
  }
`;
export const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  img {
    margin-right: 10px;
    cursor: pointer;
  }
`;
export const EditUserWrapper = styled.div`
  margin-top: -20px;
`;
export const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const ButtonCancel = styled(Button)`
  width: 48%;
  height: 40px;
  background-color: #bdc3c7;
`;
export const ButtonSave = styled(Button)`
  width: 48%;
  height: 40px;
  background-color: #bdc3c7;
`;
