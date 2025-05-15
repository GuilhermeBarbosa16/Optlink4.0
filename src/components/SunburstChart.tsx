import React from 'react';
import ReactECharts from 'echarts-for-react';

// Certifique-se de instalar: npm install echarts echarts-for-react

// Função para cor fiel à legenda
const getColorByValue = (value: number) => {
  if (value === undefined || value === null) return '#999999'; // SEM DADOS
  if (value >= 100) return '#274E13';
  if (value >= 90) return '#38761D';
  if (value >= 80) return '#6AA84F';
  if (value >= 70) return '#93C47D';
  if (value >= 60) return '#D9EAD3';
  if (value >= 50) return '#FFF2CC';
  if (value >= 40) return '#FFE599';
  if (value >= 30) return '#FFD966';
  if (value >= 20) return '#F6B26B';
  if (value >= 10) return '#E06666';
  if (value >= 0) return '#B85442';
  return '#999999';
};

// Dados do exemplo fornecido
const initialData = [
  {
    name: 'Grandpa',
    children: [
      {
        name: 'Uncle Leo',
        value: 15,
        children: [
          { name: 'Cousin Jack', value: 2 },
          {
            name: 'Cousin Mary',
            value: 5,
            children: [
              { name: 'Jackson', value: 2 }
            ]
          },
          { name: 'Cousin Ben', value: 4 }
        ]
      },
      {
        name: 'Father',
        value: 10,
        children: [
          { name: 'Me', value: 5 },
          { name: 'Brother Peter', value: 1 }
        ]
      }
    ]
  },
  {
    name: 'Nancy',
    children: [
      {
        name: 'Uncle Nike',
        children: [
          { name: 'Cousin Betty', value: 1 },
          { name: 'Cousin Jenny', value: 2 }
        ]
      }
    ]
  }
];

const option = {
  series: {
    type: 'sunburst',
    data: initialData,
    radius: [60, '90%'],
    itemStyle: {
      borderRadius: 7,
      borderWidth: 2
    },
    label: {
      show: false
    }
  }
};

const SunburstChart: React.FC = () => {
  return (
    <ReactECharts
      option={option}
      style={{ height: 400, width: '100%' }}
    />
  );
};

export default SunburstChart; 