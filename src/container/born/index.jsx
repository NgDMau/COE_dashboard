import React from "react";
import { BornWrapper } from "./styled";
import accept from "../../assets/born/accept.png";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { LinePoint } from "../../components/common/line-chart/LinePoint";

function RowComponent({ obstetric, index, elementST, elementSM, evaluation }) {
  const dashboardData = useSelector((state) => state?.data?.dashboardData);
  const currentQuarter = useSelector((state) => state?.data?.currentQuarter);

  return (
    <div className="row" key={obstetric.criteria}>
      <div className="stt">{index + 1}</div>
      <div className="criteria">{obstetric.criteria}</div>
      <div className="chart">
        <div className="container-chart">
          <LinePoint
            hiddenCaesarean={index === 6}
            dataST={elementST}
            dataSM={elementSM}
            time={dashboardData?.time}
          />
        </div>
      </div>
      {elementSM ? (
        <>
          <div className="w-10">
            {elementST[currentQuarter] || "0"}
            {typeof elementST[currentQuarter] !== "string" ? "%" : ""}
          </div>
          <div className="w-10">
            {elementSM[currentQuarter] || "0"}
            {typeof elementSM[currentQuarter] !== "string" ? "%" : ""}
          </div>
        </>
      ) : (
        <div className="w-20">
          {elementST[currentQuarter] || "0"}
          {typeof elementST[currentQuarter] !== "string" ? "%" : ""}
        </div>
      )}

      <div className="w-10 border-none">
        {evaluation[currentQuarter] === "passed" && <img alt="" src={accept} />}
      </div>
    </div>
  );
}

const BornComponent = ({ data, isGeneral, dataList, evaluation }) => {
  const { t } = useTranslation();
  return (
    <BornWrapper>
      <div className="row sticky">
        <div className="stt font-bold">STT</div>
        <div className="criteria font-bold">{t("born.criteria")}</div>
        <div className="chart font-bold">{t("born.chart")}</div>
        {dataList && dataList[1]?.values?.SM ? (
          <>
            <div className="w-10 font-bold">
              {isGeneral
                ? t("born.postpartumMother")
                : t("born.vaginalDelivery")}
            </div>
            <div className="w-10 font-bold">
              {isGeneral ? t("born.motherYoung") : t("born.Csection")}
            </div>
          </>
        ) : (
          <div className="w-10 font-bold w-20">
            {isGeneral ? t("born.postpartumMother") : t("born.parameter")}
          </div>
        )}
        <div className="w-10 font-bold  border-none">{t("born.complete")}</div>
      </div>
      {dataList &&
        data?.map((element, index) => (
          <div key={String(index)}>
            <RowComponent
              obstetric={element}
              index={index}
              elementST={dataList[index + 1]?.values?.ST}
              elementSM={dataList[index + 1]?.values?.SM}
              evaluation={dataList[index + 1]?.values?.evaluation}
            />
          </div>
        ))}
    </BornWrapper>
  );
};

export default BornComponent;
