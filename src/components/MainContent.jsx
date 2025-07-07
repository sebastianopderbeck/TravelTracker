import React from 'react';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import TravelHistory from './history/TravelHistory';
import TravelDashboard from './travels/TravelDashboard';
import FlightSearch from './flights/FlightSearch';
import TravelWish from './travels/TravelWish';
import WorldMap from './worldmap/WorldMap';
import { useGetTravelsQuery } from '../services/travelApi';
import { useGetWishesQuery } from '../services/wishApi';

const MainContent = ({ activeSection }) => {
  const { data: travels = [], isLoading: isLoadingTravels } = useGetTravelsQuery();
  const { data: wishes = [], isLoading: isLoadingWishes } = useGetWishesQuery();
  
  const isLoading = isLoadingTravels || isLoadingWishes;

  const renderContent = () => {
    switch (activeSection) {
      case 'history':
        return (
          <Box>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                mb: 3,
                color: 'primary.main',
                textAlign: 'center',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 100,
                  height: 4,
                  backgroundColor: 'primary.main',
                  borderRadius: 2,
                },
              }}
            >
              Historial de Viajes
            </Typography>
            <TravelHistory />
          </Box>
        );
      
      case 'dashboard':
        return (
          <Box>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                mb: 3,
                color: 'primary.main',
                textAlign: 'center',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 100,
                  height: 4,
                  backgroundColor: 'primary.main',
                  borderRadius: 2,
                },
              }}
            >
              Dashboard
            </Typography>
            <TravelDashboard />
          </Box>
        );
      
      case 'search':
        return (
          <Box>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                mb: 3,
                color: 'primary.main',
                textAlign: 'center',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 100,
                  height: 4,
                  backgroundColor: 'primary.main',
                  borderRadius: 2,
                },
              }}
            >
              Buscar Vuelos
            </Typography>
            <FlightSearch />
          </Box>
        );
      
      case 'wishes':
        return (
          <Box>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                mb: 3,
                color: 'primary.main',
                textAlign: 'center',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 100,
                  height: 4,
                  backgroundColor: 'primary.main',
                  borderRadius: 2,
                },
              }}
            >
              Lista de Deseos
            </Typography>
            <TravelWish />
          </Box>
        );
      
      case 'worldmap':
        return (
          <Box>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                mb: 3,
                color: 'primary.main',
                textAlign: 'center',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 100,
                  height: 4,
                  backgroundColor: 'primary.main',
                  borderRadius: 2,
                },
              }}
            >
              Mapa Mundial
            </Typography>
            <WorldMap />
          </Box>
        );
      
      default:
        return (
          <Box>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                mb: 3,
                color: 'primary.main',
                textAlign: 'center',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 100,
                  height: 4,
                  backgroundColor: 'primary.main',
                  borderRadius: 2,
                },
              }}
            >
              Historial de Viajes
            </Typography>
            <TravelHistory />
          </Box>
        );
    }
  };

  if (isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="400px"
        sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 2,
          m: 3
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: 2,
        width: '100%',
        height: '100%',
        minHeight: 0,
        minWidth: 0,
        overflow: 'auto',
        p: { xs: 1, md: 3 },
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        m: 0
      }}
    >
      {renderContent()}
    </Paper>
  );
};

export default MainContent; 