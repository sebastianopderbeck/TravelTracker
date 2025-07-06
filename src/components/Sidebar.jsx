import React from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography,
  Divider,
  Paper
} from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';

const drawerWidth = 280;

const menuItems = [
  { 
    text: 'Historial de Viajes', 
    icon: <HistoryIcon />, 
    value: 'history' 
  },
  { 
    text: 'Dashboard', 
    icon: <DashboardIcon />, 
    value: 'dashboard' 
  },
  { 
    text: 'Buscar Vuelos', 
    icon: <SearchIcon />, 
    value: 'search' 
  },
  { 
    text: 'Lista de Deseos', 
    icon: <FavoriteIcon />, 
    value: 'wishes' 
  },
];

const Sidebar = ({ activeSection, onSectionChange }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: { xs: '100%', md: drawerWidth },
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: { xs: '100%', md: drawerWidth },
          boxSizing: 'border-box',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRight: { xs: 'none', md: '1px solid rgba(0, 0, 0, 0.12)' },
          borderBottom: { xs: '1px solid rgba(0, 0, 0, 0.12)', md: 'none' },
        },
      }}
    >
      <Box sx={{ p: { xs: 1, md: 3 } }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'row', md: 'column' },
          alignItems: 'center', 
          mb: { xs: 1, md: 3 },
          justifyContent: { xs: 'space-around', md: 'flex-start' }
        }}>
          <FlightIcon sx={{ fontSize: { xs: 24, md: 32 }, color: 'primary.main', mr: { xs: 0, md: 2 } }} />
          <Typography 
            variant="h5" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              color: 'primary.main',
              display: { xs: 'none', md: 'block' }
            }}
          >
            Travel Tracker
          </Typography>
        </Box>
        
        <Divider sx={{ mb: { xs: 1, md: 2 }, display: { xs: 'none', md: 'block' } }} />
        
        <List sx={{ 
          display: { xs: 'flex', md: 'block' },
          flexDirection: { xs: 'row', md: 'column' },
          gap: { xs: 1, md: 0 }
        }}>
          {menuItems.map((item) => (
            <ListItem key={item.value} disablePadding sx={{ 
              mb: { xs: 0, md: 1 },
              width: { xs: 'auto', md: '100%' }
            }}>
              <ListItemButton
                onClick={() => onSectionChange(item.value)}
                selected={activeSection === item.value}
                sx={{
                  borderRadius: 2,
                  minWidth: { xs: 'auto', md: '100%' },
                  px: { xs: 1, md: 2 },
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  },
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: { xs: 32, md: 40 },
                  mr: { xs: 0, md: 1 }
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontWeight: activeSection === item.value ? 600 : 400,
                    fontSize: { xs: '0.75rem', md: '1rem' }
                  }}
                  sx={{ display: { xs: 'none', md: 'block' } }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar; 