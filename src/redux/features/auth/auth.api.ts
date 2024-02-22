import { baseApi } from "../../baseapi/baseapi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credential) => ({
        url: "/auth/login",
        method: "POST",
        body: credential,
      }),
    }),
    register: builder.mutation({
      query: (credential) => ({
        url: "/auth/register",
        method: "POST",
        body: credential,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
