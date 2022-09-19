/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, message, Upload } from "antd";
import {
  ButtonSave,
  ButtonUpdate,
  DraggerFile,
  FormWrapper,
  Title,
} from "./styled";
import { linkApi } from "../../common/ngok";
import { useEffect } from "react";
import moment from "moment";

const FormInputData = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("useruseruser", user);
  const [updating, setUpdating] = useState(false);
  const [hospital, setHospital] = useState(null);
  const [yearPicker, setyearPicker] = useState("");

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

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const handleUpload = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token c2692a2ab2eaf4d285a78d9cd3d67e108aeb2280"
    );
    myHeaders.append(
      "Cookie",
      "csrftoken=iBZFVxTK55EuqJtf8E8fQsPM7FPB9T9fvcwZd0p84fHQooETm1i99ycSF1NITwZn"
    );

    var formdata = new FormData();
    formdata.append("docfile", fileList[0]);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://fe5e-103-168-58-73.ap.ngrok.io/dm/data/upload",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <FormWrapper>
      <div className="Awarded ">
        Last Awarded Year:
        <span className="green">
          {" "}
          {updating ? (
            <DatePicker
              picker="year"
              defaultValue={moment("1-1-2020")}
              onChange={(e) => setyearPicker(e)}
            />
          ) : (
            hospital?.last_awarded_year || ""
          )}
        </span>
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
          {/* <Title>Last Awarded Year</Title> */}

          <Title>Document Name</Title>
          <Input placeholder="Document Name" />

          <Title>Upload Certification (if available)</Title>
          <DraggerFile
            height={130}
            style={{ width: 300 }}
            maxCount={2}
            disabled={fileList.length === 1}
            {...props}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </DraggerFile>
          <>
            <Button
              type="primary"
              onClick={handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
              style={{ marginTop: 16 }}
            >
              {uploading ? "Uploading" : "Start Upload"}
            </Button>
          </>
        </>
      )}
    </FormWrapper>
  );
};

export default FormInputData;
