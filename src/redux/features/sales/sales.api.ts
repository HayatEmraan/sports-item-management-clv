import { baseApi } from "../../baseapi/baseapi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSale: builder.mutation({
      query: (sale) => ({
        url: "/sales",
        method: "POST",
        body: sale,
      }),
      invalidatesTags: ["sports", "sales"],
    }),
    saleStats: builder.query({
      query: (query) => {
        const searchQuery = new URLSearchParams();
        if (query) {
          searchQuery.append("stats", query);
        }
        return {
          url: `/sales`,
          method: "GET",
          params: searchQuery,
        };
      },
      providesTags: ["sales"],
    }),
    salesReport: builder.query({
      query: (query) => {
        const searchQuery = new URLSearchParams();
        if (query) {
          searchQuery.append("report", query);
        }
        return {
          url: `/sales/report`,
          method: "GET",
          params: searchQuery,
        };
      }
    })
  }),
});

export const { useAddSaleMutation, useSaleStatsQuery, useSalesReportQuery } = salesApi;
