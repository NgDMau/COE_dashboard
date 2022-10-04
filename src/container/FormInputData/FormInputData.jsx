/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, message, Row, Upload } from "antd";
import {
  ButtonSave,
  ButtonUpdate,
  DraggerFile,
  FormWrapper,
  Title,
  TitleUpdateDoc,
  UploadWrapper,
} from "./styled";
import { linkApi } from "../../common/ngok";
import { useEffect } from "react";
import moment from "moment";
import editIcon from "../../assets/icon/edit-text.png";
import deleteIcon from "../../assets/icon/delete.png";
import TextArea from "antd/lib/input/TextArea";
import { ButtonCustom } from "../document/styled";

const FormInputData = ({ selected }) => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  console.log("useruseruser", user);
  const [updating, setUpdating] = useState(false);
  const [hospital, setHospital] = useState(null);
  const [yearPicker, setyearPicker] = useState("");

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [docName, setDocName] = useState("");
  const [docNote, setDocNote] = useState("");

  const getDataAwarded = async () => {
    const myHeaders = new Headers({
      Authorization: "Token " + user?.token,
      "Content-Type": "application/x-www-form-urlencoded",
    });
    fetch(`${linkApi}/dm/data/hospital?code=61`, {
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
    fetch(`${linkApi}/dm/data/hospital?code=61`, {
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
      .finally(() => {
        setUpdating(false);
      });
  };

  useEffect(() => {
    getDataAwarded();
  }, []);

  useEffect(() => {
    setDocName(selected?.name);
    setDocNote(selected?.note);
    setFileList([
      {
        name: selected?.url,
      },
    ]);
  }, [selected]);

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
    formdata.append("docname", docName);
    formdata.append("docnote", docNote);

    var requestOptions = {
      method: "UPDATE",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://coe.unopixel.io/dm/data/upload", requestOptions)
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
      setFileList([file]);
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
              defaultValue={moment(hospital?.last_awarded_year)}
              onChange={(e) => setyearPicker(e)}
            />
          ) : (
            hospital?.last_awarded_year || ""
          )}
        </span>
        <ButtonUpdate>
          {!updating ? (
            <img src={editIcon} alt="" onClick={() => setUpdating(!updating)} />
          ) : (
            <span onClick={postData}>Update</span>
          )}
        </ButtonUpdate>
      </div>
      <div className="Awarded ">
        Re-evaluation Year:
        <span className="blue"> {hospital?.next_recheck_year || ""}</span>
      </div>
      {selected && (
        <>
          <TitleUpdateDoc>Update Document</TitleUpdateDoc>

          <Title>Document Name</Title>
          <Input
            placeholder="Document Name"
            value={docName}
            onChange={(e) => setDocName(e?.target?.value)}
          />

          <Title>Document Note</Title>
          <TextArea
            placeholder="Document Note"
            value={docNote}
            onChange={(e) => setDocNote(e?.target?.value)}
          />

          <Title>Upload Certification (if available)</Title>
          <DraggerFile
            height={130}
            style={{ width: 300 }}
            maxCount={2}
            value={fileList}
            {...props}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </DraggerFile>

          <UploadWrapper>
            <Row>
              <ButtonCustom
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0 || !docName || !docNote}
                loading={uploading}
              >
                {uploading ? "Uploading" : "Save"}
              </ButtonCustom>
              <ButtonCustom
                type="primary"
                onClick={handleUpload}
                loading={uploading}
              >
                {"Cancel"}
              </ButtonCustom>
            </Row>
            <img src={deleteIcon} alt="" />
          </UploadWrapper>
        </>
      )}
    </FormWrapper>
  );
};

export default FormInputData;
