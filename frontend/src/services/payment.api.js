import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { publicBaseQuery } from "./api";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getOrderDetails: builder.query({ query: () => "/orders/1" }),
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
    }),
  }),
});

export const { useGetOrderDetailsQuery, usePlaceOrderMutation } = paymentApi;
