import React from "react";
import { RowDataWrapper } from "./styled";
import { Table } from "antd";
import dataTable from "../../dashboard/content/fakeData";
import { rowData } from "./fakeData";

const RowData = () => {
  const data = rowData;

  const arr = Object.keys(data[0]).map((val, idx) => ({
    title: `${val}`,
    dataIndex: `${val}`,
    key: `${val}`,
  }));

  console.log("arrr", arr);
  const columns = [
    {
      title: "Hospital",
      dataIndex: "quarter_1",
      key: "quarter_1",
    },
  ];
  return (
    <RowDataWrapper>
      <div>
        <Table
          className="table-row-data"
          columns={arr}
          dataSource={data}
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
