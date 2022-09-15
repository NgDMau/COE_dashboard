/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import Document from './document';
import { Dropdown, Menu, Segmented, Spin } from 'antd';

import i18next from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import RowData from './row-data';
import RadaChart from '../components/RadaChart/RadaChart';
import SurveyLink from './survey';
import ExportData from './export-data';
import iconVietnam from '../assets/icon/vietnam.png';
import VietNamChart from '../components/VietNamChart/VietNamChart';
import BornComponent from './born';
import FormInputData from './FormInputData/FormInputData';
import FilterComponent from '../dashboard/filter';
import iconUnitedStates from '../assets/icon/united-states.png';

import { linkApi } from '../common/ngok';
import { storeSetLanguage } from '../store/auth-reducer';
import { storeSetDashboardData } from '../store/data-reducer';
import {
  Buttonanguage,
  ChartWrapper,
  ContainerWrapper,
  IConLanguage,
  PathWrapper,
  SpinWrapper,
} from './styled';
import { useMemo } from 'react';

const AppContainer = ({ screen, title, setScreen }) => {
  const { t } = useTranslation();
  const dispath = useDispatch();

  const ObstetricsData = [
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
      criteria: t('obstetricsData.obstetricsKS_7'),
    },
    {
      criteria: t('obstetricsData.obstetricsKS_8'),
    },
  ];

  const ChildData = [
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

  const user = JSON.parse(localStorage.getItem('user'));
  const dashboardData = useSelector((state) => state?.data?.dashboardData);
  const hospitalSelected = useSelector(
    (state) => state?.data?.hospitalSelected
  );

  const [value, setValue] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getDataDashboard = async (selectedCode) => {
    setIsLoading(true);
    const myHeaders = new Headers({
      Authorization: 'Token ' + user?.token,
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    fetch(`${linkApi}/dm/data/evaluation?hospital=${selectedCode}`, {
      method: 'POST',
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        dispath(storeSetDashboardData(data));
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    if (hospitalSelected) {
      getDataDashboard(hospitalSelected?.code);
    }
  }, [hospitalSelected]);

  const dataRadarSM = useMemo(() => {
    // if (!dashboardData) {
    return [86, 86, 100, 100, 100, 100];
    // }
    // const data = [1, 2, 3, 4, 5, 6]?.map((element) =>
    //   value === 1
    //     ? dashboardData?.SK[element]?.values?.SM[7]
    //     : dashboardData?.NK[element]?.values?.SM[7]
    // );
    // return data || null;
  }, [dashboardData, value]);

  const dataRadarST = useMemo(() => {
    return [100, 100, 100, 100, 96, 100];
  }, [dashboardData, value]);

  const isAllNaNK = useMemo(() => {
    let sum = 0;
    [100, 100, 100, 100, 96, 100].forEach((element) => {
      if (
        dashboardData?.SK[element]?.values?.SM?.find(
          (findElement) => findElement !== 'N/A'
        )
      ) {
        sum++;
      }
      if (
        dashboardData?.SK[element]?.values?.ST?.find(
          (findElement) => findElement !== 'N/A'
        )
      ) {
        sum++;
      }
    });
    if (sum !== 0) {
      return true;
    }
    return false;
  }, [dashboardData, value]);
  console.log('dashboardData?.SKdashboardData?.SK', dataRadarSM, dataRadarST);

  return (
    <ContainerWrapper>
      <div className='header'>
        <PathComponent screen={screen} setScreen={setScreen} />
        <FilterComponent
          disabled={screen === 2 || screen === 4}
          screen={screen}
          setScreen={setScreen}
        />
      </div>
      {screen === 1 && (
        <div>
          {!hospitalSelected && (
            <ChartWrapper>
              <RadaChart data={[70, 70, 70, 70, 70, 70]} />
              <VietNamChart />
            </ChartWrapper>
          )}
          {isLoading && (
            <SpinWrapper>
              <Spin size='large' />
            </SpinWrapper>
          )}
          {hospitalSelected && !isLoading ? (
            <>
              <ChartWrapper>
                <RadaChart data={dataRadarST} isNomal />
                <RadaChart data={dataRadarSM} />
              </ChartWrapper>
              {isAllNaNK && <HeaderScreen value={value} setValue={setValue} />}
              <div className='content-chart'>
                {/* <h2>{value}</h2> */}
                {value === 1 && (
                  <BornComponent
                    data={ObstetricsData}
                    dataList={dashboardData?.SK}
                  />
                )}
                {value === 2 && isAllNaNK ? (
                  <BornComponent
                    data={ChildData}
                    dataList={dashboardData?.NK}
                  />
                ) : (
                  <div />
                )}
              </div>
            </>
          ) : null}
        </div>
      )}

      {screen === 2 && <SurveyLink />}
      {screen === 3 && <RowData />}
      {screen === 4 && <Document title={title} />}
      {screen === 6 && <ExportData />}
      {screen === 7 && <FormInputData />}
    </ContainerWrapper>
  );
};

export default AppContainer;

function PathComponent({ screen, setScreen }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector((state) => state?.auth?.language);
  const setLanguage = (languageChange) => {
    dispatch(storeSetLanguage(languageChange));
  };

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <div
              onClick={() => {
                i18next.changeLanguage('vi');
                setLanguage('vi');
              }}
            >
              <IConLanguage src={iconVietnam} alt='' /> {t('common.vietNam')}
            </div>
          ),
        },
        {
          key: '2',
          label: (
            <div
              onClick={() => {
                i18next.changeLanguage('en');
                setLanguage('en');
              }}
            >
              <IConLanguage src={iconUnitedStates} alt='' />{' '}
              {t('common.engLish')}
            </div>
          ),
        },
      ]}
    />
  );
  const screenFake = [
    t('screen.surveyResults'),
    t('screen.surveyLink'),
    t('screen.rowData'),
    t('screen.regulations'),
    t('screen.exportReport'),
  ];
  return (
    <PathWrapper>
      <div>
        <span onClick={() => setScreen(1)}>{t('screen.home')}</span> /{' '}
        {screenFake[screen - 1]}
      </div>
      <Dropdown overlay={menu} placement='bottomLeft'>
        <Buttonanguage>
          {' '}
          <IConLanguage
            src={language === 'vi' ? iconVietnam : iconUnitedStates}
            alt=''
          />{' '}
          {language}
        </Buttonanguage>
      </Dropdown>
    </PathWrapper>
  );
}

function HeaderScreen({ value, setValue }) {
  const { t } = useTranslation();
  return (
    <div className='segmented'>
      <Segmented
        options={[
          { label: t('dashBoard.obstetricDept'), value: 1 },
          { label: t('dashBoard.pediatricDept'), value: 2 },
        ]}
        value={value}
        onChange={setValue}
        size='large'
      />
    </div>
  );
}
