import React from "react";
import { DocumentWrapper } from "./styled";
import documentiImg from "../../assets/brand/document.png";
import download from "../../assets/icon/download.gif";
import { Select } from "antd";
import { listDocument } from "../../dashboard/report-form/fakeData";

const Document = ({ title }) => {
  return (
    <DocumentWrapper>
      <div className="document-container">
        <div className="document-header">
          <Select
            labelInValue={listDocument[0]}
            className="select-document"
            defaultValue={listDocument[0]}
            onChange={() => {}}
          >
            {listDocument.map((element, index) => {
              return (
                <Select.Option key={String(index)}>
                  {index + 1}. {element}
                </Select.Option>
              );
            })}
          </Select>
          <div className="title">
            <img src={download} alt="" />
            <span>Download</span>
          </div>
        </div>
        <img src={documentiImg} alt="" className="document" />
      </div>
    </DocumentWrapper>
  );
};

export default Document;
