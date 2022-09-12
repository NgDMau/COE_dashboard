import React from 'react';
import { LinePoint } from '../line-chart/LinePoint';
import { BornWrapper } from './styled';
import close from '../../assets/born/close.png';
import accept from '../../assets/born/accept.png';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function RowComponent({ obstetric, index, elementST, elementSM, evaluation }) {
  const dashboardData = useSelector((state) => state?.data?.dashboardData);
  const currentQuarter = useSelector((state) => state?.data?.currentQuarter);

  return (
    <div className='row' key={obstetric.criteria}>
      <div className='stt'>{index + 1}</div>
      <div className='criteria'>{obstetric.criteria}</div>
      <div className='chart'>
        <div className='container-chart'>
          <LinePoint
            dataST={elementST}
            dataSM={elementSM}
            time={dashboardData?.time}
          />
        </div>
      </div>
      {elementSM ? (
        <>
          <div className='w-10'>{elementST[currentQuarter] || '0'}%</div>
          <div className='w-10'>{elementSM[currentQuarter] || '0'}%</div>
        </>
      ) : (
        <div className='w-20'>{elementST[currentQuarter] || '0'}%</div>
      )}

      <div className='w-10 border-none'>
        <img
          alt=''
          src={evaluation[currentQuarter] === 'passed' ? accept : close}
        />
      </div>
    </div>
  );
}

const BornComponent = ({ data, isGeneral, dataList, evaluation }) => {
  const { t } = useTranslation();
  return (
    <BornWrapper>
      <div className='row sticky'>
        <div className='stt font-bold'>STT</div>
        <div className='criteria font-bold'>{t('born.criteria')}</div>
        <div className='chart font-bold'>{t('born.chart')}</div>
        {dataList && dataList[1]?.values?.SM ? (
          <>
            <div className='w-10 font-bold'>
              {isGeneral ? 'Bà mẹ sau sinh' : t('born.vaginalDelivery')}
            </div>
            <div className='w-10 font-bold'>
              {isGeneral ? 'Bà mẹ/ người CS trẻ' : t('born.Csection')}
            </div>
          </>
        ) : (
          <div className='w-10 font-bold w-20'>
            {isGeneral ? 'Bà mẹ sau sinh' : 'Chỉ số'}
          </div>
        )}
        <div className='w-10 font-bold  border-none'>{t('born.complete')}</div>
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
