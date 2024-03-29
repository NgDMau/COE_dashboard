import React, { useMemo } from "react";
import { BornWrapper } from "./styled";
import accept from "../../assets/born/accept.png";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { LinePoint } from "../../components/common/line-chart/LinePoint";
import GroupColumn from "../../components/GroupColumn/GroupColumn";

function RowComponent({
  obstetric,
  index,
  elementData,
  elementST,
  elementSM,
  timeLine,
  department,
  data,
}) {
  return (
    <div className="row" key={obstetric.criteria}>
      <div className="stt">{index + 1}</div>
      <div className="criteria">{obstetric.criteria}</div>
      <div className="chart">
        <div className="container-chart">
          <LinePoint
            hiddenCaesarean={department === "NK"}
            dataST={elementST}
            dataSM={elementSM}
            time={timeLine}
            department={index >= 6 ? "NK" : department}
            passLevelST={obstetric.STRate}
            passLevelSM={obstetric.SMRate}
          />
        </div>
      </div>
      {department === "SK" && 6 > index ? (
        <>
          <div className="w-10">
            {elementData?.ST || "0"}
            {elementData?.ST !== "N/A" ? "%" : ""}
          </div>
          <div className="w-10">
            {elementData?.SM || "0"}
            {elementData?.SM !== "N/A" ? "%" : ""}
          </div>
        </>
      ) : (
        <div className="w-20">
          {elementData?.ST || "0"}
          {elementData?.ST !== "N/A" ? "%" : ""}
        </div>
      )}
      <div className="w-10 border-none">
        {elementData?.result === "passed" ? (
          <img alt="" src={accept} />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

const BornComponent = ({ data, isGeneral, dataList, department }) => {
  const { t } = useTranslation();
  const currentQuarter = useSelector((state) => state?.data?.currentQuarter);

  const timeLine = useMemo(() => {
    if (!dataList) {
      return null;
    }
    const response = dataList?.map((element) => {
      return element?.time;
    });
    return response || [];
  }, [dataList]);

  const dataMainSK = useMemo(() => {
    if (!dataList) {
      return null;
    }
    const response = dataList[currentQuarter]?.data?.[department];
    return response || [];
  }, [dataList, currentQuarter, department]);

  const lineChartDataST = useMemo(() => {
    if (!dataList || !dataMainSK || dataMainSK?.length === 0) {
      return null;
    }
    const response = data?.map((element, index) => {
      return dataList?.map((dataElement) => {
        const point = dataElement?.data[department][index + 1]?.values?.ST;
        return point === "N/A" ? null : point;
      });
    });
    return response || [];
  }, [dataMainSK, data, dataList, department]);

  const lineChartDataSM = useMemo(() => {
    if (!dataList || !dataMainSK || dataMainSK?.length === 0) {
      return null;
    }
    const response = data?.map((element, index) => {
      return dataList?.map((dataElement) => {
        const point = dataElement?.data[department][index + 1]?.values?.SM;
        return point === "N/A" ? null : point;
      });
    });
    return response || [];
  }, [dataMainSK, data, dataList, department]);
  const violationDecree = useMemo(() => {
    if (!dataList || !dataMainSK || dataMainSK?.length === 0) {
      return null;
    }
    const response = [1, 2, 3, 4, 5, 6, 7, 8]?.map((element) => {
      return department === "SK"
        ? dataList[element]?.data[department]?.[11]?.values?.PER || 0
        : dataList[element]?.data[department]?.[8]?.values?.PER || 0;
    });
    return response || [];
  }, [dataList, department, dataMainSK]);
  console.log("datadata", dataList);

  const quanterViolation = useMemo(() => {
    if (!dataList) {
      return {};
    }
    return department === "SK"
      ? dataList[currentQuarter]?.data[department]?.[11]?.values || {}
      : dataList[currentQuarter]?.data[department]?.[8]?.values || {};
  }, [currentQuarter, dataList, department]);

  return (
    <BornWrapper>
      <div className="row sticky">
        <div className="stt font-bold">STT</div>
        <div className="criteria font-bold">{t("born.criteria")}</div>
        <div className="chart font-bold">{t("born.chart")}</div>
        {department === "SK" ? (
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
      {dataMainSK &&
        data?.map((element, index) => (
          <div key={String(index)}>
            <RowComponent
              obstetric={element}
              index={index}
              elementData={dataMainSK[index + 1]?.values}
              elementSM={lineChartDataSM[index]}
              elementST={lineChartDataST[index]}
              timeLine={timeLine}
              department={department}
              data={data}
            />
          </div>
        ))}
      <div className="row">
        <div className="stt">{data?.length + 1}</div>
        <div className="criteria">{t("obstetricsData.radar_6")}</div>
        <div className="chart">
          <div className="container-chart">
            <GroupColumn department={department} />
          </div>
        </div>

        <div className="w-20">
          {quanterViolation?.PER}
          {quanterViolation?.PER !== "N/A" ? "%" : ""}
        </div>
        <div className="w-10 border-none">
          {quanterViolation?.result === "passed" ? (
            <img alt="" src={accept} />
          ) : (
            <div />
          )}
        </div>
      </div>
    </BornWrapper>
  );
};

export default BornComponent;
