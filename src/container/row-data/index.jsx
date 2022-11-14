/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from "react";
import { RowDataWrapper } from "./styled";
import { Spin, Table } from "antd";
import { useState } from "react";
import { linkApi } from "../../common/ngok";
import { useSelector } from "react-redux";
import { Excel } from "antd-table-saveas-excel";
import { ButtonDownLoadWrapper } from "../document/styled";
import { useTranslation } from "react-i18next";
import { sendPost } from "../../api/axios";

const RowData = React.memo(() => {
  const { t } = useTranslation();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const citiesData = useSelector((state) => state.data.citiesData);
  const citySelected = useSelector((state) => state.data.citySelected);
  const currentQuarter = useSelector((state) => state?.data?.currentQuarter);
  const dashboardData = useSelector((state) => state?.data?.dashboardData);

  const [isLoading, setIsLoading] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [numEntries, setNumEntries] = useState({});

  const time = useMemo(() => {
    const timeString = dashboardData[currentQuarter]?.time.split("/");
    return {
      quarter: timeString[0][1],
      year: timeString[1],
    };
  }, [currentQuarter, dashboardData]);
  console.log("timeeee", time);
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
          console.log("data?.datadata?.data", data?.data);
          setRowData(data?.data?.object_list);
          setNumEntries({
            total: data?.data?.num_entries,
            numPages: data?.data?.num_pages,
            page_number: data?.data?.page_number,
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

  const columns = [
    {
      title: "Tỉnh",
      dataIndex: "hosp_province",
      key: "hosp_province",
      render: (record) => {
        return (
          <div>
            {citiesData?.find((element) => element.code === record)?.name || ""}
          </div>
        );
      },
    },
    {
      title: "Đơn vị thực hiện khảo sát",
      dataIndex: "hosp_operator",
      key: "hosp_operator",
    },
    {
      title: "Tiêu chí khảo sát",
      dataIndex: "hosp_criteria_name",
      key: "hosp_criteria_name",
    },
    {
      title: "Tên bệnh viện được khảo sát",
      dataIndex: "hosp_hospname",
      key: "hosp_hospname",
    },
    {
      title: "Đơn vị thực hiện khảo sát",
      dataIndex: "hosp_byt_syt",
      key: "hosp_byt_syt",
    },
    {
      title: "Tên của bà mẹ",
      dataIndex: "minf_moname",
      key: "minf_moname",
    },
    {
      title: "Số điện thoại",
      dataIndex: "minf_phone",
      key: "minf_phone",
    },
    {
      title: "q00",
      dataIndex: "q00",
      key: "q00",
    },
    {
      title: "Quý",
      dataIndex: "qrt",
      key: "qrt",
    },
    {
      title: "Năm sinh của trẻ",
      dataIndex: "byear",
      key: "byear",
    },
    {
      title: "Tháng sinh của trẻ",
      dataIndex: "bmon",
      key: "bmon",
    },
    {
      title: "q01",
      dataIndex: "q_current_bf_q01",
      key: "q_current_bf_q01",
    },
    {
      title: "q01a",
      dataIndex: "q_current_bf_q01a",
      key: "q_current_bf_q01a",
    },
    {
      title: "q01b",
      dataIndex: "q_current_bf_q01b",
      key: "q_current_bf_q01b",
    },
    {
      title: "q02",
      dataIndex: "q_cbf_q02",
      key: "q_cbf_q02",
    },
    {
      title: "q02a",
      dataIndex: "q_cbf_q02a",
      key: "q_cbf_q02a",
    },
    {
      title: "q02b",
      dataIndex: "q_cbf_q02b",
      key: "q_cbf_q02b",
    },
    {
      title: "q03",
      dataIndex: "q_cbf_q03",
      key: "q_cbf_q03",
    },
    {
      title: "q03/1",
      dataIndex: "q_cbf_q03_1",
      key: "q_cbf_q03_1",
    },
    {
      title: "q03a",
      dataIndex: "q_cbf_q03a",
      key: "q_cbf_q03a",
    },
    // {
    //   title: "q04",
    //   key: "action",
    // },
    // {
    //   title: "q05a",
    //   key: "action",
    // },
    // {
    //   title: "q05b",
    //   key: "action",
    // },
    // {
    //   title: "q06",
    //   key: "action",
    // },
    // {
    //   title: "q07",
    //   key: "action",
    // },
    // {
    //   title: "q07a",
    //   key: "action",
    // },
    // {
    //   title: "q07a/1",
    //   key: "action",
    // },
    // {
    //   title: "q07a/2",
    //   key: "action",
    // },
    // {
    //   title: "q07a/9",
    //   key: "action",
    // },
    // {
    //   title: "q07b",
    //   key: "action",
    // },
    // {
    //   title: "q03_1",
    //   key: "action",
    // },
    // {
    //   title: "q04_1",
    //   key: "action",
    // },
    // {
    //   title: "q04_1a",
    //   key: "action",
    // },
    // {
    //   title: "q04_1b",
    //   key: "action",
    // },
    // {
    //   title: "q05_1",
    //   key: "action",
    // },
    // {
    //   title: "q06_1",
    //   key: "action",
    // },
    // {
    //   title: "q06_1a",
    //   key: "action",
    // },
    // {
    //   title: "q06_1a/1",
    //   key: "action",
    // },
    // {
    //   title: "q06_1a/2",
    //   key: "action",
    // },
    // {
    //   title: "q06_1a/9",
    //   key: "action",
    // },
    // {
    //   title: "q06_1c",
    //   key: "action",
    // },
    // {
    //   title: "q06_1b",
    //   key: "action",
    // },
    // {
    //   title: "q06_1b/1",
    //   key: "action",
    // },
    // {
    //   title: "q06_1b/2",
    //   key: "action",
    // },
    // {
    //   title: "q06_1b/3",
    //   key: "action",
    // },
    // {
    //   title: "q07_1",
    //   key: "action",
    // },
    // {
    //   title: "q07_1/1",
    //   key: "action",
    // },
    // {
    //   title: "q07_1/2",
    //   key: "action",
    // },
    // {
    //   title: "q07_1/3",
    //   key: "action",
    // },
    // {
    //   title: "q07_1/4",
    //   key: "action",
    // },
    // {
    //   title: "q07_1/5",
    //   key: "action",
    // },
    // {
    //   title: "q07_1/6",
    //   key: "action",
    // },
    // {
    //   title: "q07_1a",
    //   key: "action",
    // },
    // {
    //   title: "q08",
    //   key: "action",
    // },
    // {
    //   title: "q09",
    //   key: "action",
    // },
    // {
    //   title: "q09a",
    //   key: "action",
    // },
    // {
    //   title: "q09a/1",
    //   key: "action",
    // },
    // {
    //   title: "q09a/2",
    //   key: "action",
    // },
    // {
    //   title: "q09a/3",
    //   key: "action",
    // },
    // {
    //   title: "q09a/4",
    //   key: "action",
    // },
    // {
    //   title: "q09a/5",
    //   key: "action",
    // },
    // {
    //   title: "q09a/7",
    //   key: "action",
    // },
    // {
    //   title: "q09a/8",
    //   key: "action",
    // },
    // {
    //   title: "q09a/9",
    //   key: "action",
    // },
    // {
    //   title: "q09_1a",
    //   key: "action",
    // },
    // {
    //   title: "q09_1a/1",
    //   key: "action",
    // },
    // {
    //   title: "q09_1a/2",
    //   key: "action",
    // },
    // {
    //   title: "q09_1a/3",
    //   key: "action",
    // },
    // {
    //   title: "q09_1a/4",
    //   key: "action",
    // },
    // {
    //   title: "q09_1a/7",
    //   key: "action",
    // },
    // {
    //   title: "q09_1a/8",
    //   key: "action",
    // },
    // {
    //   title: "q09_1a/9",
    //   key: "action",
    // },
    // {
    //   title: "q09b",
    //   key: "action",
    // },
    // {
    //   title: "q10",
    //   key: "action",
    // },
    // {
    //   title: "q10/1",
    //   key: "action",
    // },
    // {
    //   title: "q10/2",
    //   key: "action",
    // },
    // {
    //   title: "q10/3",
    //   key: "action",
    // },
    // {
    //   title: "q10/4",
    //   key: "action",
    // },
    // {
    //   title: "q10/5",
    //   key: "action",
    // },
    // {
    //   title: "q10/6",
    //   key: "action",
    // },
    // {
    //   title: "q10/9",
    //   key: "action",
    // },
    // {
    //   title: "q10/0",
    //   key: "action",
    // },
    // {
    //   title: "q10a",
    //   key: "action",
    // },
    // {
    //   title: "q11",
    //   key: "action",
    // },
    // {
    //   title: "q11a",
    //   key: "action",
    // },
    // {
    //   title: "q12",
    //   key: "action",
    // },
    // {
    //   title: "q12a",
    //   key: "action",
    // },
    // {
    //   title: "q13a",
    //   key: "action",
    // },
  ];
  const handleClick = async () => {
    try {
      const response = await sendPost(
        "/dm/data/raw/export_province_quarter_report",
        {
          year: Number(time.year),
          quarter: Number(time.quarter),
          province: citySelected?.code,
        }
      );
      console.log("responseresponse");
      if (response?.status === "OK") {
        window.open(`${linkApi}/${response?.data?.url}`);
      }
    } catch (error) {}
  };
  return (
    <RowDataWrapper>
      <div>
        <ButtonDownLoadWrapper onClick={handleClick} disabled={false}>
          <span>{t("document.download")}</span>
        </ButtonDownLoadWrapper>
        {arr ? (
          <Table
            className="table-row-data"
            columns={columns}
            dataSource={rowData}
            loading={isLoading}
            key={(recod) => recod.hosp_hospname}
            showSizeChanger={false}
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              total: numEntries?.total,
              current: numEntries?.page_number,
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
        ) : (
          <Spin size="large" />
        )}
      </div>
    </RowDataWrapper>
  );
});

export default RowData;
