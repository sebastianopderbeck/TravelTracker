import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpeedIcon from '@mui/icons-material/Speed';
import SaveIcon from '@mui/icons-material/Save';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { useAddTravelMutation } from '../services/travelApi';

const FlightInfo = ({ flightInfo, onSave }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [addTravel, { isLoading: isSaving }] = useAddTravelMutation();

  const handleSave = async () => {
    if (flightInfo && dateRange[0]) {
      try {
        const travelData = {
          ...flightInfo,
          departureDate: dateRange[0],
          returnDate: dateRange[1],
          isRoundTrip: !!dateRange[1]
        };
        await addTravel(travelData);
        setDateRange([null, null]);
        if (onSave) {
          onSave();
        }
      } catch (error) {
        console.error('Error saving travel:', error);
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Paper elevation={2} sx={{ p: 3, mt: 3, background: 'rgba(255, 255, 255, 0.95)' }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
          Información del Vuelo
        </Typography>

        <Grid container spacing={3}>
          {/* Vuelo de ida */}
          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Vuelo de Ida
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <FlightTakeoffIcon color="primary" sx={{ mr: 1 }} />
                <Typography>
                  {flightInfo.origin.name} ({flightInfo.origin.iata})
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <FlightLandIcon color="primary" sx={{ mr: 1 }} />
                <Typography>
                  {flightInfo.destination.name} ({flightInfo.destination.iata})
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
                <Typography>
                  Duración: {flightInfo.estimatedFlightTime} horas
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SpeedIcon color="primary" sx={{ mr: 1 }} />
                <Typography>
                  Distancia: {flightInfo.distance.toLocaleString()} km
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ 
              '& .MuiDateRangePicker-root': {
                width: '100%',
              },
              '& .MuiDateRangePickerInput-root': {
                width: '100%',
              },
              '& .MuiDateRangePickerInput-input': {
                padding: '12px 14px',
              }
            }}>
              <DateRangePicker
                value={dateRange}
                onChange={setDateRange}
                calendars={1}
                localeText={{
                  start: 'Fecha de ida',
                  end: 'Fecha de vuelta'
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      }
                    }
                  }
                }}
                minDate={new Date(2000, 0, 1)}
              />
            </Box>
          </Grid>

          {/* Vuelo de vuelta */}
          {dateRange[1] && (
            <>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Vuelo de Vuelta
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <FlightTakeoffIcon color="primary" sx={{ mr: 1 }} />
                    <Typography>
                      {flightInfo.destination.name} ({flightInfo.destination.iata})
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <FlightLandIcon color="primary" sx={{ mr: 1 }} />
                    <Typography>
                      {flightInfo.origin.name} ({flightInfo.origin.iata})
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
                    <Typography>
                      Duración: {flightInfo.estimatedFlightTime} horas
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SpeedIcon color="primary" sx={{ mr: 1 }} />
                    <Typography>
                      Distancia: {flightInfo.distance.toLocaleString()} km
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={!dateRange[0]}
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 8px rgba(0,0,0,0.15)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Guardar {dateRange[1] ? 'Vuelos' : 'Vuelo'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </LocalizationProvider>
  );
};

export default FlightInfo; 