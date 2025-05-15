import React from 'react';
import { Box, Typography } from '@mui/material';

const legendItems = [
  { color: '#B85442', label: '0% - 9%' },
  { color: '#E06666', label: '10% - 19%' },
  { color: '#F6B26B', label: '20% - 29%' },
  { color: '#FFD966', label: '30% - 39%' },
  { color: '#FFE599', label: '40% - 49%' },
  { color: '#FFF2CC', label: '50% - 59%' },
  { color: '#D9EAD3', label: '60% - 69%' },
  { color: '#93C47D', label: '70% - 79%' },
  { color: '#6AA84F', label: '80% - 89%' },
  { color: '#38761D', label: '90% - 99%' },
  { color: '#274E13', label: '100%' },
  { color: '#999999', label: 'SEM DADOS' },
  { color: '#CCCCCC', label: 'BLOQUEADO' },
  { color: '#666666', label: 'DESATIVADO' },
];

const SunburstLegend = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 3 }}>
    {legendItems.map(item => (
      <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ width: 18, height: 18, backgroundColor: item.color, borderRadius: 1, border: '1px solid #ccc' }} />
        <Typography variant="body2" sx={{ fontSize: 13 }}>{item.label}</Typography>
      </Box>
    ))}
  </Box>
);

export default SunburstLegend; 