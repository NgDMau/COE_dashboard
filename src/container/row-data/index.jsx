import React from "react";
import { RowDataWrapper } from "./styled";
import { Table } from "antd";
import dataTable from "../../dashboard/content/fakeData";
import { rowData } from "./fakeData";
import { useSelector } from "react-redux";
const RowData = () => {
  const listRowData = useSelector((state) => state.data.listRowData);

  const arr = Object.keys(listRowData[0]).map((val, idx) => ({
    title: `${val}`,
    dataIndex: `${val}`,
    key: `${val}`,
  }));

  return (
    <RowDataWrapper>
      <div>
        <Table
          className="table-row-data"
          columns={arr}
          dataSource={listRowData}
          key={(recod) => recod.id}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20"],
            showTotal: (total, range) => (
              <div className="title-pagination">
                <div className="position-absolute left-20">
                  {range[0]}-{range[1]} from {total}
                </div>
              </div>
            ),
            locale: { items_per_page: "" },
          }}
        />
      </div>
    </RowDataWrapper>
  );
};

export default RowData;
