import { Button, Table } from "antd";
import React from "react";
import { ContentWrapper } from "./styled";
import dataTable from "./fakeData";
const ContentComponent = () => {
  const columns = [
    {
      title: "Tỉnh/Thành phố",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Bệnh viện",
      dataIndex: "hostpital",
      key: "hostpital",
    },
    {
      title: "Sinh thường/mổ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Q1/2021",
      key: "quarter_1",
      dataIndex: "quarter_1",
    },
    {
      title: "Q2/2021",
      key: "quarter_1",
      dataIndex: "quarter_1",
    },
    {
      title: "Q3/2021",
      key: "quarter_1",
      dataIndex: "quarter_1",
    },
    {
      title: "Q4/2021",
      key: "quarter_1",
      dataIndex: "quarter_1",
    },
    {
      title: "Q1/2022",
      key: "quarter_1",
      dataIndex: "quarter_1",
    },
    {
      title: "Q2/2022",
      key: "quarter_1",
      dataIndex: "quarter_1",
    },
    {
      title: "Q3/2022",
      key: "quarter_1",
      dataIndex: "quarter_1",
    },
    {
      title: "Q4/2022",
      key: "quarter_1",
      dataIndex: "quarter_1",
    },
  ];

  return (
    <ContentWrapper>
      <div className="header">
        <span>
          Chỉ Số: 8c. Bệnh viện này có bán , Hoặc nhân viên bệnh viện giới thiệu
          hoặc bán sữa bột/ sữa công ty
        </span>
        <div>
          <Button>Tổng hợp kết quả Quý</Button>
          <Button>XLS</Button>
        </div>
      </div>

      <div>
        <Table
          columns={columns}
          dataSource={dataTable}
          key={(recod) => recod.id}
        />
      </div>
    </ContentWrapper>
  );
};

export default ContentComponent;
