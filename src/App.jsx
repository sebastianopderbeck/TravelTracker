import { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Grid, Fade } from '@mui/material';
import FlightSearch from './components/flights/FlightSearch';
import TravelHistory from './components/travels/TravelHistory';
import TravelDashboard from './components/travels/TravelDashboard';
import TravelWish from './components/travels/TravelWish';
import AnimatedBackground from './components/animations/AnimatedBackground';
import FlightLoadingAnimation from './components/animations/FightLoadingAnimation';
import { useGetTravelsQuery } from './services/travelApi';
import { useGetWishesQuery } from './services/wishApi';

function App() {
  const { data: travels = [], isLoading: isLoadingTravels } = useGetTravelsQuery();
  const { data: wishes = [], isLoading: isLoadingWishes } = useGetWishesQuery();
  const [showContent, setShowContent] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    // Detectar el tema inicial del sistema
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // Valor por defecto
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const isLoading = isLoadingTravels || isLoadingWishes;

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      <AnimatedBackground />
      {!showContent ? (
        <Box sx={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 2 
        }}>
          <FlightLoadingAnimation isDark={isDark} />
        </Box>
      ) : (
        <Container sx={{ minWidth: '100vw', position: 'relative', zIndex: 1, py: 2 }}>
          <Fade in={showContent} timeout={1000}>
            <Box>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  pb: 8,
                  mb: 4,
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
                <Grid item xs={12} md={3}>
                  <Paper 
                      elevation={3} 
                      sx={{ 
                        p: 4, 
                        background: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: 2,
                      }}
                    >
                    <FlightSearch />  
                  </Paper>    
                </Grid>
                <Grid item xs={12} md={3}>
                  <Paper 
                      elevation={3} 
                      sx={{ 
                        p: 4, 
                        background: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: 2,
                      }}
                    >
                    <TravelDashboard travels={travels} isLoading={isLoading} />
                  </Paper>    
                </Grid>
                <Grid item xs={12} md={3}>
                  <Paper 
                      elevation={3} 
                      sx={{ 
                        p: 4, 
                        background: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: 2,
                      }}
                    >
                    <TravelHistory travels={travels} isLoading={isLoading} />
                  </Paper>    
                </Grid>
                <Grid item xs={12} md={3}>
                  <Paper 
                      elevation={3} 
                      sx={{ 
                        p: 4, 
                        background: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: 2,
                      }}
                    >
                    <TravelWish wishes={wishes} isLoading={isLoading} />
                  </Paper>    
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Container>
      )}
    </Box>
  );
}

export default App;
