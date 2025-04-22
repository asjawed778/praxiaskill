import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authBaseQuery } from "./api";


export const contactApi = createApi({
  reducerPath: 'contactFormApi',
  baseQuery:authBaseQuery,
  endpoints: (builder) => ({
    contactUs: builder.mutation({
      query: (data) => ({
        url: '/contact-us',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useContactUsMutation } = contactApi;
