import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const fetchTravels = createAsyncThunk(
  'travels/fetchTravels',
  async () => {
    const response = await axios.get(`${API_URL}/travels`);
    return response.data;
  }
);

export const getFlightInfo = createAsyncThunk(
  'travels/getFlightInfo',
  async ({ origin, destination }) => {
    const response = await axios.get(`${API_URL}/flight-info?origin=${origin}&destination=${destination}`);
    return response.data;
  }
);

export const saveTravel = createAsyncThunk(
  'travels/saveTravel',
  async (travelData) => {
    const response = await axios.post(`${API_URL}/travels`, travelData);
    return response.data;
  }
);

const initialState = {
  travels: [],
  currentFlightInfo: null,
  status: 'idle',
  error: null,
  loading: false
};

const travelsSlice = createSlice({
  name: 'travels',
  initialState,
  reducers: {
    clearFlightInfo: (state) => {
      state.currentFlightInfo = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Travels
      .addCase(fetchTravels.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTravels.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.travels = action.payload;
      })
      .addCase(fetchTravels.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'Error al cargar los viajes';
      })
      // Get Flight Info
      .addCase(getFlightInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFlightInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.currentFlightInfo = action.payload;
      })
      .addCase(getFlightInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Error al buscar la información del vuelo';
      })
      // Save Travel
      .addCase(saveTravel.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveTravel.fulfilled, (state, action) => {
        state.loading = false;
        state.travels.unshift(action.payload);
      })
      .addCase(saveTravel.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Error al guardar el viaje';
      });
  }
});

export const { clearFlightInfo, clearError } = travelsSlice.actions;

export default travelsSlice.reducer; 