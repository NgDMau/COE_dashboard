import React from 'react';
import HeaderExport from '../header';
import { ChartExportWrapper } from './styled';
import { useSelector } from 'react-redux';
import { LinePoint } from '../../../components/common/line-chart/LinePoint';
import TableChart from './table-chart';

const ChartExport = ({ elementST, elementSM, criteria, index, department }) => {
  const dashboardData = useSelector((state) => state?.data?.dashboardData);
  console.log('dashboardDatadashboardDatadashboardData', dashboardData);
  return (
    <ChartExportWrapper>
      <HeaderExport />
      <div className='chart'>
        <div className='title'>{criteria?.criteria}</div>
        <LinePoint
          dataST={elementST}
          dataSM={elementSM}
          time={dashboardData?.time}
          hiddenCaesarean={department === 'NK'}
          department={index >= 6 ? 'NK' : department}
          passLevelST={criteria.STRate}
          passLevelSM={criteria.SMRate}
        />
      </div>
      <TableChart index={index} criteria={criteria} department={department} />
    </ChartExportWrapper>
  );
};

export default ChartExport;
