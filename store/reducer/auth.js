import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../customFetchbase";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body: body,
      }),
    }),
    forgetpassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forgetpassword",
        method: "POST",
        body: body,
      }),
    }),
    resetpassword: builder.mutation({
      query: ({ body, token }) => ({
        url: "/auth/resetpassword/" + token,
        method: "PUT",
        body: body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body: body,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/auth/users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: "/auth/users/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useRegisterMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useForgetpasswordMutation,
  useResetpasswordMutation,
} = authApi;
