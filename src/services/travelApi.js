import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const travelApi = createApi({
  reducerPath: 'travelApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api' }),
  tagTypes: ['Travel'],
  endpoints: (builder) => ({
    getTravels: builder.query({
      query: () => 'travels',
      providesTags: ['Travel'],
    }),
    getTravelStats: builder.query({
      query: () => 'travels/stats',
      providesTags: ['Travel'],
    }),
    getFlightInfo: builder.query({
      query: ({ origin, destination }) => `flight-info?origin=${origin}&destination=${destination}`,
    }),
    addTravel: builder.mutation({
      query: (travel) => {
        const { flightDate, ...rest } = travel;
        return {
          url: 'travels',
          method: 'POST',
          body: {
            ...rest,
            date: flightDate.toISOString(),
          },
        };
      },
      invalidatesTags: ['Travel'],
    }),
    deleteTravel: builder.mutation({
      query: (id) => ({
        url: `travels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Travel'],
    }),
    deleteAllTravels: builder.mutation({
      query: () => ({
        url: 'travels',
        method: 'DELETE',
      }),
      invalidatesTags: ['Travel'],
    }),
  }),
});

export const {
  useGetTravelsQuery,
  useGetTravelStatsQuery,
  useGetFlightInfoQuery,
  useAddTravelMutation,
  useDeleteTravelMutation,
  useDeleteAllTravelsMutation,
} = travelApi; 