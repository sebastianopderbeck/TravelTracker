import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { travelApi } from '../services/travelApi';
import travelsReducer from '../features/travels/travelsSlice';

export const store = configureStore({
  reducer: {
    [travelApi.reducerPath]: travelApi.reducer,
    travels: travelsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(travelApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch); 