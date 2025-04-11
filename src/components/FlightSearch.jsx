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
import FlightInfo from './FlightInfo';

const FlightSearch = () => {
  const [searchData, setSearchData] = useState({
    origin: '',
    destination: '',
  });
  
  const [searchInitiated, setSearchInitiated] = useState(false);

  const { data: flightInfo, isLoading: isLoadingFlight, error: flightError } = 
    useGetFlightInfoQuery(searchData, { skip: !searchInitiated });
  const [{ isLoading: isSaving }] = useAddTravelMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value.toUpperCase()
    }));
    setSearchInitiated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchInitiated(true);
  };

  const handleSave = () => {
    setSearchData({ origin: '', destination: '' });
    setSearchInitiated(false);
  };

  const loading = isLoadingFlight || isSaving;

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper elevation={3} sx={{ p: 2, background: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography 
          variant="h6" 
          gutterBottom 
          sx={{ 
            fontWeight: 600,
            mb: 6,
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
          Buscador de vuelos
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Origen (Código IATA)"
              name="origin"
              value={searchData.origin}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: <FlightTakeoffIcon color="primary" sx={{ mr: 1 }} />,
              }}
              placeholder="Ej: EZE"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Destino (Código IATA)"
              name="destination"
              value={searchData.destination}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: <FlightLandIcon color="primary" sx={{ mr: 1 }} />,
              }}
              placeholder="Ej: BCN"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<SearchIcon />}
              disabled={loading}
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
              {loading ? <CircularProgress size={24} /> : 'Buscar Vuelo'}
            </Button>
          </Grid>
        </Grid>

        {flightError && (
          <Fade in={true}>
            <Alert severity="error" sx={{ mt: 2 }}>
              Error al buscar el vuelo. Por favor, intente nuevamente.
            </Alert>
          </Fade>
        )}

        {flightInfo && !loading && searchInitiated && (
          <FlightInfo 
            flightInfo={flightInfo} 
            onSave={handleSave}
          />
        )}
      </Paper>
    </Box>
  );
};

export default FlightSearch; 