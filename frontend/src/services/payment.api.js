import { createApi } from "@reduxjs/toolkit/query/react";
import { authBaseQuery } from "./api";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    createPaymentOrder: builder.mutation({
      query: ({ courseId, order }) => ({
        url: `/payment/create-order/${courseId}`,
        method: "POST",
        body: order,
      }),
    }),
    verifyPayment: builder.mutation({
      query: (courseId, rajorPayData) => ({
        url: `/payment/verify-payment/${courseId}`,
        method: "POST",
        body: rajorPayData,
      }),
    }),
  }),
});

export const { useCreatePaymentOrderMutation, useVerifyPaymentMutation } =
  paymentApi;
