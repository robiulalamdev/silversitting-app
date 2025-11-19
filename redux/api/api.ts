// apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, USER_CONFIG } from "../../config";

export const api = createApi({
  reducerPath: "api",
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
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
    "chats",
    "Blogs",
    "BlogDetails",
    "Feedbacks",
    "ContactUs",
    "Users",
  ],
  endpoints: () => ({}),
});
