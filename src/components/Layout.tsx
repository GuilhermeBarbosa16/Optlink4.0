import React, { useState } from 'react';
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
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { LayoutDashboard, Bell, FileText, Users, LogOut } from 'lucide-react';
import Logo from '../assets/logo2.png';

const theme = createTheme({
  palette: {
    background: {
      default: '#F8F9FA',
    },
    primary: {
      main: '#6D8B74',
    },
    secondary: {
      main: '#C4A77D',
    },
    error: {
      main: '#B85442',
    },
    warning: {
      main: '#E2B866',
    },
    text: {
      primary: '#4F4F4F',
    },
  },
});

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (isLoginPage) return <Outlet />;

  const navItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { text: 'Notificações', path: '/notifications', icon: <Bell size={20} /> },
    { text: 'Relatórios', path: '/reports', icon: <FileText size={20} /> },
    { text: 'Análise Cooperativa', path: '/cooperative', icon: <Users size={20} /> },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false); // fecha o menu ao clicar
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="fixed">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={Logo} alt="Logo" style={{ width: '80px', height: 'auto' }} />
            </Box>

            {isMobile ? (
              <>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={() => setDrawerOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
                <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                  <List sx={{ width: 250 }}>
                    {navItems.map((item) => (
                      <ListItem key={item.path} disablePadding>
                        <ListItemButton onClick={() => handleNavigation(item.path)}>
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => handleNavigation('/')}>
                        <ListItemIcon><LogOut size={20} /></ListItemIcon>
                        <ListItemText primary="Sair" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Drawer>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    color="inherit"
                    startIcon={item.icon}
                    onClick={() => navigate(item.path)}
                    sx={{ textTransform: 'none' }}
                  >
                    {item.text}
                  </Button>
                ))}
                <Button
                  color="inherit"
                  startIcon={<LogOut size={20} />}
                  onClick={() => navigate('/')}
                  sx={{ textTransform: 'none' }}
                >
                  Sair
                </Button>
              </Box>
            )}
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
