import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const fetchWishes = createAsyncThunk(
  'wishes/fetchWishes',
  async () => {
    const response = await axios.get(`${API_URL}/wishes`);
    return response.data;
  }
);

export const saveWish = createAsyncThunk(
  'wishes/saveWish',
  async (wishData) => {
    const response = await axios.post(`${API_URL}/wishes`, wishData);
    return response.data;
  }
);

export const updateWish = createAsyncThunk(
  'wishes/updateWish',
  async ({ id, text }) => {
    const response = await axios.put(`${API_URL}/wishes/${id}`, { text });
    return response.data;
  }
);

export const deleteWish = createAsyncThunk(
  'wishes/deleteWish',
  async (id) => {
    await axios.delete(`${API_URL}/wishes/${id}`);
    return id;
  }
);

const initialState = {
  wishes: [],
  status: 'idle',
  error: null,
  loading: false
};

const wishesSlice = createSlice({
  name: 'wishes',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Wishes
      .addCase(fetchWishes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWishes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.wishes = action.payload;
      })
      .addCase(fetchWishes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'Error al cargar los deseos';
      })
      // Save Wish
      .addCase(saveWish.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveWish.fulfilled, (state, action) => {
        state.loading = false;
        state.wishes.unshift(action.payload);
      })
      .addCase(saveWish.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Error al guardar el deseo';
      })
      // Update Wish
      .addCase(updateWish.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateWish.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.wishes.findIndex(wish => wish.id === action.payload.id);
        if (index !== -1) {
          state.wishes[index] = action.payload;
        }
      })
      .addCase(updateWish.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Error al actualizar el deseo';
      })
      // Delete Wish
      .addCase(deleteWish.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWish.fulfilled, (state, action) => {
        state.loading = false;
        state.wishes = state.wishes.filter(wish => wish.id !== action.payload);
      })
      .addCase(deleteWish.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Error al eliminar el deseo';
      });
  }
});

export const { clearError } = wishesSlice.actions;

export default wishesSlice.reducer; 