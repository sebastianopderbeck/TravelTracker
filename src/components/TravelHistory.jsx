import React from 'react';
import { Box, Typography, Paper, CircularProgress, List, ListItem, ListItemText, ListItemIcon, Divider, IconButton, Tooltip } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useDeleteTravelMutation, useGetTravelsQuery } from '../services/travelApi';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const formatDate = (date) => {
  if (!date) return 'No especificada';
  try {
    return format(new Date(date), 'dd/MM/yyyy', { locale: es });
  } catch (error) {
    console.error('Error formateando fecha:', error);
    return 'Fecha inválida';
  }
};

const TravelHistory = () => {
  const { data: travels, isLoading } = useGetTravelsQuery();
  const [deleteTravel] = useDeleteTravelMutation();

  const handleDelete = async (id) => {
    try {
      await deleteTravel(id);
    } catch (error) {
      console.error('Error deleting travel:', error);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          fontWeight: 600,
          mb: 2,
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
        Historial de Viajes
      </Typography>
      <List>
        {travels?.length > 0 ? (
          travels.map((travel) => (
            <ListItem key={travel._id} sx={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
              <ListItemIcon>
                <FlightIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center">
                    <Typography component="span">
                      {travel.origin.country} ({travel.origin.iata})
                    </Typography>
                    <ArrowForwardIcon sx={{ mx: 1, fontSize: '1rem' }} />
                    <Typography component="span">
                      {travel.destination.country} ({travel.destination.iata})
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Fecha de ida: {formatDate(travel.departureDate)}
                    </Typography>
                    {travel.isRoundTrip && travel.returnDate && (
                      <Typography variant="body2" color="text.secondary">
                        Fecha de vuelta: {formatDate(travel.returnDate)}
                      </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary">
                      Distancia: {travel.distance.toLocaleString()} km
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Duración: {travel.estimatedFlightTime} horas
                    </Typography>
                  </Box>
                }
              />
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(travel._id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No hay viajes registrados" />
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default TravelHistory; 