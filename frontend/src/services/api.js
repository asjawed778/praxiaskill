import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, login } from "../store/reducers/authReducer";

const baseURL = `${import.meta.env.VITE_BE_URL}/`;

export const publicBaseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState();
    const accessToken = state?.auth?.accessToken
    
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
  credentials: "include",
});

export const privateBaseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState();
    const accessToken = state?.auth?.accessToken
    
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

export const authBaseQuery = async (args, api, extraOptions) => {
  let result = await privateBaseQuery(args, api, extraOptions);

  if (result?.error && result?.error?.status === 401) {
    api.dispatch(logout());
  }

  return result;
};
