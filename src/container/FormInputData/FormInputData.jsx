import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  message,
} from "antd";
import {
  ButtonSave,
  ButtonUpdate,
  DraggerFile,
  FormWrapper,
  Title,
} from "./styled";
import Dragger from "antd/lib/upload/Dragger";
import { linkApi } from "../../common/ngok";
import { useEffect } from "react";
import moment from "moment";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const FormInputData = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [updating, setUpdating] = useState(false);
  const [hospital, setHospital] = useState(null);
  const [yearPicker, setyearPicker] = useState("");
  console.log(moment(yearPicker).format("YYYY"));
  const props = {
    name: "file",
    multiple: true,
    onUploadSuccess(info) {
      console.log("infoinfoinfo", info);
    },
    onChange(info) {
      const { status } = info.file;

      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (status === "done") {
        // message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        // message.error(`${info.file.name} file upload failed.`);
        console.log(111);
      }
    },

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const getDataAwarded = async () => {
    const myHeaders = new Headers({
      Authorization: "Token " + user?.token,
      "Content-Type": "application/x-www-form-urlencoded",
    });
    fetch(`${linkApi}/dm/data/hospital?code=21`, {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        setHospital(data?.hospital);
      })
      .finally(() => {});
  };

  const postData = async () => {
    const myHeaders = new Headers({
      Authorization: "Token " + user?.token,
      "Content-Type": "application/x-www-form-urlencoded",
    });
    fetch(`${linkApi}/dm/data/hospital?code=21`, {
      method: "POST",
      headers: myHeaders,
      body: new URLSearchParams({
        last_awarded_year: moment(yearPicker).format("YYYY"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setHospital(data?.hospital);
        message.success(`Updated successfully.`);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getDataAwarded();
  }, []);
  return (
    <FormWrapper>
      <div className="Awarded ">
        Last Awarded Year:
        <span className="green"> {hospital?.last_awarded_year || ""}</span>
        <ButtonUpdate onClick={() => setUpdating(!updating)}>
          Update
        </ButtonUpdate>
      </div>
      <div className="Awarded ">
        Re-evaluation Year:
        <span className="blue"> {hospital?.next_recheck_year || ""}</span>
      </div>
      {updating && (
        <>
          <Title>Last Awarded Year</Title>
          <DatePicker picker="year" onChange={(e) => setyearPicker(e)} />
          <Title>Upload Certification (if available)</Title>
          <DraggerFile height={130} style={{ width: 300 }} {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </DraggerFile>
          <ButtonSave onClick={() => postData()}>Save</ButtonSave>
        </>
      )}
    </FormWrapper>
  );
};

export default FormInputData;
