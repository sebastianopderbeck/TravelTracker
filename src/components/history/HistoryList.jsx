import React from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getCountryCodeFromIATA } from '../../utils/iataToCountryCode';

const HistoryList = ({ travels, onDelete, formatDate }) => {
  if (!travels?.length) {
    return (
      <ListItem>
        <ListItemText primary="No hay viajes registrados" />
      </ListItem>
    );
  }

  return (
    <List>
      {travels.map((travel) => (
        <ListItem key={travel._id} sx={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
          <ListItemText
            primary={
              <Box display="flex" alignItems="center">
                <Typography component="span">
                 ({travel.origin.iata})
                  {getCountryCodeFromIATA(travel.origin.iata) && (
                    <img
                      src={`https://flagsapi.com/${getCountryCodeFromIATA(travel.origin.iata)}/flat/24.png`}
                      alt={`${travel.origin.country} flag`}
                      style={{
                        marginLeft: 8,
                        borderRadius: '10px',
                        width: '24px',
                        height: '24px',
                        verticalAlign: 'middle',
                      }}
                    />
                  )}
                </Typography>
                <ArrowForwardIcon sx={{ mx: 1, fontSize: '1rem' }} />
                <Typography component="span">
                  ({travel.destination.iata})
                  {getCountryCodeFromIATA(travel.destination.iata) && (
                    <img
                      src={`https://flagsapi.com/${getCountryCodeFromIATA(travel.destination.iata)}/flat/24.png`}
                      alt={`${travel.destination.country} flag`}
                      style={{
                        marginLeft: 8,
                        borderRadius: '10px',
                        width: '24px',
                        height: '24px',
                        verticalAlign: 'middle',
                      }}
                    />
                  )}
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
          <IconButton edge="end" aria-label="delete" onClick={() => onDelete(travel._id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default HistoryList; 