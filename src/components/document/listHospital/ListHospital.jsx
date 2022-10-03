import { message, Select, Tooltip } from "antd";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { sendGet, sendPost } from "../../../api/axios";
import { linkApi } from "../../../common/ngok";
import getImagePath from "../../../helpers/image";
import ItemHospital from "./ItemHospital/ItemHospital";
import {
  IconAdd,
  ListHospitalWrapper,
  SelectHospitals,
  SelectWrapper,
  TitleListHospital,
} from "./styled";

const ListHospital = () => {
  const [hospital, setHospital] = useState(null);
  console.log("hospitalhospital", hospital);
  const token = useSelector((state) => state?.auth?.token);
  const getDataAwarded = async () => {
    const response = await sendGet("/dm/data/hospital?code=61");
    console.log("resssponse", response);
    if (response?.status === "successful") {
      setHospital([
        response?.hospital,
        response?.hospital,
        response?.hospital,
        response?.hospital,
        response?.hospital,
        response?.hospital,
        response?.hospital,
      ]);
    }
  };

  useEffect(() => {
    getDataAwarded();
  }, []);

  const onUpdate = async (year, name) => {
    // const response = await sendPost("/dm/data/hospital?code=61", {
    //   last_awarded_year: moment(year).format("YYYY"),
    // });
    // console.log("response", response);
    const myHeaders = new Headers({
      Authorization: "Token " + token,
      "Content-Type": "application/x-www-form-urlencoded",
    });
    fetch(`${linkApi}/dm/data/hospital?code=61`, {
      method: "POST",
      headers: myHeaders,
      body: new URLSearchParams({
        last_awarded_year: moment(year).format("YYYY"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setHospital([
          data?.hospital,
          data?.hospital,
          data?.hospital,
          data?.hospital,
          data?.hospital,
          data?.hospital,
          data?.hospital,
        ]);
        message.success(`Updated successfully.`);
      })
      .finally(() => {});
  };

  return (
    <ListHospitalWrapper>
      <TitleListHospital>Code awarded hospitals</TitleListHospital>
      <SelectWrapper>
        <SelectHospitals
          showSearch
          placeholder="Search for hospital"
          optionFilterProp="children"
          filterOption={(input, option) => option?.children?.includes(input)}
          filterSort={(optionA, optionB) =>
            optionA?.children
              .toLowerCase()
              .localeCompare(optionB?.children?.toLowerCase())
          }
        >
          {hospital?.map((element, index) => (
            <Select.Option value={index}>{element?.name}</Select.Option>
          ))}
        </SelectHospitals>
        <Tooltip placement="right" title="Add awared hospital">
          <IconAdd src={getImagePath("more.png")} alt="" />
        </Tooltip>
      </SelectWrapper>
      {hospital?.map((element) => (
        <ItemHospital item={element} onUpdate={onUpdate} />
      ))}
    </ListHospitalWrapper>
  );
};

export default ListHospital;
