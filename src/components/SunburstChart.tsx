import React from 'react';
import ReactECharts from 'echarts-for-react';

// Certifique-se de instalar: npm install echarts echarts-for-react

// Data provided by the user
const initialData = [
  {
    name: 'Grandpa',
    children: [
      {
        name: 'Uncle Leo',
        value: 20,
        children: [
          {
            name: 'Cousin Jack',
            value: 8
          },
          {
            name: 'Cousin Mary',
            value: 5,
            children: [
              {
                name: 'Jackson',
                value: 2
              }
            ]
          },
          {
            name: 'Cousin Ben',
            value: 9
          }
        ]
      },
      {
        name: 'Father',
        value: 10,
        children: [
          {
            name: 'Me',
            value: 5
          },
          {
            name: 'Brother Peter',
            value: 9
          }
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
          {
            name: 'Cousin Betty',
            value: 9
          },
          {
            name: 'Cousin Jenny',
            value: 2
          }
        ]
      }
    ]
  }
];

// Option provided by the user
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