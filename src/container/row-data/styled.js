import styled from "styled-components";
import background from "../../assets/brand/bg-app.jpg";

export const RowDataWrapper = styled.div`
  background-image: url(${background});
  background-size: cover;
  width: 96%;
  height: 85%;
  overflow: auto;
  padding: 20px;
  margin: 20px;
  font-size: 20px;
  .table-row-data {
    .ant-pagination-options {
      display: none;
    }
    margin-right: 20px;
    .ant-table-pagination.ant-pagination {
      width: 100%;
      display: flex;
      justify-content: start;
    }
    .ant-table-row {
      background-color: white;
    }
    .ant-table-thead > tr > th {
      background: #e8f0f9;
    }
    thead > tr > th {
      border-bottom: 0.5px solid #dfe4ea;
    }
    .ant-table-thead {
      border: 0.5px solid #dfe4ea !important;
    }
    table thead {
      background-color: #dff9fb;
      border-bottom: 0.5px solid #dfe4ea;
    }
    table tr td {
      border-right: 0.5px solid #dfe4ea;
      border-bottom: 0.5px solid #dfe4ea;
    }
    table tr td:nth-child(1) {
      border-left: 0.5px solid #dfe4ea;
    }
  }
  .visible {
    table {
      visibility: hidden;
    }
  }
`;
