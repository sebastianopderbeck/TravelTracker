import { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
} from '@mui/material';

const TravelForm = ({ onAddTravel }) => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    flightTime: '',
    distance: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTravel({
      ...formData,
      id: Date.now(),
    });
    setFormData({
      origin: '',
      destination: '',
      flightTime: '',
      distance: '',
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Add New Travel
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Origin"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Flight Time (hours)"
            name="flightTime"
            type="number"
            value={formData.flightTime}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Distance (km)"
            name="distance"
            type="number"
            value={formData.distance}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Add Travel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TravelForm; 