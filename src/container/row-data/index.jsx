import React from "react";
import { RowDataWrapper } from "./styled";
import { Table } from "antd";
import dataTable from "../../dashboard/content/fakeData";

const RowData = () => {
  const arr = Array.from(Array(50).keys()).map((val, idx) => ({
    title: `Q${idx}`,
    dataIndex: `quarter_${idx}`,
    key: `quarter_${idx}`,
  }));
  const columns = [
    {
      title: "Hospital",
      dataIndex: "quarter_1",
      key: "quarter_1",
    },
  ];
  return (
    <RowDataWrapper>
      {" "}
      <div>
        <Table
          className="table-row-data"
          columns={columns.concat(arr)}
          dataSource={dataTable}
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
