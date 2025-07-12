// apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USER_CONFIG } from "../../config";

export const api = createApi({
  reducerPath: "api",
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://silversitting.eu/api",
    prepareHeaders: async (headers) => {
      const token = `Bearer ${await USER_CONFIG.GET_FROM_STORAGE(
        USER_CONFIG.TOKEN_NAME
      )}`;
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: [
    "User",
    "Messages",
    "Blogs",
    "BlogDetails",
    "Feedbacks",
    "ContactUs",
    "Users",
  ],
  endpoints: () => ({}),
});
