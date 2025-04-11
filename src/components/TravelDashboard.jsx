import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { useGetTravelStatsQuery } from '../services/travelApi';
import FlightIcon from '@mui/icons-material/Flight';
import SpeedIcon from '@mui/icons-material/Speed';
import PublicIcon from '@mui/icons-material/Public';
import ExploreIcon from '@mui/icons-material/Explore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import styled from '@emotion/styled';

const ClockIcon = styled(AccessTimeIcon)`
  animation: rotate 2s linear infinite;
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const AnimatedNumber = ({ value, duration = 2000, unit = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value && !isAnimating) {
      setIsAnimating(true);
      const startTime = Date.now();
      const endTime = startTime + duration;
      const startValue = 0;

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const currentValue = Math.floor(startValue + (value - startValue) * progress);
        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };

      animate();
    }
  }, [value, duration]);

  return (
    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
      {displayValue.toLocaleString()} {unit}
    </Typography>
  );
};

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
      {isClock ? <ClockIcon /> : icon}
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
  const averageDistance = stats?.averageDistance || 0;
  const totalFlights = stats?.totalFlights || 0;
  const uniqueCities = stats?.uniqueCitiesCount || 0;
  const totalFlightHours = stats?.totalFlightHours || 0;

  return (
    <Box>
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          fontWeight: 600,
          mb: 3,
          color: 'primary.main',
          position: 'relative',
          textAlign: 'center',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 50,
            height: 3,
            backgroundColor: 'primary.main',
            borderRadius: 1,
          },
        }}
      >
        Estadísticas de Viajes
      </Typography>
      
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
          <ClockIcon color="primary" sx={{ mr: 2 }} />
          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              Horas de Vuelo
            </Typography>
            <AnimatedNumber value={totalFlightHours} unit="h" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TravelDashboard; 