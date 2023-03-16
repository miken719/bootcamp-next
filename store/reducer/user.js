import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchbase";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
