import React from 'react';
import { Radar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { RadarWrapper } from './styled';

const RadaChart = () => {
  const { t } = useTranslation();
  const RadarData = {
    labels: [
      t('obstetricsData.obstetricsKS_1'),
      t('obstetricsData.obstetricsKS_2'),
      t('obstetricsData.obstetricsKS_3'),
      t('obstetricsData.obstetricsKS_4'),
      t('obstetricsData.obstetricsKS_5'),
      t('obstetricsData.obstetricsKS_6'),
    ],
    datasets: [
      {
        label: 'March',
        backgroundColor: 'rgba(34, 202, 236, .2)',
        borderColor: 'rgba(34, 202, 236, 1)',
        pointBackgroundColor: 'rgba(34, 202, 236, 1)',
        poingBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(34, 202, 236, 1)',
        data: [70, 70, 70, 70, 70, 70],
      },
    ],
  };
  const RadarOptions = {
    scale: {
      min: 0,
      max: 100,
      ticks: {
        stepSize: 20,
        showLabelBackdrop: false,
        backdropColor: 'rgba(203, 197, 11, 1)',
      },
      angleLines: {
        color: 'rgba(255, 255, 255, .3)',
        lineWidth: 1,
      },
      gridLines: {
        color: 'rgba(255, 255, 255, .3)',
        circular: true,
      },
    },
  };

  return (
    <RadarWrapper>
      <Radar data={RadarData} options={RadarOptions} />
    </RadarWrapper>
  );
};

export default RadaChart;
