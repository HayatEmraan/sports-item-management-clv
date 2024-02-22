import { baseApi } from "../../baseapi/baseapi";

const sportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSport: builder.mutation({
      query: (sport) => ({
        url: "/sports",
        method: "POST",
        body: sport,
      }),
      invalidatesTags: ["sports"],
    }),
    getSports: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          for (const key in args) {
            params.append(key, args[key]);
          }
        }
        return {
          url: "/sports",
          method: "GET",
          params,
        };
      },
      providesTags: ["sports"],
    }),
    deleteSport: builder.mutation({
      query: (id) => ({
        url: `/sports`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["sports"],
    }),
    updateSport: builder.mutation({
      query: (sport) => {
        const obj = { ...sport };
        delete sport.id;
        return {
          url: `/sports/${obj.id}`,
          method: "PATCH",
          body: sport,
        };
      },
      invalidatesTags: ["sports", "sales"],
    }),
  }),
});

export const {
  useAddSportMutation,
  useGetSportsQuery,
  useDeleteSportMutation,
  useUpdateSportMutation,
} = sportsApi;
