import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Chart.js 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['', ''], // 항목 레이블
  datasets: [
    {
      label: '',
      data: [6], // 첫 번째 데이터
      backgroundColor: '#B4B4B4',
    },
    {
      label: '',
      data: [3], // 두 번째 데이터
      backgroundColor: '#799AEA',
    },
  ],
};

const options = {
  indexAxis: 'y', // 가로 막대 그래프 설정
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
        barThickness: 10,
    },
  },
};

const HorizontalBarChart = () => {
  return (
    <div className='last-month-graph'>
      <Bar data={data} options={options} />
    </div>
  );
};

export default HorizontalBarChart;
