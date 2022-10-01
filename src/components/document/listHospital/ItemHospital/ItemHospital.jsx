import { Button, Input } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import getImagePath from "../../../../helpers/image";
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

const ItemHospital = React.memo(({ item, onUpdate }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [valueYear, setValueYear] = useState(item?.last_awarded_year || "");
  const [valueName, setValuename] = useState(item?.name || "");

  const onCancel = () => {
    setIsUpdate(false);
  };
  const onSave = () => {
    onUpdate(valueYear, valueName);
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
            <ImageItem src={getImagePath("delete.png")} alt="" />
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
