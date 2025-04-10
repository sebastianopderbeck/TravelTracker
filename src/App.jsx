import React from 'react';
import { Box, Container, Grid, Paper, Typography, useTheme } from '@mui/material';
import FlightSearch from './components/FlightSearch';
import TravelList from './components/TravelList';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      <AnimatedBackground />
      <Container maxWidth="lg">
        <Box sx={{ pt: 6, pb: 6 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              mb: 4,
              color: theme.palette.primary.main,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              animation: 'fadeIn 1s ease-in-out',
              '@keyframes fadeIn': {
                '0%': { opacity: 0, transform: 'translateY(-20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            Rastreador de Viajes
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={6} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <FlightSearch />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={6} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <TravelList />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
