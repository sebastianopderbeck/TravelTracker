import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Button,
  CircularProgress,
  Alert,
  Fade,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import FlightIcon from '@mui/icons-material/Flight';
import {
  useGetTravelsQuery,
  useDeleteTravelMutation,
  useDeleteAllTravelsMutation
} from '../../services/travelApi';

const TravelList = () => {
  const { data: travels = [], isLoading, error } = useGetTravelsQuery();
  const [deleteTravel] = useDeleteTravelMutation();
  const [deleteAllTravels] = useDeleteAllTravelsMutation();

  const handleDelete = async (id) => {
    try {
      await deleteTravel(id);
    } catch (error) {
      console.error('Error al eliminar viaje:', error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllTravels();
    } catch (error) {
      console.error('Error al eliminar todos los viajes:', error);
    }
  };

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
        Error al cargar los viajes
      </Alert>
    );
  }

  return (
    <Box>
      <Typography 
        variant="h6" 
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
          }
        }}
      >
        Historial de Viajes
      </Typography>

      {travels.length > 0 && (
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteAll}
            startIcon={<DeleteSweepIcon />}
            sx={{
              borderRadius: 2,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
              },
            }}
          >
            Eliminar Todos
          </Button>
        </Box>
      )}

      <List sx={{ width: '100%' }}>
        {travels.map((travel, index) => (
          <Fade in={true} key={travel._id} timeout={300 + index * 100}>
            <Paper
              elevation={2}
              sx={{
                mb: 2,
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateX(5px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                },
              }}
            >
              <ListItem
                sx={{
                  py: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <FlightIcon 
                    color="primary" 
                    sx={{ 
                      mr: 2,
                      transform: 'rotate(90deg)',
                      fontSize: '2rem',
                    }} 
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {travel.origin.name} ({travel.origin.iata}) → {travel.destination.name} ({travel.destination.iata})
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Distancia: {travel.distance} km • Tiempo estimado: {travel.estimatedFlightTime} horas
                    </Typography>
                  </Box>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(travel._id)}
                    sx={{
                      color: 'error.main',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'error.light',
                        color: 'white',
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            </Paper>
          </Fade>
        ))}
        {travels.length === 0 && (
          <Fade in={true}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderRadius: 2,
              }}
            >
              <Typography variant="body1" color="text.secondary">
                No hay viajes registrados
              </Typography>
            </Paper>
          </Fade>
        )}
      </List>
    </Box>
  );
};

export default TravelList; 