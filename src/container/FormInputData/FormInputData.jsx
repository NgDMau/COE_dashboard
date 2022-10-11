/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Input, message, Row } from "antd";
import {
  CancelButton,
  CeckName,
  ConfirmWrapper,
  DeleteButton,
  DraggerFile,
  FormWrapper,
  InputDelete,
  SelectName,
  Title,
  TitleUpdateDoc,
  UploadWrapper,
} from "./styled";
import { useEffect } from "react";
import deleteIcon from "../../assets/icon/delete.png";
import TextArea from "antd/lib/input/TextArea";
import { ButtonCustom } from "../document/styled";
import ModalNormal from "../../components/common/modal";
import { sendDelete } from "../../api/axios";

const FormInputData = ({
  selected,
  setSelected,
  setEditing,
  getDataDocument,
}) => {
  console.log("setSelectedsetSelected", selected);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [isShow, setIsShow] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [docName, setDocName] = useState("");
  const [docNote, setDocNote] = useState("");

  const [deleteCheck, setDeleteCheck] = useState("");

  useEffect(() => {
    setDocName(selected?.name);
    setDocNote(selected?.note);
    setFileList([
      {
        name: selected?.url,
      },
    ]);
  }, [selected]);

  const handleUpload = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + user?.token);
    myHeaders.append(
      "Cookie",
      "csrftoken=iBZFVxTK55EuqJtf8E8fQsPM7FPB9T9fvcwZd0p84fHQooETm1i99ycSF1NITwZn"
    );

    var formdata = new FormData();
    // formdata.append("docfile", fileList[0]);
    formdata.append("docname", docName);
    formdata.append("docnote", docNote);
    formdata.append("is_public", "True");

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `https://api.coe.bmte.vn/dm/data/docs?id=${selected?.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) =>
        getDataDocument((res) => {
          console.log("resultresultresult", result);
          if (result?.status === "successful") {
            message.success(`Edit successfully.`);
            setSelected({
              ...selected,
              name: docName,
              note: docNote,
            });
            setEditing(false);
          }
        })
      )
      .catch((error) => message.warning(`Edit Error.`));
  };

  const handleDelete = async () => {
    try {
      const response = await sendDelete(`/dm/data/docs?id=${selected?.id}`);
      if (response) {
        getDataDocument((res) => {
          message.success(`Delete successfully.`);
          setEditing(false);
          setSelected("");
        });
      }
    } catch (error) {
      message.success(`Delete error.`);
      setEditing(false);
      setSelected("");
    }
  };

  const props = {};
  const cancelModal = () => {
    setIsShow(false);
    setDeleteCheck("");
  };

  return (
    <FormWrapper>
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
            disabled={true}
            {...props}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              {/* Click or drag file to this area to upload */}
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
                onClick={() => {
                  setEditing(false);
                }}
                loading={uploading}
              >
                {"Cancel"}
              </ButtonCustom>
            </Row>
            <img src={deleteIcon} alt="" onClick={() => setIsShow(true)} />
          </UploadWrapper>
        </>
      )}
      <ModalNormal
        visible={isShow}
        setVisible={setIsShow}
        onCancel={cancelModal}
        title="Delete document"
      >
        <CeckName>
          Please enter that name <SelectName>{selected?.name}</SelectName> to
          confirm the deletion:
        </CeckName>
        <InputDelete
          value={deleteCheck}
          onChange={(e) => setDeleteCheck(e?.target?.value)}
        />
        <ConfirmWrapper>
          <DeleteButton
            disabled={deleteCheck !== selected?.name}
            onClick={handleDelete}
          >
            Confirm
          </DeleteButton>
          <CancelButton onClick={cancelModal}>Cancel</CancelButton>
        </ConfirmWrapper>
      </ModalNormal>
    </FormWrapper>
  );
};

export default FormInputData;
