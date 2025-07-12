// apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USER_CONFIG } from "../../config";

export const api = createApi({
  reducerPath: "api",
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://192.168.0.109:8000/api/v1",
    baseUrl: "http://192.168.226.26:8000/api/v1",
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
  tagTypes: ["users", "friends", "chats", "messages", "notifications"],
  endpoints: () => ({}),
});
