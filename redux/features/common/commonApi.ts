import { api } from "@/redux/api/api";

export const commonApi = api.injectEndpoints({
  endpoints: (builder: any) => ({
    addFeedback: builder.mutation({
      query: (data: any) => ({
        url: "/feedback/add",
        method: "POST",
        body: data,
      }),
    }),
    makeContact: builder.mutation({
      query: (data: any) => ({
        url: "/makeContact/add",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddFeedbackMutation, useMakeContactMutation } = commonApi;
