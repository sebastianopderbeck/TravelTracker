import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const travelApi = createApi({
  reducerPath: 'travelApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Travels'],
  endpoints: (builder) => ({
    getTravels: builder.query({
      query: () => 'travels',
      providesTags: ['Travels'],
    }),
    getTravelStats: builder.query({
      query: () => 'travels/stats',
      providesTags: ['Travel'],
    }),
    getFlightInfo: builder.query({
      query: ({ origin, destination }) => `flight-info?origin=${origin}&destination=${destination}`,
    }),
    addTravel: builder.mutation({
      query: (travel) => ({
        url: 'travels',
        method: 'POST',
        body: travel,
      }),
      invalidatesTags: ['Travels'],
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
    deleteTravelImage: builder.mutation({
      query: ({ travelId, image }) => ({
        url: `travels/${travelId}/image`,
        method: 'DELETE',
        body: { image },
      }),
      invalidatesTags: ['Travels'],
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
  useDeleteTravelImageMutation,
} = travelApi; 