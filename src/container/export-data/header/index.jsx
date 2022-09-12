import React from 'react';
import { HeaderExportWrapper } from './styled';
import { useDispatch, useSelector } from 'react-redux';

const HeaderExport = () => {
  const dashboardData =
    useSelector((state) => state?.data?.dashboardData) || null;
  const currentQuarter =
    useSelector((state) => state?.data?.currentQuarter) || null;
  const hospitalSelected = useSelector(
    (state) => state?.data?.hospitalSelected
  );
  return (
    <HeaderExportWrapper>
      <div className='title'>
        RESULTS OF SURVEY OF SUBSCRIPTION VIA MOBILE PHONES
      </div>
      <div className='last-update'>
        Update to {dashboardData?.time[currentQuarter]}
      </div>
      <div className='hospital'>{hospitalSelected?.name}</div>
    </HeaderExportWrapper>
  );
};

export default HeaderExport;
