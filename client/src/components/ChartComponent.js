import React from 'react';
import { Chart } from 'react-google-charts';

const ChartComponent = ({ data }) => {
  return (
    <Chart
      width={'100%'}
      height={'300px'}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        title: 'URL Performance',
        curveType: 'function',
        legend: { position: 'bottom' },
        backgroundColor: { fill: 'transparent' }, 
        series: {
          0: { color: '#FF6347' },
        },
        hAxis: {
          title: 'Day',
          slantedText: true,
          slantedTextAngle: 45,
        },
        vAxis: {
          title: 'Visits',
        },
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  );
};

export default ChartComponent;
