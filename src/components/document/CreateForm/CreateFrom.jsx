/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Input, message, Row } from "antd";

import { useEffect } from "react";
import TextArea from "antd/lib/input/TextArea";

import { ButtonCustom } from "../../../container/document/styled";
import { useTranslation } from "react-i18next";
import {
  DraggerFile,
  FormWrapper,
  Title,
  TitleUpdateDoc,
  UploadWrapper,
} from "../../../container/FormInputData/styled";

const Createfrom = ({ selected, getDataDocument, setSelected }) => {
  const { t } = useTranslation();
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
    myHeaders.append("Authorization", "Token " + user?.token);
    myHeaders.append(
      "Cookie",
      "csrftoken=iBZFVxTK55EuqJtf8E8fQsPM7FPB9T9fvcwZd0p84fHQooETm1i99ycSF1NITwZn"
    );

    var formdata = new FormData();
    formdata.append("docfile", fileList[0]);
    formdata.append("docname", docName);
    formdata.append("docnote", docNote);
    formdata.append("is_public", "True");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://dev.api.coe.bmte.vn/dm/data/docs", requestOptions)
      .then((response) => response.text())
      .then((result) =>
        getDataDocument((res) => {
          if (res) {
            message.success(t("document.createSuccess"));
            setSelected(res);
          }
        })
      )
      .catch((error) => message.success(t("document.createSuccess")));
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
        <TitleUpdateDoc>{t("document.createDocument<")}</TitleUpdateDoc>
        <Title>{t("document.documentName")}</Title>
        <Input
          placeholder={t("document.documentName")}
          className="width-300"
          value={docName}
          onChange={(e) => setDocName(e?.target?.value)}
        />

        <Title>{t("document.documentNote")}</Title>
        <TextArea
          placeholder={t("document.documentNote")}
          className="width-300"
          value={docNote}
          onChange={(e) => setDocNote(e?.target?.value)}
        />

        <Title>{t("document.uploadCertification")}</Title>
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
          <p className="ant-upload-text">{t("document.clickDrag")}</p>
        </DraggerFile>

        <UploadWrapper>
          <Row>
            <ButtonCustom
              type="primary"
              onClick={handleUpload}
              disabled={fileList.length === 0 || !docName || !docNote}
              loading={uploading}
            >
              {uploading ? t("document.uploading") : t("document.save")}
            </ButtonCustom>
          </Row>
        </UploadWrapper>
      </>
    </FormWrapper>
  );
};

export default Createfrom;
