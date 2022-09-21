import React, { useEffect } from 'react';
import {
  CreatefromWrapper,
  DocumentWrapper,
  SelectWrapper,
  SelectWrapperDoc,
} from './styled';
import download from '../../assets/icon/download.gif';
import { Select } from 'antd';
import { useState } from 'react';
import { linkApi } from '../../common/ngok';
import { useTranslation } from 'react-i18next';
import FormInputData from '../FormInputData/FormInputData';
import editIcon from '../../assets/icon/edit-text.png';
import { sendGet, sendPost } from '../../api/axios';
import Createfrom from './CreateForm/CreateFrom';
import { FileAddOutlined } from '@ant-design/icons';

const Document = ({ title }) => {
  const { t } = useTranslation();
  const [idIframe, setIdIframe] = useState('1');
  const [ListDoc, setListDoc] = useState([]);
  const [selected, setSelected] = useState('');

  const downLoadPdf = () => {
    window.open(`${linkApi}/dm/data/docs?id=${idIframe}`);
  };

  const getDataDocument = async (callback) => {
    try {
      const response = await sendGet('/dm/data/docs');
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
      <div className='document-container'>
        <div className='document-header'>
          <SelectWrapperDoc>
            <Select
              className='select-document'
              value={selected?.name}
              onChange={(e) => {
                console.log('eeeee', e);
                setSelected(ListDoc[Number(e)]);
                setIdIframe(Number(e));
              }}
            >
              {ListDoc?.map((element, index) => {
                return (
                  <Select.Option key={String(index)}>
                    <SelectWrapper>
                      <div>
                        {index + 1}. {element?.name}
                      </div>
                      <img src={editIcon} alt='' />
                    </SelectWrapper>
                  </Select.Option>
                );
              })}
            </Select>
            <FileAddOutlined
              onClick={() => setSelected(null)}
              style={{
                fontSize: '25px',
                marginLeft: '8px',
                cursor: 'pointer',
              }}
            />
          </SelectWrapperDoc>
          <div className='title' onClick={downLoadPdf}>
            <img src={download} alt='' />
            <span>{t('document.download')}</span>
          </div>
        </div>
        {/* <img src={documentiImg} alt="" className="document" /> */}
        {!selected ? (
          <CreatefromWrapper>
            <Createfrom
              selected={selected}
              getDataDocument={getDataDocument}
              setSelected={setSelected}
            />
          </CreatefromWrapper>
        ) : (
          // <iframe
          //   title='iframe'
          //   src={`https://docs.google.com/viewerng/viewer?url=https://coe.unopixel.io/media/documents/61/COE_Certification.pdf&embedded=true`}
          //   height='800px'
          //   width='800px'
          // />
          <object
            data={`https://coe.unopixel.io/media/${selected?.url}`}
            type='application/pdf'
            height='800px'
            width='800px'
          >
            <iframe
              src={`https://docs.google.com/viewer?url=https://coe.unopixel.io/media/${selected?.url}&embedded=true`}
              height='800px'
              width='800px'
            />
          </object>
        )}
      </div>
      <FormInputData selected={selected} />
    </DocumentWrapper>
  );
};

export default Document;
