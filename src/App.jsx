import { useState } from 'react';
import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import FlightSearch from './components/FlightSearch';
import TravelHistory from './components/TravelHistory';
import TravelDashboard from './components/TravelDashboard';
import AnimatedBackground from './components/AnimatedBackground';
import { useGetTravelsQuery } from './services/travelApi';

function App() {
  const { data: travels = [], isLoading } = useGetTravelsQuery();

  return (
    <Box>
      <AnimatedBackground />
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 1 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            mb: 2,
            color: 'primary.main',
            textAlign: 'left',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
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
          Travel Traker
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4.2}>
              <FlightSearch />      
          </Grid>
          <Grid item xs={12} md={4.2}>
            <TravelHistory travels={travels} isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={3.6}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
              }}
            >
              <TravelDashboard travels={travels} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
