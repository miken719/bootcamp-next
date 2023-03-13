import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchbase";
export const bootcampApi = createApi({
  reducerPath: "bootcampApi",
  baseQuery: customFetchBase,

  endpoints: (builder) => ({
    bootcamp: builder.mutation({
      query: (params) => ({
        url: "/bootcamps" + params,
        method: "GET",
      }),
      invalidatesTags: ["bootcamp"],
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
