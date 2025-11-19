// src/utils/getAuthHeaders.ts

import { USER_CONFIG } from "@/config";

export const getAuthHeaders = async (extraHeaders: object = {}) => {
  const token = await USER_CONFIG.GET_FROM_STORAGE(USER_CONFIG.TOKEN_NAME);

  return {
    // "Content-Type": "application/json", // optional
    Authorization: `Bearer ${token || ""}`,
    ...extraHeaders,
  };
};
