import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
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
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  CssBaseline,
  MenuItem,
  Select,
  SelectChangeEvent,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Collapse,
  Tooltip as MuiTooltip,
  useMediaQuery,
  Theme,
  styled
} from '@mui/material';
import {
  Download,
  TableChart,
  PieChart as PieChartIcon,
  Menu,
  ChevronLeft,
  ChevronRight,
  ExpandMore,
  ExpandLess,
  Description as RelatoriosIcon,
  ChevronRight as SetaDireitaIcon
} from '@mui/icons-material';

// Definindo tipos
type ExpandedState = {
  relatorios: boolean;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Reports: React.FC = () => {
  // Estados
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'table' | 'pie'>('table');
  const [timeRange, setTimeRange] = useState('24H');
  const [expanded, setExpanded] = useState<ExpandedState>({
    relatorios: true
  });
  const [selectedItem, setSelectedItem] = useState('Disponibilidade Física');
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  // Estilo personalizado para os itens do menu
  const MenuItemButton = styled(ListItemButton)(({ theme }) => ({
    '&.Mui-selected': {
      backgroundColor: theme.palette.action.selected,
      borderLeft: `4px solid ${theme.palette.primary.main}`
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    },
    paddingLeft: 24,
    paddingRight: 16
  }));

  // Handlers
  const handleToggle = (menu: keyof ExpandedState) => {
    setExpanded(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    if (isMobile) setSidebarOpen(false);
  };

  const handleViewModeChange = (event: SelectChangeEvent) => {
    setViewMode(event.target.value as 'table' | 'pie');
  };

  const handleTimeRangeChange = (
    event: React.MouseEvent<HTMLElement>,
    newRange: string | null
  ) => {
    if (newRange !== null) {
      setTimeRange(newRange);
    }
  };

  // Dados
  const disponibilidadeData = [
    {
      id: 1,
      ativo: 'Máquina 1',
      tempoDisponivel: '95%',
      quantidade: 1,
      status: 'operacional'
    },
    {
      id: 2,
      ativo: 'Máquina 2',
      tempoDisponivel: '87%',
      quantidade: 1,
      status: 'operacional'
    },
    {
      id: 3,
      ativo: 'Computador 1',
      tempoDisponivel: '100%',
      quantidade: 5,
      status: 'operacional'
    },
  ];

  const pieData = disponibilidadeData.map(item => ({
    name: item.ativo,
    value: parseFloat(item.tempoDisponivel.replace('%', '')),
    quantidade: item.quantidade,
    status: item.status
  }));

  const totalDisponibilidade = '100,0%';

  // Componentes
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Paper sx={{
          padding: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          boxShadow: 3,
          border: '1px solid #ddd',
          minWidth: 200
        }}>
          <Typography variant="subtitle2" color="text.primary" gutterBottom>
            <strong>{data.name}</strong>
          </Typography>
          <Typography variant="body2">
            Disponibilidade: <strong>{data.value}%</strong>
          </Typography>
          <Typography variant="body2">
            Quantidade: <strong>{data.quantidade}</strong>
          </Typography>
          <Typography variant="body2">
            Status: <strong>{data.status}</strong>
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Período: {timeRange}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Sidebar - Menu Lateral */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#f8f9fa',
            borderRight: '1px solid #e0e0e0',
            marginTop: '79px',
            height: 'calc(100vh - 64px)'
          },
          ...(!isMobile && !sidebarOpen && {
            width: 56,
            [`& .MuiDrawer-paper`]: {
              width: 56,
              overflowX: 'hidden',
              marginTop: '64px',
              height: 'calc(100vh - 64px)'
            }
          })
        }}
      >
        {/* Logo OPTLINK - versão compacta */}
        <Box sx={{
          p: 2, // Reduzi o padding
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #e0e0e0',
          height: '64px' // Altura fixa
        }}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            OPTLINK
          </Typography>
        </Box>

        {/* Menu Empresa - versão compacta */}
        <List component="nav" sx={{
          py: 0,
          flexGrow: 1,
          '& .MuiListItemButton-root': { // Estilo compacto para os itens
            minHeight: '48px',
            paddingTop: '6px',
            paddingBottom: '6px'
          },
          '& .MuiListItemIcon-root': { // Ícones menores
            minWidth: '36px'
          }
        }}>
          <ListItem disablePadding>
            <MenuItemButton
              onClick={() => handleToggle('relatorios')}
              selected={expanded.relatorios}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <RelatoriosIcon fontSize="small" />
              </ListItemIcon>
              {sidebarOpen && (
                <>
                  <ListItemText
                    primary="Empresa"
                    primaryTypographyProps={{
                      fontWeight: 'medium',
                      fontSize: '0.9rem' // Texto mais compacto
                    }}
                  />
                  {expanded.relatorios ? <ExpandLess /> : <ExpandMore />}
                </>
              )}
            </MenuItemButton>
          </ListItem>

          <Collapse in={expanded.relatorios && sidebarOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ bgcolor: '#fff' }}>
              {['Unidade 1', 'Unidade 2', 'Unidade 3'].map((text) => (
                <ListItem
                  key={text}
                  disablePadding
                  sx={{
                    bgcolor: selectedItem === text ? 'action.selected' : 'inherit',
                    borderLeft: selectedItem === text ? '4px solid primary.main' : 'none'
                  }}
                >
                  <MuiTooltip title={!sidebarOpen ? text : ''} placement="right">
                    <MenuItemButton
                      onClick={() => handleItemClick(text)}
                      selected={selectedItem === text}
                      sx={{
                        pl: 4, // Padding menor
                        minHeight: '40px' // Altura reduzida
                      }}
                    >
                      {sidebarOpen && (
                        <>
                          <ListItemText
                            primary={text}
                            primaryTypographyProps={{
                              fontSize: '0.8rem', // Texto menor
                              fontWeight: selectedItem === text ? '500' : '400'
                            }}
                          />
                          {selectedItem === text && <SetaDireitaIcon fontSize="small" />}
                        </>
                      )}
                    </MenuItemButton>
                  </MuiTooltip>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>

        {/* Rodapé compacto */}
        <Box sx={{
          p: 1, // Padding reduzido
          textAlign: 'center',
          color: 'text.secondary',
          fontSize: '0.7rem', // Texto menor
          borderTop: '1px solid #e0e0e0'
        }}>
          <Typography variant="caption">
            Passe o mouse sobre os ícones para ver descrições
          </Typography>
        </Box>
      </Drawer>
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${sidebarOpen ? 240 : 56}px)`,
          marginLeft: `${sidebarOpen ? 20 : 20}px`,
          transition: (theme) => theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          ...(isMobile && {
            width: '100%',
            marginLeft: 0,
          })
        }}
      >
        {/* Filtros */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ mb: 3 }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
        >
          <ToggleButtonGroup
            value={timeRange}
            exclusive
            onChange={handleTimeRangeChange}
            size="small"
          >
            <ToggleButton value="24H">24H</ToggleButton>
            <ToggleButton value="7D">7D</ToggleButton>
            <ToggleButton value="30D">30D</ToggleButton>
          </ToggleButtonGroup>

          <Select
            value={viewMode}
            onChange={handleViewModeChange}
            size="small"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="table" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TableChart fontSize="small" /> Tabela
            </MenuItem>
            <MenuItem value="pie" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PieChartIcon fontSize="small" /> Pizza
            </MenuItem>
          </Select>

          <Button
            variant="contained"
            startIcon={<Download />}
            sx={{ whiteSpace: 'nowrap' }}
          >
            DOWNLOAD CSV
          </Button>
        </Stack>

        {/* Conteúdo */}
        {viewMode === 'table' ? (
          <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell colSpan={3} sx={{ fontWeight: 'bold' }}>
                    Empresa XYZ
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Ativo</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tempo Disponível</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Quantidade de Ativos</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {disponibilidadeData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.ativo}</TableCell>
                    <TableCell>
                      <Chip
                        label={item.tempoDisponivel}
                        color={item.tempoDisponivel === '100%' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{item.quantidade}</TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                  <TableCell>
                    <Chip
                      label={totalDisponibilidade}
                      color="success"
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>7</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Paper sx={{ p: 3, height: { xs: '300px', sm: '400px', md: '500px' } }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Distribuição da Disponibilidade por Ativo
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={500}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  formatter={(value, entry, index) => (
                    <span style={{ fontSize: '14px', color: '#333' }}>
                      {value} - {pieData[index].value}%
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default Reports;