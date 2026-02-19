import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface AuthRequest {
  apiKey: string;
  apiSecret: string;
}

export interface AuthResponse {
  token: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/proxy",
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse, AuthRequest>({
      query: ({ apiKey, apiSecret }) => ({
        url: "/api/v4/developer/sign-in",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { apiKey, apiSecret },
      }),
    }),
  }),
});

export const { useSignInMutation } = authApi;
