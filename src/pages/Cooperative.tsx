import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Box,
} from '@mui/material';

const Cooperative: React.FC = () => {
  const metrics = [
    {
      title: 'Participação de Mercado',
      value: 75,
      color: '#2196f3',
    },
    {
      title: 'Satisfação dos Cooperados',
      value: 92,
      color: '#4caf50',
    },
    {
      title: 'Crescimento Anual',
      value: 68,
      color: '#ff9800',
    },
    {
      title: 'Índice de Retenção',
      value: 88,
      color: '#9c27b0',
    },
  ];

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Análise Cooperativa
      </Typography>
      <Grid container spacing={3}>
        {metrics.map((metric) => (
          <Grid item xs={12} sm={6} key={metric.title}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {metric.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={metric.value}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: metric.color,
                        },
                      }}
                    />
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">
                      {`${Math.round(metric.value)}%`}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Cooperative;