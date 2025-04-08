import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { Download } from 'lucide-react';

const Reports: React.FC = () => {
  const reports = [
    {
      id: 1,
      name: 'Relatório Financeiro - Janeiro 2024',
      type: 'PDF',
      date: '01/02/2024',
      size: '2.5 MB',
    },
    {
      id: 2,
      name: 'Análise de Desempenho Q4 2023',
      type: 'XLSX',
      date: '15/01/2024',
      size: '1.8 MB',
    },
    {
      id: 3,
      name: 'Relatório de Atividades - Dezembro 2023',
      type: 'PDF',
      date: '05/01/2024',
      size: '3.2 MB',
    },
  ];

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Relatórios
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome do Relatório</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Tamanho</TableCell>
              <TableCell>Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.name}</TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>{report.size}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Download size={16} />}
                  >
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Reports;