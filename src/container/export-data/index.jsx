import React, { useMemo } from 'react';
import { ALL_DATA } from '../fakeData';
import ChartExport from './chart';
import RankExport from './rank';
import { ExportWrapper } from './styled';
import TableExport from './table';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const ExportData = () => {
  const { t } = useTranslation();

  const dashboardData = useSelector((state) => state?.data?.dashboardData);

  const ALL_DATA = [
    {
      criteria: t('obstetricsData.obstetricsKS_1'),
    },
    {
      criteria: t('obstetricsData.obstetricsKS_2'),
    },
    {
      criteria: t('obstetricsData.obstetricsKS_3'),
    },
    {
      criteria: t('obstetricsData.obstetricsKS_4'),
    },
    {
      criteria: t('obstetricsData.obstetricsKS_5'),
    },
    {
      criteria: t('obstetricsData.obstetricsKS_6'),
    },
    {
      criteria: t('obstetricsData.obstetricsKN_1'),
    },
    {
      criteria: t('obstetricsData.obstetricsKN_2'),
    },
    {
      criteria: t('obstetricsData.obstetricsKN_3'),
    },
    {
      criteria: t('obstetricsData.obstetricsKN_4'),
    },
    {
      criteria: t('obstetricsData.obstetricsKN_5'),
    },
    {
      criteria: t('obstetricsData.obstetricsKN_6'),
    },
    {
      criteria: t('obstetricsData.obstetricsKN_7'),
    },
  ];

  const dataList = useMemo(() => {
    if (!dashboardData) {
      return null;
    }
    const dataAll = {
      ...dashboardData?.SK,
      8: dashboardData?.NK[1],
      9: dashboardData?.NK[2],
      10: dashboardData?.NK[3],
      11: dashboardData?.NK[4],
      12: dashboardData?.NK[5],
      13: dashboardData?.NK[6],
    };
    return dataAll;
  }, [dashboardData]);
  const checkFullNa = (arr) => {
    const find = arr?.find((findElement) => findElement !== 'N/A');
    if (!find) {
      return false;
    }
    return true;
  };

  return (
    <ExportWrapper id='exportDagta'>
      <div></div>
      <div>
        <div className='page html2pdf__page-break'>
          <TableExport />
        </div>
        {ALL_DATA.map((element, index) => {
          if (
            !checkFullNa(dataList[index + 1]?.values?.ST) ||
            !checkFullNa(dataList[index + 1]?.values?.SM)
          ) {
            return <div />;
          }
          return (
            <div className='page html2pdf__page-break'>
              <ChartExport
                criteria={element.criteria}
                elementST={dataList[index + 1]?.values?.ST}
                elementSM={dataList[index + 1]?.values?.SM}
                evaluation={dataList[index + 1]?.values?.evaluation}
              />
            </div>
          );
        })}

        <div className='page html2pdf__page-break'>
          <RankExport />
        </div>
      </div>
    </ExportWrapper>
  );
};

export default ExportData;
