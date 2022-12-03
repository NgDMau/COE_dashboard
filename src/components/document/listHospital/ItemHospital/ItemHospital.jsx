import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import getImagePath from "../../../../helpers/image";
import { showConfirm } from "../../../../helpers/modal-confirm";
import {
  ButtonCancel,
  ButtonSave,
  ButtonWrapper,
  ImageItem,
  InputName,
  InputYear,
  IsUpdateWrapper,
  ItemHospitalWrapp,
  NotUpdateWrapper,
} from "./styled";

const ItemHospital = React.memo(({ item, onUpdate, onDelete }) => {
  const { t } = useTranslation();
  const [isUpdate, setIsUpdate] = useState(false);
  const [valueYear, setValueYear] = useState(item?.last_awarded_year || "");
  const [valueName, setValuename] = useState(item?.name || "");

  const onCancel = () => {
    setIsUpdate(false);
  };
  const onSave = () => {
    onUpdate(valueYear, valueName, item?.code);
    setIsUpdate(false);
  };

  useEffect(() => {
    setValueYear(item?.last_awarded_year);
    setValuename(item?.name);
  }, [item]);

  return (
    <ItemHospitalWrapp>
      {!isUpdate ? (
        <NotUpdateWrapper>
          <div>
            {item?.last_awarded_year}. {item?.name}
          </div>
          <ButtonWrapper>
            <ImageItem
              src={getImagePath("edit-text.png")}
              alt=""
              onClick={() => setIsUpdate(true)}
            />
            <ImageItem
              src={getImagePath("delete.png")}
              alt=""
              onClick={() => {
                showConfirm({
                  title: t("document.confirmDelete") + item?.name + " ?",
                  onOk: () => {
                    onDelete();
                  },
                });
              }}
            />
          </ButtonWrapper>
        </NotUpdateWrapper>
      ) : (
        <IsUpdateWrapper>
          <ButtonWrapper>
            <InputYear
              value={valueYear}
              onChange={(e) => setValueYear(e?.target?.value)}
            />
            <InputName
              value={valueName}
              onChange={(e) => setValuename(e?.target?.value)}
            />
          </ButtonWrapper>
          <ButtonWrapper>
            <ButtonSave onClick={onSave}>Save</ButtonSave>
            <ButtonCancel onClick={onCancel}>Cancel</ButtonCancel>
          </ButtonWrapper>
        </IsUpdateWrapper>
      )}
    </ItemHospitalWrapp>
  );
});

export default ItemHospital;
