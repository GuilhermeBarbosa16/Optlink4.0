import React from 'react';
import { Sunburst, ResponsiveContainer } from 'recharts';
import { Box, Paper } from '@mui/material';

interface SunburstNavigationChartProps {
  data: any;
}

const SunburstNavigationChart: React.FC<SunburstNavigationChartProps> = ({ data }) => {
  return (
    <Paper sx={{ p: 3, borderRadius: 2, height: '500px' }}>
      <Box sx={{ height: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <Sunburst
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={180}
            fill="#8884d8"
            stroke="#fff"
          />
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default SunburstNavigationChart;