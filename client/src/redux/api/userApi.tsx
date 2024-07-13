import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { GenericResponse, IResetPasswordRequest, IAuth } from "./types";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { MutationLifecycleApi } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { userSlice } from "../slices";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCurrentUser: builder.query<GenericResponse, void>({
      query() {
        return { url: `api/user`, credentials: "include" };
      },
    }),
    updateCurrentUser: builder.mutation<GenericResponse, any>({
      query(data) {
        return {
          url: "api/user",
          method: "PUT",
          body: data,
          credentials: "include",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCurrentUserQuery, useUpdateCurrentUserMutation } =
  userApi;
