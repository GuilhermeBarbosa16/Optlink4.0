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
      width: { xs: '100%', md: open ? '320px' : '0' },
      backgroundColor: colors.sidebar,
      borderRight: `1px solid ${colors.border}`,
      padding: open ? { xs: '16px', md: '24px' } : '0',
      paddingTop: { xs: '80px', md: '100px' },
      position: { xs: 'fixed', md: 'fixed' },
      top: 0,
      left: 0,
      bottom: 0,
      overflowY: 'auto',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 1200,
      visibility: open ? 'visible' : 'hidden',
      transform: { xs: open ? 'translateX(0)' : 'translateX(-100%)', md: 'none' }
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: { xs: 2, md: 3 } 
      }}>
        <Typography variant="h6" sx={{ 
          color: colors.textPrimary,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontSize: { xs: '1rem', md: '1.25rem' }
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
            mb: { xs: 2, md: 3 },
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: colors.background
            }
          }} 
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, md: 2 } }}>
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
      flexDirection: { xs: 'column', md: 'row' },
      minHeight: '100vh',
      position: 'relative',
      backgroundColor: colors.background,
      overflow: 'hidden'
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
          left: { xs: '16px', md: sidebarOpen ? '320px' : '12px' },
          top: { xs: '80px', md: '100px' },
          transform: { xs: 'none', md: 'none' },
          zIndex: 1300,
          backgroundColor: colors.section,
          borderRadius: { xs: '8px', md: '0 8px 8px 0' },
          boxShadow: 2,
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: colors.border
          }
        }}
      >
        {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>

      <Box component="main" sx={{ 
        flexGrow: 1,
        p: { xs: 1, sm: 2, md: 3 },
        pt: { xs: '100px', md: '100px' },
        ml: { xs: 0, md: sidebarOpen ? '320px' : 0 },
        transition: 'all 0.3s ease',
        width: '100%',
        maxWidth: { xs: '100%', md: sidebarOpen ? 'calc(100% - 320px)' : '100%' },
        overflow: 'auto'
      }}>
        <Box sx={{ mb: { xs: 2, md: 4 } }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 600,
            color: colors.textPrimary,
            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2.125rem' }
          }}>
            Dashboard Corporativo
          </Typography>
        </Box>

        {/* Seção Saúde da Empresa */}
        <Paper sx={{
          ...cardStyles,
          overflow: 'hidden',
          p: { xs: 1, sm: 2, md: 3 }
        }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: { xs: 2, md: 3 }
          }}>
            <Typography variant="h5" sx={{ 
              color: colors.textPrimary,
              fontWeight: 600,
              fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }
            }}>
              Saúde da Empresa
            </Typography>
          </Box>

          {/* Sunburst e legenda lado a lado */}
          <Box sx={{ 
            width: '100%', 
            display: 'flex', 
            flexDirection: { xs: 'column', lg: 'row' },
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: { xs: 2, md: 4 },
            mb: { xs: 2, md: 4 }
          }}>
            <Box sx={{ 
              flex: 1, 
              minWidth: 0,
              width: '100%',
              height: { xs: '300px', sm: '400px', md: '500px', lg: '600px' },
              position: 'relative',
              '& .recharts-wrapper': {
                width: '100% !important',
                height: '100% !important'
              }
            }}>
              <SunburstChart />
            </Box>
            <Box sx={{ 
              width: { xs: '100%', lg: 'auto' },
              minWidth: { lg: '250px' },
              maxWidth: { xs: '100%', lg: '300px' },
              order: { xs: -1, lg: 0 }
            }}>
              <SunburstLegend />
            </Box>
          </Box>

          {/* Saúde do nível selecionado */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: { xs: 2, md: 4 },
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Box sx={{ 
              minWidth: { xs: '100%', sm: '180px' }, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              textAlign: 'center',
              p: { xs: 1, md: 2 },
              backgroundColor: colors.background,
              borderRadius: '8px'
            }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Saúde do nível selecionado:</Typography>
              <Typography variant="h6" sx={{ 
                fontSize: { xs: '1.1rem', md: '1.5rem' },
                color: colors.textSecondary
              }}>
                {saudeSelecionada && saudeSelecionada.value !== undefined ? `${saudeSelecionada.value}%` : 'Selecione um nível'}
              </Typography>
            </Box>
          </Box>

          {/* Botão de histórico centralizado abaixo do gráfico */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: { xs: 2, md: 4 },
            width: '100%'
          }}>
            <Button 
              variant="contained"
              onClick={() => setMostrarHistorico(!mostrarHistorico)}
              sx={{
                backgroundColor: mostrarHistorico ? colors.alert : colors.textSecondary,
                color: 'white',
                borderRadius: '8px',
                textTransform: 'none',
                px: { xs: 2, md: 3 },
                py: { xs: 1, md: 1.5 },
                width: { xs: '100%', sm: 'auto' },
                minWidth: { xs: 'auto', sm: '200px' },
                fontSize: { xs: '0.875rem', md: '1rem' },
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
            <Box sx={{ 
              mt: { xs: 2, md: 4 },
              width: '100%',
              position: 'relative',
              overflowX: 'auto',
              '&::-webkit-scrollbar': {
                height: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: colors.background,
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: colors.border,
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: colors.textSecondary,
                },
              },
            }}>
              <Box sx={{ 
                minWidth: '800px', // Largura mínima para garantir boa visualização
                height: { xs: '250px', sm: '300px', md: '400px' },
                position: 'relative',
                '& .recharts-wrapper': {
                  width: '100% !important',
                  height: '100% !important'
                }
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historicoData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: colors.textPrimary, fontSize: 12 }}
                      axisLine={{ stroke: colors.border }}
                      height={40}
                      tickMargin={10}
                    />
                    <YAxis 
                      tick={{ fill: colors.textPrimary, fontSize: 12 }}
                      axisLine={{ stroke: colors.border }}
                      width={40}
                      tickMargin={10}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                        borderRadius: '8px',
                        fontSize: '0.875rem'
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
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;