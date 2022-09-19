/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Input, Row } from "antd";

import { useEffect } from "react";
import deleteIcon from "../../../assets/icon/delete.png";
import TextArea from "antd/lib/input/TextArea";
import {
  DraggerFile,
  FormWrapper,
  Title,
  UploadWrapper,
} from "../../FormInputData/styled";
import { ButtonCustom } from "../styled";

const Createfrom = ({ selected, getDataDocument, setSelected }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [docName, setDocName] = useState("");
  const [docNote, setDocNote] = useState("");

  useEffect(() => {
    setDocName("");
    setDocNote("");
    setFileList([]);
  }, []);

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
      .then((result) =>
        getDataDocument((res) => {
          if (res) {
            setSelected(res);
          }
        })
      )
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
      <>
        <Title>Document Name</Title>
        <Input
          placeholder="Document Name"
          className="width-300"
          value={docName}
          onChange={(e) => setDocName(e?.target?.value)}
        />

        <Title>Document Note</Title>
        <TextArea
          placeholder="Document Note"
          className="width-300"
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
            {/* <ButtonCustom
              type="primary"
              onClick={handleUpload}
              loading={uploading}
            >
              {"Cancel"}
            </ButtonCustom> */}
          </Row>
        </UploadWrapper>
      </>
    </FormWrapper>
  );
};

export default Createfrom;
