import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Select,
  FormControl,
  Box,
  Grid,
  TextField,
  InputAdornment,
  Divider,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  MoreVert,
  Circle,
} from '@mui/icons-material';

const CriticalityNotifications: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currentRow, setCurrentRow] = React.useState<number | null>(null);
  const [statusFilter, setStatusFilter] = React.useState<string>('todos');
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, rowId: number) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(rowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentRow(null);
  };

  const handleStatusFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newStatus: string
  ) => {
    if (newStatus !== null) {
      setStatusFilter(newStatus);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const notifications = [
    {
      id: 1,
      criticidade: 'alta',
      unidade: 'AB',
      ativo: 'Equipamento 01',
      descricao: 'Falha no sistema de refrigeração',
      primeiraOcorrencia: '30/04/2022 16:57',
      ultimaOcorrencia: '01/05/2022 09:23',
      codigo: 'REF-001',
      status: 'pendente'
    },
    {
      id: 2,
      criticidade: 'media',
      unidade: 'CD',
      ativo: 'Sistema Elétrico',
      descricao: 'Queda de tensão detectada',
      primeiraOcorrencia: '28/04/2022 10:15',
      ultimaOcorrencia: '30/04/2022 14:45',
      codigo: 'ELT-045',
      status: 'em analise'
    },
    {
      id: 3,
      criticidade: 'baixa',
      unidade: 'EF',
      ativo: 'Painel de Controle',
      descricao: 'Botão com mau contato',
      primeiraOcorrencia: '25/04/2022 08:30',
      ultimaOcorrencia: '25/04/2022 08:30',
      codigo: 'MEC-112',
      status: 'encerrado'
    },
    {
      id: 4,
      criticidade: 'alta',
      unidade: 'GH',
      ativo: 'Servidor Principal',
      descricao: 'Superaquecimento do processador',
      primeiraOcorrencia: '02/05/2022 11:20',
      ultimaOcorrencia: '02/05/2022 11:20',
      codigo: 'SRV-201',
      status: 'pendente'
    },
  ];

  const filteredNotifications = notifications.filter(notification => {
    // Filtro por status
    if (statusFilter !== 'todos' && notification.status !== statusFilter) {
      return false;
    }
    
    // Filtro por pesquisa
    if (searchTerm && !Object.values(notification).some(
      value => String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )) {
      return false;
    }
    
    return true;
  });

  const handleStatusChange = (id: number, newStatus: string) => {
    // Aqui você implementaria a lógica para atualizar o status no backend
    console.log(`Alterando status da notificação ${id} para ${newStatus}`);
    handleMenuClose();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Notificações de Criticidade
      </Typography>

      {/* Barra de pesquisa e filtros */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          
          {/* Filtros de status */}
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <ToggleButtonGroup
              value={statusFilter}
              exclusive
              onChange={handleStatusFilterChange}
              size="small"
            >
              <ToggleButton value="todos" sx={{ textTransform: 'none' }}>
                Todos
              </ToggleButton>
              <ToggleButton value="pendente" sx={{ textTransform: 'none' }}>
                Pendentes
              </ToggleButton>
              <ToggleButton value="em analise" sx={{ textTransform: 'none' }}>
                Em Análise
              </ToggleButton>
              <ToggleButton value="encerrado" sx={{ textTransform: 'none' }}>
                Encerrados
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Typography variant="body2" sx={{ mr: 1 }}>
              Página 1
            </Typography>
            <IconButton>
              <ChevronLeft />
            </IconButton>
            <IconButton>
              <ChevronRight />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Tabela de notificações */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Criticidade</TableCell>
              <TableCell>Unidade</TableCell>
              <TableCell>Ativo</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Primeira Ocorrência</TableCell>
              <TableCell>Última Ocorrência</TableCell>
              <TableCell>Código</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredNotifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>
                  <Circle sx={{ 
                    color: notification.criticidade === 'alta' ? 'red' : 
                           notification.criticidade === 'media' ? 'orange' : 'green' 
                  }} />
                </TableCell>
                <TableCell>{notification.unidade}</TableCell>
                <TableCell>{notification.ativo}</TableCell>
                <TableCell>{notification.descricao}</TableCell>
                <TableCell>{notification.primeiraOcorrencia}</TableCell>
                <TableCell>{notification.ultimaOcorrencia}</TableCell>
                <TableCell>{notification.codigo}</TableCell>
                <TableCell>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      value={notification.status}
                      onChange={(e) => handleStatusChange(notification.id, e.target.value)}
                      sx={{ fontSize: '0.875rem' }}
                    >
                      <MenuItem value="pendente">Pendente</MenuItem>
                      <MenuItem value="em analise">Em Análise</MenuItem>
                      <MenuItem value="encerrado">Encerrado</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="more"
                    onClick={(e) => handleMenuClick(e, notification.id)}
                  >
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Menu de contexto */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleStatusChange(currentRow || 0, 'pendente')}>
          Marcar como Pendente
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(currentRow || 0, 'em analise')}>
          Marcar como Em Análise
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(currentRow || 0, 'encerrado')}>
          Marcar como Encerrado
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default CriticalityNotifications;