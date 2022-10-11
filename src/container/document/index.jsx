/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect } from "react";
import {
  ButtonDownLoadWrapper,
  CreatefromWrapper,
  DocumentWrapper,
  NothingContent,
  SelectWrapper,
  SelectWrapperDoc,
} from "./styled";
import download from "../../assets/icon/download.gif";
import { Select, Tooltip } from "antd";
import { useState } from "react";
import { linkApi } from "../../common/ngok";
import { useTranslation } from "react-i18next";
import editIcon from "../../assets/icon/edit-text.png";
import { sendGet } from "../../api/axios";
import { FileAddOutlined } from "@ant-design/icons";
import ListHospital from "../../components/document/listHospital/ListHospital";
import Createfrom from "../../components/document/CreateForm/CreateFrom";
import FormInputData from "../FormInputData/FormInputData";

const Document = ({ title }) => {
  const { t } = useTranslation();
  const [ListDoc, setListDoc] = useState([]);
  const [selected, setSelected] = useState("");
  const [editing, setEditing] = useState(false);
  const downLoadPdf = () => {
    if (!selected) {
      return;
    }
    window.open(`https://api.coe.bmte.vn/media/${selected?.url}`);
  };

  const getDataDocument = async (callback) => {
    try {
      const response = await sendGet("/dm/data/docs");
      setListDoc(response?.docs);
      if (callback) {
        callback(response?.docs[response?.docs?.length - 1]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getDataDocument();
  }, []);

  return (
    <DocumentWrapper>
      <div className="document-container">
        <div className="document-header">
          <SelectWrapperDoc>
            <Select
              className="select-document"
              value={selected?.name}
              onChange={(e) => {
                setSelected(ListDoc[Number(e)]);
                setEditing(false);
              }}
            >
              {ListDoc?.map((element, index) => {
                return (
                  <Select.Option key={String(index)}>
                    <SelectWrapper>
                      <div>
                        {index + 1}. {element?.name}
                      </div>
                      <img
                        src={editIcon}
                        alt=""
                        onClick={(e) => {
                          setTimeout(() => {
                            setEditing(true);
                          }, 0);
                        }}
                      />
                    </SelectWrapper>
                  </Select.Option>
                );
              })}
            </Select>
            <Tooltip placement="right" title="Upload a document">
              <FileAddOutlined
                onClick={() => setSelected(null)}
                style={{
                  fontSize: "25px",
                  marginLeft: "8px",
                  cursor: "pointer",
                }}
              />
            </Tooltip>
          </SelectWrapperDoc>
          <ButtonDownLoadWrapper onClick={downLoadPdf} disabled={!!selected}>
            <img src={download} alt="" />
            <span>{t("document.download")}</span>
          </ButtonDownLoadWrapper>
        </div>
        {/* <img src={documentiImg} alt="" className="document" /> */}
        {!selected || editing ? (
          <CreatefromWrapper>
            {selected === null && (
              <Createfrom
                selected={selected}
                getDataDocument={getDataDocument}
                setSelected={setSelected}
              />
            )}
            {editing && (
              <FormInputData
                selected={selected}
                setSelected={setSelected}
                setEditing={setEditing}
                getDataDocument={getDataDocument}
              />
            )}
            {selected === "" && (
              <NothingContent>
                Please search or upload a document
              </NothingContent>
            )}
          </CreatefromWrapper>
        ) : (
          <div />
        )}
        {selected && !editing ? (
          <object
            data={`https://api.coe.bmte.vn/media/${selected?.url}`}
            type="application/pdf"
            height="800px"
            width="800px"
          >
            <iframe
              src={`https://docs.google.com/viewer?url=https://api.coe.bmte.vn/media/${selected?.url}&embedded=true`}
              height="800px"
              width="800px"
            />
          </object>
        ) : (
          <div />
        )}
      </div>
      {/* <FormInputData selected={selected} /> */}
      <ListHospital />
    </DocumentWrapper>
  );
};

export default Document;
