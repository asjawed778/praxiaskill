import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authBaseQuery } from "./api";

export const generalApi = createApi({
  reducerPath: 'generalApi',
  baseQuery:authBaseQuery,
  endpoints: (builder) => ({
    dashboard: builder.query({
      query: (data) => ({
        url: '/dashboard',
        method: 'GET',
      }),
    }),
  }),
});

export const { useDashboardQuery } = generalApi;
