import React, { useState } from 'react';
import {
  Fade,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Paper,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAddTravelMutation } from '../services/travelApi';
import AddIcon from '@mui/icons-material/Add';

const FlightInfo = ({ flightInfo, onSave }) => {
  const [formData, setFormData] = useState({
    flightDate: null,
  });
  const [addTravel, { isLoading: isSaving }] = useAddTravelMutation();

  const handleSaveTravel = async () => {
    if (flightInfo && formData.flightDate) {
      try {
        const travelData = {
          ...flightInfo,
          flightDate: formData.flightDate,
        };
        await addTravel(travelData);
        setFormData({ flightDate: null });
        if (onSave) {
          onSave();
        }
      } catch (error) {
        console.error('Error saving travel:', error);
      }
    }
  };

  return (
    <Fade in={true}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mt: 3, 
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Información del Vuelo
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Origen:</strong> {flightInfo.origin.name} ({flightInfo.origin.iata})
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {flightInfo.origin.city}, {flightInfo.origin.country}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Destino:</strong> {flightInfo.destination.name} ({flightInfo.destination.iata})
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {flightInfo.destination.city}, {flightInfo.destination.country}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Distancia:</strong> {flightInfo.distance.toLocaleString()} km
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Tiempo estimado:</strong> {flightInfo.estimatedFlightTime} horas
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Fecha del vuelo"
                value={formData.flightDate}
                onChange={(newValue) => {
                  setFormData(prev => ({
                    ...prev,
                    flightDate: newValue
                  }));
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true,
                  }
                }}
                sx={{ mt: 2 }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleSaveTravel}
          disabled={isSaving || !formData.flightDate}
          sx={{
            mt: 2,
            borderRadius: 2,
            textTransform: 'none',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 8px rgba(0,0,0,0.15)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {isSaving ? <CircularProgress size={24} /> : 'Guardar Viaje'}
        </Button>
      </Paper>
    </Fade>
  );
};

export default FlightInfo; 