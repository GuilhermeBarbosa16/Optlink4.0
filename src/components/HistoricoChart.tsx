import React, { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', uv: 4000, pv: 2400 },
  { name: 'Fev', uv: 3000, pv: 1398 },
  { name: 'Mar', uv: 2000, pv: 9800 },
  { name: 'Abr', uv: 2780, pv: 3908 },
  { name: 'Mai', uv: 1890, pv: 4800 },
  { name: 'Jun', uv: 2390, pv: 3800 },
  { name: 'Jul', uv: 3490, pv: 4300 },
];

const HistoricoChart: React.FC = () => {
  const [mostrarGrafico, setMostrarGrafico] = useState(false);

  return (
    <Box mt={4} component={Paper} p={3} sx={{ borderRadius: 2 }}>
      {/* Subtítulo */}
      <Typography variant="h5" gutterBottom>
        Saúde da Empresa
      </Typography>

      {/* Botão para mostrar/ocultar o gráfico */}
      <Button 
        variant="contained" 
        onClick={() => setMostrarGrafico(!mostrarGrafico)}
        sx={{ backgroundColor: '#4F4F4F', color: 'white', mb: 2 }}
      >
        {mostrarGrafico ? 'Ocultar Histórico' : 'Mostrar Histórico'}
      </Button>

      {/* Gráfico só aparece se mostrarGrafico for true */}
      {mostrarGrafico && (
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default HistoricoChart;
