import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Fade,
  Paper,
} from '@mui/material';
import {
  useGetFlightInfoQuery,
  useAddTravelMutation
} from '../services/travelApi';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const FlightSearch = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
  });
  const [searchInitiated, setSearchInitiated] = useState(false);

  const { data: flightInfo, isLoading: isLoadingFlight, error: flightError } = 
    useGetFlightInfoQuery(formData, { skip: !searchInitiated });
  const [addTravel, { isLoading: isSaving }] = useAddTravelMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.toUpperCase()
    }));
    setSearchInitiated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchInitiated(true);
  };

  const handleSaveTravel = async () => {
    if (flightInfo) {
      await addTravel(flightInfo);
      setFormData({ origin: '', destination: '' });
      setSearchInitiated(false);
    }
  };

  const loading = isLoadingFlight || isSaving;

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
        Buscar Vuelo
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Origen"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              required
              placeholder="Ej: JFK"
              inputProps={{ maxLength: 3 }}
              InputProps={{
                startAdornment: <FlightTakeoffIcon color="primary" sx={{ mr: 1 }} />,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Destino"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
              placeholder="Ej: LAX"
              inputProps={{ maxLength: 3 }}
              InputProps={{
                startAdornment: <FlightLandIcon color="primary" sx={{ mr: 1 }} />,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
              sx={{
                py: 1.5,
                borderRadius: 2,
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                },
              }}
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {flightError && (
        <Fade in={true}>
          <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
            Error al buscar la información del vuelo
          </Alert>
        </Fade>
      )}

      {flightInfo && (
        <Fade in={true}>
          <Paper 
            elevation={3} 
            sx={{ 
              mt: 3, 
              p: 3, 
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid',
              borderColor: 'primary.light',
            }}
          >
            <Typography variant="h6" gutterBottom align="center" color="primary">
              Información del Vuelo
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Origen:</strong> {flightInfo.origin.name} ({flightInfo.origin.iata})
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Destino:</strong> {flightInfo.destination.name} ({flightInfo.destination.iata})
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Distancia:</strong> {flightInfo.distance} km
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Tiempo estimado:</strong> {flightInfo.estimatedFlightTime} horas
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={handleSaveTravel}
                  disabled={isSaving}
                  startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
                  sx={{ 
                    mt: 2,
                    py: 1.5,
                    borderRadius: 2,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  {isSaving ? 'Guardando...' : 'Agregar al Historial'}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Fade>
      )}
    </Box>
  );
};

export default FlightSearch; 