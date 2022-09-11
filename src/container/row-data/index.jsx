/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from "react";
import { RowDataWrapper } from "./styled";
import { Table } from "antd";
import { useState } from "react";
import { linkApi } from "../../common/ngok";

const RowData = React.memo(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [isLoading, setIsLoading] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [numEntries, setNumEntries] = useState({});

  const getDataRow = async (page) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const myHeaders = new Headers({
      Authorization: "Token " + user?.token,
      "Content-Type": "application/x-www-form-urlencoded",
    });
    fetch(`${linkApi}/dm/data/raw?page=${page}&size=5`, {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === "successful") {
          setRowData(data?.data?.object_list);
          setNumEntries({
            total: data?.data?.num_entries,
            numPages: data?.data?.num_pages,
          });
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getDataRow(1);
  }, []);

  const arr = useMemo(() => {
    if (!rowData || rowData?.length === 0) {
      return null;
    }
    return (
      Object?.keys(rowData[0])?.map((val, idx) => ({
        title: `${val}`,
        dataIndex: `${val}`,
        key: `${val}`,
      })) || null
    );
  }, [rowData]);

  return (
    <RowDataWrapper>
      <div>
        {arr && (
          <Table
            className="table-row-data"
            columns={arr}
            dataSource={rowData}
            loading={isLoading}
            key={(recod) => recod.hosp_hospname}
            showSizeChanger={false}
            pagination={{
              defaultPageSize: numEntries?.numPages,
              showSizeChanger: true,
              total: numEntries?.total,
              pageSizeOptions: ["5"],
              showTotal: (total, range) => (
                <div className="title-pagination">
                  <div className="position-absolute left-20">
                    {range[0]}-{range[1]} from {total}
                  </div>
                </div>
              ),
              locale: { items_per_page: "" },
              onChange: (pageChange) => {
                getDataRow(pageChange);
              },
            }}
          />
        )}
      </div>
    </RowDataWrapper>
  );
});

export default RowData;
