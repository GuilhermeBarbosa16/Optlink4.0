import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Paper,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { LayoutDashboard, Bell, FileText, Users, LogOut } from 'lucide-react';
import Logo from '../assets/logo2.png'

// Definindo o tema com as cores
const theme = createTheme({
  palette: {
    background: {
      default: '#F8F9FA', // Branco Neve
    },
    primary: {
      main: '#6D8B74', // Verde Sálvia
    },
    secondary: {
      main: '#C4A77D', // Dourado Suave
    },
    error: {
      main: '#B85442', // Terracota
    },
    warning: {
      main: '#E2B866', // Âmbar Neutro
    },
    text: {
      primary: '#4F4F4F', // Cinza Grafite
    },
  },
});

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  if (isLoginPage) {
    return <Outlet />;
  }

  const navItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { text: 'Notificações', path: '/notifications', icon: <Bell size={20} /> },
    { text: 'Relatórios', path: '/reports', icon: <FileText size={20} /> },
    { text: 'Análise Cooperativa', path: '/cooperative', icon: <Users size={20} /> },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography component="div" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <img src={Logo} alt="Logo" style={{ width: '50px', height: 'auto' }} />
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1, gap: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  color="inherit"
                  startIcon={item.icon}
                  onClick={() => navigate(item.path)}
                  sx={{
                    textTransform: 'none',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                  }}
                >
                  {item.text}
                </Button>
              ))}
              <Button
                color="inherit"
                startIcon={<LogOut size={20} />}
                onClick={() => navigate('/')}
                sx={{
                  textTransform: 'none',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                Sair
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            mt: '64px',
            minHeight: 'calc(100vh - 64px)',
            py: 4,
          }}
        >
          <Container maxWidth="lg">
            <Paper elevation={3} sx={{ p: 3, bgcolor: '#E3E3E3' }}>
              <Outlet />
            </Paper>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;