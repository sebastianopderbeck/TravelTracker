import React from 'react';
import { Box, Paper, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import { useGetTravelStatsQuery } from '../services/travelApi';
import FlightIcon from '@mui/icons-material/Flight';
import PublicIcon from '@mui/icons-material/Public';
import SpeedIcon from '@mui/icons-material/Speed';
import TimerIcon from '@mui/icons-material/Timer';

const StatCard = ({ title, value, icon, color }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 2,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
      },
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
      {icon}
    </Box>
    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
      {value}
    </Typography>
    <Typography variant="subtitle1" color="text.secondary">
      {title}
    </Typography>
  </Paper>
);

const TravelDashboard = () => {
  const { data: stats, isLoading, error } = useGetTravelStatsQuery();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error al cargar las estadísticas
      </Alert>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 600,
          mb: 3,
          color: 'primary.main',
          position: 'relative',
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

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StatCard
            title="Total de Vuelos"
            value={stats?.totalFlights || 0}
            icon={<FlightIcon />}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12}>
          <StatCard
            title="Horas de Vuelo"
            value={stats?.totalHours.toFixed(1) || 0}
            icon={<TimerIcon />}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12}>
          <StatCard
            title="Distancia Total (km)"
            value={stats?.totalDistance.toLocaleString() || 0}
            icon={<SpeedIcon />}
            color="info.main"
          />
        </Grid>
        <Grid item xs={12}>
          <StatCard
            title="Países Visitados"
            value={stats?.countries || 0}
            icon={<PublicIcon />}
            color="warning.main"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TravelDashboard; 