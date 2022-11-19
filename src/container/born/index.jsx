import React, { useMemo } from 'react';
import { BornWrapper } from './styled';
import accept from '../../assets/born/accept.png';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { LinePoint } from '../../components/common/line-chart/LinePoint';

function RowComponent({
  obstetric,
  index,
  elementData,
  elementST,
  elementSM,
  timeLine,
  department,
}) {

  return (
    <div className='row' key={obstetric.criteria}>
      <div className='stt'>{index + 1}</div>
      <div className='criteria'>{obstetric.criteria}</div>
      <div className='chart'>
        <div className='container-chart'>
          <LinePoint
            hiddenCaesarean={department === 'NK'}
            dataST={elementST}
            dataSM={elementSM}
            time={timeLine}
            department={index >= 6 ? 'NK' : department}
            passLevelST={obstetric.STRate}
            passLevelSM={obstetric.SMRate}
          />
        </div>
      </div>
      {department === 'SK' ? (
        <>
          <div className='w-10'>
            {elementData?.ST || '0'}
            {elementData?.ST !== 'N/A' ? '%' : ''}
          </div>
          <div className='w-10'>
            {elementData?.SM || '0'}
            {elementData?.SM !== 'N/A' ? '%' : ''}
          </div>
        </>
      ) : (
        <div className='w-20'>
          {elementData?.ST || '0'}
          {elementData?.ST !== 'N/A' ? '%' : ''}
        </div>
      )}
      <div className='w-10 border-none'>
        {elementData?.result === 'passed' && <img alt='' src={accept} />}
      </div>
    </div>
  );
}

const BornComponent = ({ data, isGeneral, dataList, department }) => {
  const { t } = useTranslation();
  const currentQuarter = useSelector((state) => state?.data?.currentQuarter);

  const timeLine = useMemo(() => {
    console.log('dataListdataListdataList', dataList);
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
        return point === 'N/A' ? null : point;
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
        return point === 'N/A' ? null : point;
      });
    });
    return response || [];
  }, [dataMainSK, data, dataList, department]);

  return (
    <BornWrapper>
      <div className='row sticky'>
        <div className='stt font-bold'>STT</div>
        <div className='criteria font-bold'>{t('born.criteria')}</div>
        <div className='chart font-bold'>{t('born.chart')}</div>
        {department === 'SK' ? (
          <>
            <div className='w-10 font-bold'>
              {isGeneral
                ? t('born.postpartumMother')
                : t('born.vaginalDelivery')}
            </div>
            <div className='w-10 font-bold'>
              {isGeneral ? t('born.motherYoung') : t('born.Csection')}
            </div>
          </>
        ) : (
          <div className='w-10 font-bold w-20'>
            {isGeneral ? t('born.postpartumMother') : t('born.parameter')}
          </div>
        )}
        <div className='w-10 font-bold  border-none'>{t('born.complete')}</div>
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
            />
          </div>
        ))}
    </BornWrapper>
  );
};

export default BornComponent;
