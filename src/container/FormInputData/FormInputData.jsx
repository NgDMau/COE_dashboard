/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Input, message, Row } from 'antd';
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
} from './styled';
import { useEffect } from 'react';
import deleteIcon from '../../assets/icon/delete.png';
import TextArea from 'antd/lib/input/TextArea';
import { ButtonCustom } from '../document/styled';
import ModalNormal from '../../components/common/modal';
import { sendDelete } from '../../api/axios';
import { useTranslation } from 'react-i18next';

const FormInputData = ({
  selected,
  setSelected,
  setEditing,
  getDataDocument,
}) => {
  const { t } = useTranslation();
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const [isShow, setIsShow] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [docName, setDocName] = useState('');
  const [docNote, setDocNote] = useState('');

  const [deleteCheck, setDeleteCheck] = useState('');

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
    myHeaders.append('Authorization', 'Token ' + user?.token);
    myHeaders.append(
      'Cookie',
      'csrftoken=iBZFVxTK55EuqJtf8E8fQsPM7FPB9T9fvcwZd0p84fHQooETm1i99ycSF1NITwZn'
    );

    var formdata = new FormData();
    // formdata.append("docfile", fileList[0]);
    formdata.append('docname', docName);
    formdata.append('docnote', docNote);
    formdata.append('is_public', 'True');

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      `https://dev.api.coe.bmte.vn/dm/data/docs?id=${selected?.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) =>
        getDataDocument((res) => {
          if (result?.status === 'successful') {
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
          setSelected('');
        });
      }
    } catch (error) {
      message.success(`Delete error.`);
      setEditing(false);
      setSelected('');
    }
  };

  const props = {};
  const cancelModal = () => {
    setIsShow(false);
    setDeleteCheck('');
  };

  return (
    <FormWrapper>
      {selected && (
        <>
          <TitleUpdateDoc>{t('document.updateDocument')}</TitleUpdateDoc>

          <Title>{t('document.updateDocument')}</Title>
          <Input
            placeholder={t('document.documentName')}
            value={docName}
            onChange={(e) => setDocName(e?.target?.value)}
          />

          <Title>{t('document.documentNote')}</Title>
          <TextArea
            placeholder={t('document.documentNote')}
            value={docNote}
            onChange={(e) => setDocNote(e?.target?.value)}
          />

          <Title>{t('document.uploadCertification')}</Title>
          <DraggerFile
            height={130}
            style={{ width: 300 }}
            maxCount={2}
            value={fileList}
            disabled={true}
            {...props}
          >
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>
              {/* Click or drag file to this area to upload */}
            </p>
          </DraggerFile>

          <UploadWrapper>
            <Row>
              <ButtonCustom
                type='primary'
                onClick={handleUpload}
                disabled={fileList.length === 0 || !docName || !docNote}
                loading={uploading}
              >
                {uploading ? t('document.uploading') : t('document.save')}
              </ButtonCustom>
              <ButtonCustom
                type='primary'
                onClick={() => {
                  setEditing(false);
                }}
                loading={uploading}
              >
                {t('document.cancel')}
              </ButtonCustom>
            </Row>
            <img src={deleteIcon} alt='' onClick={() => setIsShow(true)} />
          </UploadWrapper>
        </>
      )}
      <ModalNormal
        visible={isShow}
        setVisible={setIsShow}
        onCancel={cancelModal}
        title={t('document.deleteDocument')}
      >
        <CeckName>
          {t('document.enterName')} <SelectName>{selected?.name}</SelectName>{' '}
          {t('document.toConfirm')}
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
            {t('document.confirm')}
          </DeleteButton>
          <CancelButton onClick={cancelModal}>
            {t('document.cancel')}
          </CancelButton>
        </ConfirmWrapper>
      </ModalNormal>
    </FormWrapper>
  );
};

export default FormInputData;
