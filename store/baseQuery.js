import { API_URL } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import customFetchBase from "./customFetchbase";

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,

  // Prepare headers
  prepareHeaders: (headers, {}) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Content-Type", "application/json");
      headers.set("authorization", token);
    }
    return headers;
  },
});

export default class BaseApi {
  constructor({ reducerPath }) {
    this.reducerPath = reducerPath;
  }

  createApi = () =>
    createApi({
      reducerPath: this.reducerPath,
      baseQuery: customFetchBase,
      endpoints: () => ({}),
    });
}
