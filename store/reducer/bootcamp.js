import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchbase";
import { HYDRATE } from "next-redux-wrapper";
export const bootcampApi = createApi({
  reducerPath: "bootcampApi",
  baseQuery: customFetchBase,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    bootcamp: builder.mutation({
      query: (params) => ({
        url: "/bootcamps" + params,
        method: "GET",
      }),
    }),
    bootcampByRadius: builder.mutation({
      query: (params) => ({
        url: `/bootcamps/radius/${params.zipcode}/${params.distance}`,
        method: "GET",
      }),
    }),
    bootcampById: builder.mutation({
      query: (id) => ({
        url: `/bootcamps/${id}`,
        method: "GET",
      }),
    }),
    courseById: builder.mutation({
      query: (id) => ({
        url: `/bootcamps/${id}/courses`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useBootcampMutation,
  useBootcampByRadiusMutation,
  useBootcampByIdMutation,
  useCourseByIdMutation,
  util: { getRunningQueriesThunk },
} = bootcampApi;
// export endpoints for use in SSR
export const { bootcampById } = bootcampApi.endpoints;
