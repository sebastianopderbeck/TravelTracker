import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { useGetTravelStatsQuery } from '../../services/travelApi';
import FlightIcon from '@mui/icons-material/Flight';
import PublicIcon from '@mui/icons-material/Public';
import ExploreIcon from '@mui/icons-material/Explore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import AnimatedNumber from '../animations/AnimatedNumber';

const emptyTop = keyframes`
  0% { height: 50%; }
  50% { height: 0%; }
  100% { height: 50%; }
`;

const fillBottom = keyframes`
  0% { height: 0%; }
  50% { height: 50%; }
  100% { height: 0%; }
`;

const stream = keyframes`
  0% { height: 0%; opacity: 0; }
  25% { height: 30%; opacity: 1; }
  50% { height: 50%; opacity: 1; }
  75% { height: 30%; opacity: 1; }
  100% { height: 0%; opacity: 0; }
`;

const HourglassWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  margin-right: 16px;
`;

const HourglassBody = styled('div')`
  position: relative;
  width: 20px;
  height: 40px;
  border-left: 2px solid #1976d2;
  border-right: 2px solid #1976d2;
  clip-path: polygon(
    0% 0%, 100% 0%,
    100% 20%, 60% 50%,
    100% 80%, 100% 100%,
    0% 100%, 0% 80%,
    40% 50%, 0% 20%
  );
  background: transparent;
  overflow: hidden;
`;

const Sand = styled('div')`
  position: absolute;
  left: 0;
  width: 100%;
  background-color: rgba(25, 118, 210, 0.8);
  z-index: 1;
`;

const SandTop = styled(Sand)`
  top: 0;
  height: 50%;
  animation: ${emptyTop} 2s infinite;
  transform-origin: bottom;
`;

const SandBottom = styled(Sand)`
  bottom: 0;
  height: 0%;
  animation: ${fillBottom} 2s infinite;
  transform-origin: top;
`;

const SandStream = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 0%;
  background-color: rgba(25, 118, 210, 0.8);
  transform: translateX(-50%);
  animation: ${stream} 2s infinite;
  z-index: 2;
`;

const AnimatedHourglass = () => (
  <HourglassWrapper>
    <HourglassBody>
      <SandTop />
      <SandStream />
      <SandBottom />
    </HourglassBody>
  </HourglassWrapper>
);

const StatCard = ({ title, value, icon, color, isAnimated = false, isClock = false }) => (
  <Paper
    elevation={2}
    sx={{
      p: 3,
      mb: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: 2,
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
      },
      '&::before': isAnimated ? {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        animation: 'shimmer 2s infinite',
        '@keyframes shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      } : {},
    }}
  >
    <Box
      sx={{
        color: color,
        mb: 2,
        '& .MuiSvgIcon-root': {
          fontSize: '2.5rem',
        },
      }}
    >
      {isClock ? <AccessTimeIcon /> : icon}
    </Box>
    {isAnimated ? (
      <AnimatedNumber value={value} />
    ) : (
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
        {value}
      </Typography>
    )}
    <Typography variant="subtitle1" color="text.secondary">
      {title}
    </Typography>
  </Paper>
);

const TravelDashboard = () => {
  const { data: stats, isLoading, error } = useGetTravelStatsQuery();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Typography color="error">Error al cargar las estadísticas</Typography>
      </Box>
    );
  }

  const totalDistance = stats?.totalDistance || 0;
  const totalFlights = stats?.totalFlights || 0;
  const uniqueCities = stats?.uniqueCitiesCount || 0;
  const totalFlightHours = stats?.totalFlightHours || 0;

  return (
    <Box>

      
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FlightIcon color="primary" sx={{ mr: 2 }} />
          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              Total de Viajes
            </Typography>
            <AnimatedNumber value={totalFlights} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PublicIcon color="primary" sx={{ mr: 2 }} />
          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              Ciudades Visitadas
            </Typography>
            <AnimatedNumber value={uniqueCities} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ExploreIcon color="primary" sx={{ mr: 2 }} />
          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              Distancia Total Recorrida
            </Typography>
            <AnimatedNumber value={totalDistance} unit="km" />
          </Box>
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AccessTimeIcon color="primary" sx={{ mr: 2 }} />
          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              Horas de Vuelo
            </Typography>
            <AnimatedNumber value={totalFlightHours} unit="hs" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TravelDashboard; 