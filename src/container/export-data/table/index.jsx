import React from 'react';
import { useMemo } from 'react';
import HeaderExport from '../header';
import { dataExport } from './fakeData';
import { TableExportWrapper } from './styled';
import close from '../../../assets/born/close.png';
import accept from '../../../assets/born/accept.png';
import { useSelector } from 'react-redux';

const TableExport = () => {
  const dashboardData = useSelector((state) => state?.data?.dashboardData);
  const currentQuarter =
    useSelector((state) => state?.data?.currentQuarter) || null;

  const checkSuccess = useMemo(() => {
    return (
      [1, 2, 3, 4, 5, 6, 7, 8]?.find(
        (_, index) =>
          dashboardData?.SK[index]?.values?.evaluation[currentQuarter] ===
          'failed'
      ) || false
    );
  }, [currentQuarter, dashboardData]);

  return (
    <TableExportWrapper>
      <HeaderExport />
      <div className='quarter'>Quý {dashboardData?.time[currentQuarter]}</div>
      <div className='header-table'>
        <div className='content'>Nội dung</div>
        <div className='criteria'>Tiêu chí</div>
        <div className='achieve'>Đánh giá (Đạt/ không đạt)</div>
      </div>
      {dataExport.map((dataElement, index) => (
        <div className='body-table' key={String(index)}>
          <div className='content'>
            {index + 1}. {dataElement.content}
          </div>
          <div className='criteria'>{dataElement.criteria}</div>
          <div className='achieve'>
            <img
              alt=''
              src={
                dashboardData[index]?.values?.evaluation[currentQuarter] ===
                'passed'
                  ? accept
                  : close
              }
            />
          </div>
        </div>
      ))}
      <div className='summary-table'>
        <div className='content'>Kết luận</div>
        <div className='criteria'>Đạt nếu tất cả các tiêu chí trên đều đạt</div>
        <div className='achieve'>
          <img alt='' src={checkSuccess ? close : accept} />
        </div>
      </div>
    </TableExportWrapper>
  );
};

export default TableExport;
