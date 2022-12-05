import { message, Select, Tooltip } from "antd";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
        message.success(t('document.updateSuccess'));
      })
      .catch(() => {
        message.warning(t('document.updateError'));
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
      <TitleListHospital>{t("document.awardedHospitals")}</TitleListHospital>
      <SelectWrapper>
        <SelectHospitals
          showSearch
          placeholder={t("document.searchHostpital")}
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
        <Tooltip placement="right" title={t("document.addHospital")}>
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
