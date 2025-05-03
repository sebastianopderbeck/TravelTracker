import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const wishApi = createApi({
  reducerPath: 'wishApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api' }),
  tagTypes: ['Wishes'],
  endpoints: (builder) => ({
    getWishes: builder.query({
      query: () => 'wishes',
      providesTags: ['Wishes'],
    }),
    addWish: builder.mutation({
      query: (wish) => ({
        url: 'wishes',
        method: 'POST',
        body: wish,
      }),
      invalidatesTags: ['Wishes'],
    }),
    updateWish: builder.mutation({
      query: ({ id, text }) => ({
        url: `wishes/${id}`,
        method: 'PUT',
        body: { text },
      }),
      invalidatesTags: ['Wishes'],
    }),
    deleteWish: builder.mutation({
      query: (id) => ({
        url: `wishes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Wishes'],
    }),
  }),
});

export const {
  useGetWishesQuery,
  useAddWishMutation,
  useUpdateWishMutation,
  useDeleteWishMutation,
} = wishApi; 