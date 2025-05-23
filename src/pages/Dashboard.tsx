import React, { useState } from 'react';
import { Typography, Box, Paper, Button, IconButton, TextField, Collapse } from '@mui/material';
import { Bell, MessageCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SunburstChart from '../components/SunburstChart';
import SunburstLegend from '../components/SunburstLegend';

// Tipos e interfaces
interface NotificationCardProps {
  title: string;
  code: string;
  firstOccurrence: string;
  lastOccurrence: string;
  onDismiss: () => void;
}

interface SidebarProps {
  open: boolean;
  notificationsOpen: boolean;
  toggleNotifications: () => void;
  dismissNotification: (id: number) => void;
}

interface HistoricoData {
  name: string;
  value: number;
}

// Paleta de Cores
const colors = {
  background: '#F8F9FA',
  sidebar: '#F5F5F5',
  textPrimary: '#4F4F4F',
  textSecondary: '#6D8B74',
  highlight: '#C4A77D',
  alert: '#B85442',
  accent: '#E2B866',
  border: '#E3E3E3',
  section: '#EDE0D4',
};

// Estilos Reutilizáveis
const cardStyles = {
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  padding: '20px',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
  }
};

// Componente de Notificação
const NotificationCard: React.FC<NotificationCardProps> = ({ 
  title, 
  code, 
  firstOccurrence, 
  lastOccurrence, 
  onDismiss 
}) => (
  <Paper sx={{ 
    ...cardStyles,
    position: 'relative',
    borderLeft: `4px solid ${colors.alert}`,
    mb: 2,
    backgroundColor: colors.background
  }}>
    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
      <Box>
        <Typography variant="caption" color={colors.textSecondary} sx={{ fontWeight: 600 }}>
          ÁREA | SUBÁREA
        </Typography>
        <Typography variant="h6" sx={{ 
          fontWeight: 600, 
          color: colors.textPrimary,
          mt: 0.5
        }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ 
          color: colors.highlight,
          fontFamily: 'monospace',
          mt: 0.5
        }}>
          {code}
        </Typography>
      </Box>
      <Box>
        <IconButton size="small" sx={{ color: colors.textSecondary }}>
          <MessageCircle size={18} />
        </IconButton>
        <IconButton size="small" sx={{ color: colors.alert }} onClick={onDismiss}>
          <X size={18} />
        </IconButton>
      </Box>
    </Box>

    <Box sx={{ mt: 1.5, display: 'flex', gap: 2 }}>
      <Typography variant="caption" sx={{ 
        display: 'flex',
        alignItems: 'center',
        color: colors.textPrimary
      }}>
        <span style={{ marginRight: '4px' }}>📅</span> 
        {firstOccurrence}
      </Typography>
      <Typography variant="caption" sx={{ 
        display: 'flex',
        alignItems: 'center',
        color: colors.textPrimary
      }}>
        <span style={{ marginRight: '4px' }}>🔄</span>
        {lastOccurrence}
      </Typography>
    </Box>
  </Paper>
);

