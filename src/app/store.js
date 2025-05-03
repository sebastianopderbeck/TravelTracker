import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { travelApi } from '../services/travelApi';
import { wishApi } from '../services/wishApi';
import travelsReducer from '../features/travels/travelsSlice';
import wishesReducer from '../features/wishes/wishesSlice';

export const store = configureStore({
  reducer: {
    [travelApi.reducerPath]: travelApi.reducer,
    [wishApi.reducerPath]: wishApi.reducer,
    travels: travelsReducer,
    wishes: wishesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(travelApi.middleware, wishApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch); 