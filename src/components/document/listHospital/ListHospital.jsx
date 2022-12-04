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
  const token = useSelector((state) => state?.auth?.token);
  const getDataAwarded = async () => {
    const response = await sendGet("/dm/data/hospital?info=awarded");
    if (response?.status === "successful") {
      setHospital(response?.hospitals);
    }
  };

  useEffect(() => {
    getDataAwarded();
  }, []);

  const onUpdate = async (year, name, code) => {
    const myHeaders = new Headers({
      Authorization: "Token " + token,
      "Content-Type": "application/x-www-form-urlencoded",
    });
    fetch(`${linkApi}/dm/data/hospital?code=${code}`, {
      method: "POST",
      headers: myHeaders,
      body: new URLSearchParams({
        last_awarded_year: moment(year).format("YYYY"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setHospital(
          hospital?.map((element) => {
            if (data?.hospital?.code === element.code) {
              return data?.hospital;
            }
            return element;
          })
        );
        message.success(`Updated successfully.`);
      })
      .catch(() => {
        message.warning(`Updated error.`);
      })
      .finally(() => {});
  };

  const onDelete = () => {
    const newList = [...hospital];
    newList.pop();
    setHospital(newList);
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
        <ItemHospital item={element} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ListHospitalWrapper>
  );
};

export default ListHospital;