// Componente Sidebar
const Sidebar: React.FC<SidebarProps> = ({ 
  open, 
  notificationsOpen, 
  toggleNotifications, 
  dismissNotification 
}) => {
  const notifications = [
    {
      id: 1,
      title: "Equipamento | Ativo",
      code: "Código 1: Em Alarme – SDAG",
      firstOccurrence: "01/01/2022 00:00",
      lastOccurrence: "02/01/2022 01:00"
    },
    {
      id: 2,
      title: "Sensor | Desativado",
      code: "Código 2: Falha de Comunicação",
      firstOccurrence: "02/01/2022 10:30",
      lastOccurrence: "02/01/2022 11:15"
    }
  ];

  return (
    <Box sx={{
      width: open ? '320px' : '0',
      backgroundColor: colors.sidebar,
      borderRight: `1px solid ${colors.border}`,
      padding: open ? '24px' : '0',
      paddingTop: '80px',
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      overflowY: 'auto',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 10,
      visibility: open ? 'visible' : 'hidden'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ 
          color: colors.textPrimary,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <Bell size={20} color={colors.alert} />
          Notificações
        </Typography>
        <IconButton onClick={toggleNotifications} size="small">
          {notificationsOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </IconButton>
      </Box>

      <Collapse in={notificationsOpen}>
        <TextField 
          fullWidth 
          placeholder="Pesquisar..." 
          size="small" 
          sx={{ 
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: colors.background
            }
          }} 
        />

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {notifications.map(notification => (
            <NotificationCard 
              key={notification.id}
              title={notification.title}
              code={notification.code}
              firstOccurrence={notification.firstOccurrence}
              lastOccurrence={notification.lastOccurrence}
              onDismiss={() => dismissNotification(notification.id)}
            />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

// Componente Principal Dashboard
const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(true);
  const [mostrarHistorico, setMostrarHistorico] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<number[]>([1, 2]);
  const [saudeSelecionada, setSaudeSelecionada] = useState<{ name?: string; value?: number }>({ name: 'Empresa', value: 82.9 });

  const historicoData: HistoricoData[] = [
    { name: 'Jan', value: 4000 },
    { name: 'Fev', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Abr', value: 2780 },
    { name: 'Mai', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
  ];

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(notificationId => notificationId !== id));
  };

  const handleNodeClick = (params: any) => {
    setSaudeSelecionada({
      name: params.data?.name || 'Empresa',
      value: params.data?.value
    });
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      position: 'relative',
      backgroundColor: colors.background 
    }}>
      <Sidebar 
        open={sidebarOpen}
        notificationsOpen={notificationsOpen}
        toggleNotifications={() => setNotificationsOpen(!notificationsOpen)}
        dismissNotification={dismissNotification}
      />

      <IconButton 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        sx={{
          position: 'fixed',
          left: sidebarOpen ? 300 : 12,
          top: '50%',
          zIndex: 1200,
          backgroundColor: colors.section,
          borderRadius: '0 8px 8px 0',
          boxShadow: 2,
          transition: 'left 0.3s ease',
          '&:hover': {
            backgroundColor: colors.border
          }
        }}
      >
        {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>

      <Box component="main" sx={{ 
        flexGrow: 1,
        p: 3,
        pt: '80px',
        ml: sidebarOpen ? '320px' : 0,
        transition: 'margin-left 0.3s ease',
        width: '100%',
        maxWidth: sidebarOpen ? 'calc(100% - 320px)' : '100%'
      }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 600,
            color: colors.textPrimary
          }}>
            Dashboard Corporativo
          </Typography>
        </Box>

        {/* Seção Saúde da Empresa */}
        <Paper sx={cardStyles}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}>
            <Typography variant="h5" sx={{ 
              color: colors.textPrimary,
              fontWeight: 600
            }}>
              Saúde da Empresa
            </Typography>
          </Box>

          {/* Sunburst e legenda lado a lado */}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <SunburstChart />
            </Box>
            <SunburstLegend />
          </Box>

          {/* Saúde do nível selecionado */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box sx={{ minWidth: 180, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="subtitle2">Saúde do nível selecionado:</Typography>
              <Typography variant="h6">
                {saudeSelecionada && saudeSelecionada.value !== undefined ? `${saudeSelecionada.value}%` : 'Selecione um nível'}
              </Typography>
            </Box>
          </Box>

          {/* Botão de histórico centralizado abaixo do gráfico */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button 
              variant="contained"
              onClick={() => setMostrarHistorico(!mostrarHistorico)}
              sx={{
                backgroundColor: mostrarHistorico ? colors.alert : colors.textSecondary,
                color: 'white',
                borderRadius: '8px',
                textTransform: 'none',
                px: 3,
                '&:hover': {
                  backgroundColor: mostrarHistorico ? '#9a3c2f' : '#5c7a63'
                }
              }}
            >
              {mostrarHistorico ? 'Ocultar Histórico' : 'Visualizar Histórico'}
            </Button>
          </Box>

          {/* Histórico só aparece se mostrarHistorico for true */}
          {mostrarHistorico && (
            <Box sx={{ height: '300px', mt: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicoData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: colors.textPrimary }}
                    axisLine={{ stroke: colors.border }}
                  />
                  <YAxis 
                    tick={{ fill: colors.textPrimary }}
                    axisLine={{ stroke: colors.border }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={colors.textSecondary} 
                    fill={colors.section}
                    fillOpacity={0.8}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;