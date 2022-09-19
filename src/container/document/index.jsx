import React from "react";
import { DocumentWrapper, SelectWrapper } from "./styled";
import download from "../../assets/icon/download.gif";
import { Select } from "antd";
import { listDocument } from "../../dashboard/report-form/fakeData";
import { useState } from "react";
import { linkApi } from "../../common/ngok";
import { useTranslation } from "react-i18next";
import FormInputData from "../FormInputData/FormInputData";
import editIcon from "../../assets/icon/edit-text.png";

const Document = ({ title }) => {
  const { t } = useTranslation();
  const [idIframe, setIdIframe] = useState("1");

  const downLoadPdf = () => {
    window.open(`${linkApi}/dm/data/docs?id=${idIframe}`);
  };

  return (
    <DocumentWrapper>
      <div className="document-container">
        <div className="document-header">
          <Select
            labelInValue={listDocument[0]}
            className="select-document"
            defaultValue={listDocument[0]}
            onChange={(e) => {
              setIdIframe(e.label[0]);
            }}
          >
            {listDocument.map((element, index) => {
              return (
                <Select.Option key={String(index)}>
                  <SelectWrapper>
                    <div>
                      {index + 1}. {element}
                    </div>
                    <img src={editIcon} alt="" />
                  </SelectWrapper>
                </Select.Option>
              );
            })}
          </Select>
          <div className="title" onClick={downLoadPdf}>
            <img src={download} alt="" />
            <span>{t("document.download")}</span>
          </div>
        </div>
        {/* <img src={documentiImg} alt="" className="document" /> */}
        <iframe
          title="iframe"
          src={`https://docs.google.com/viewerng/viewer?url=${linkApi}/dm/data/docs?id=${idIframe}&embedded=true`}
          height="800px"
          width="800px"
        />
      </div>
      <FormInputData />
    </DocumentWrapper>
  );
};

export default Document;
