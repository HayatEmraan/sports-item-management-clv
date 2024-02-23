import { baseApi } from "../../baseapi/baseapi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/user/get-users",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
