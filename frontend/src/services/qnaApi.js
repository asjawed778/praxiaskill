// src/services/qnaApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authBaseQuery } from './api';

export const qnaApi = createApi({
  reducerPath: 'qnaApi',
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    getQnas: builder.query({
      query: () => '/qna',
    }),
    createQna: builder.mutation({
      query: ({courseId , newQna}) => ({
        url: `/course/qna?courseId=${courseId}`,
        method: 'POST',
        body: newQna,
      }),
    }),
    addReplyToQna: builder.mutation({
      query: ({ qnaId, reply }) => ({
        url: `/qna/${qnaId}/reply`,
        method: 'POST',
        body: reply,
      }),
    }),
  }),
});

export const {
  useGetQnasQuery,
  useCreateQnaMutation,
  useAddReplyToQnaMutation,
} = qnaApi;
