import { api } from "@/redux/api/api";

export const childCareSearchApi = api.injectEndpoints({
  endpoints: (builder: any) => ({
    getSearchedChildCarer: builder.mutation({
      query: ({ filterCriteria, data }: any) => ({
        url: `/search?${new URLSearchParams(filterCriteria).toString()}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetSearchedChildCarerMutation } = childCareSearchApi;
