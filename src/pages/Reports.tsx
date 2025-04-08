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

// Constantes para largura do drawer
const drawerWidth = 240;
const drawerCollapsedWidth = 56;

const Reports: React.FC = () => {
  // Estados
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'pie'>('table');
  const [timeRange, setTimeRange] = useState('24H');
  const [expanded, setExpanded] = useState<ExpandedState>({
    relatorios: true
  });
  const [selectedItem, setSelectedItem] = useState('Disponibilidade Física');
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  // Handler para toggle do menu mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
    if (isMobile) setMobileOpen(false);
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

  // Componente Tooltip personalizado
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
        open={isMobile ? mobileOpen : sidebarOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Melhor para mobile
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f8f9fa',
            borderRight: '1px solid #e0e0e0',
            marginTop: '79px',
            height: 'calc(100vh - 79px)'
          },
          ...(!isMobile && !sidebarOpen && {
            width: drawerCollapsedWidth,
            [`& .MuiDrawer-paper`]: {
              width: drawerCollapsedWidth,
              overflowX: 'hidden',
              marginTop: '79px',
              height: 'calc(100vh - 79px)'
            }
          }),
          ...(isMobile && {
            '& .MuiBackdrop-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
          })
        }}
      >
        {/* Logo OPTLINK - versão compacta */}
        <Box sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #e0e0e0',
          height: '64px'
        }}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            OPTLINK
          </Typography>
        </Box>

        {/* Menu Empresa - versão compacta */}
        <List component="nav" sx={{
          py: 0,
          flexGrow: 1,
          '& .MuiListItemButton-root': {
            minHeight: '48px',
            paddingTop: '6px',
            paddingBottom: '6px'
          },
          '& .MuiListItemIcon-root': {
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
              {(!isMobile || mobileOpen) && (
                <>
                  <ListItemText
                    primary="Empresa"
                    primaryTypographyProps={{
                      fontWeight: 'medium',
                      fontSize: '0.9rem'
                    }}
                  />
                  {expanded.relatorios ? <ExpandLess /> : <ExpandMore />}
                </>
              )}
            </MenuItemButton>
          </ListItem>

          <Collapse in={expanded.relatorios && (!isMobile || mobileOpen)} timeout="auto" unmountOnExit>
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
                  <MuiTooltip title={(!sidebarOpen && !isMobile) ? text : ''} placement="right">
                    <MenuItemButton
                      onClick={() => handleItemClick(text)}
                      selected={selectedItem === text}
                      sx={{
                        pl: 4,
                        minHeight: '40px'
                      }}
                    >
                      {(!isMobile || mobileOpen) && (
                        <>
                          <ListItemText
                            primary={text}
                            primaryTypographyProps={{
                              fontSize: '0.8rem',
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
        {(!isMobile || mobileOpen) && (
          <Box sx={{
            p: 1,
            textAlign: 'center',
            color: 'text.secondary',
            fontSize: '0.7rem',
            borderTop: '1px solid #e0e0e0'
          }}>
            <Typography variant="caption">
              Passe o mouse sobre os ícones para ver descrições
            </Typography>
          </Box>
        )}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: isMobile ? 2 : 3,
          width: {
            xs: '100%', // Mobile: ocupa toda largura
            sm: `calc(100% - ${drawerCollapsedWidth}px)`, // Tablet: desconta menu recolhido
            md: `calc(100% - ${sidebarOpen ? drawerWidth : drawerCollapsedWidth}px)` // Desktop: ajusta conforme menu
          },
          marginTop: '79px', // Fixo conforme solicitado
          transition: (theme) => theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {/* Título da Página */}
        {isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6">
              {selectedItem}
            </Typography>
          </Box>
        )}

        {/* Filtros */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ mb: 3 }}
          alignItems={{ xs: 'stretch', sm: 'center' }}
        >
          <ToggleButtonGroup
            value={timeRange}
            exclusive
            onChange={handleTimeRangeChange}
            size="small"
            fullWidth={isMobile}
          >
            <ToggleButton value="24H" sx={{ flex: isMobile ? 1 : 'inherit' }}>24H</ToggleButton>
            <ToggleButton value="7D" sx={{ flex: isMobile ? 1 : 'inherit' }}>7D</ToggleButton>
            <ToggleButton value="30D" sx={{ flex: isMobile ? 1 : 'inherit' }}>30D</ToggleButton>
          </ToggleButtonGroup>

          <Select
            value={viewMode}
            onChange={handleViewModeChange}
            size="small"
            sx={{ minWidth: 120 }}
            fullWidth={isMobile}
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
            fullWidth={isMobile}
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