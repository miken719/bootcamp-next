import { API_URL } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { HYDRATE } from "next-redux-wrapper";
import customFetchBase from "./customFetchbase";

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,

  // Prepare headers
  prepareHeaders: (headers, { getState }) => {
    const token =
      typeof window !== "undefined" && localStorage?.getItem("token");
    if (token) {
      headers.set("Content-Type", "application/json");
      headers.set("authorization", `Bearer ${token}`);
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
