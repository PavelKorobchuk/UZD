import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GenericResponse, IResetPasswordRequest } from "./types";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation<GenericResponse, any>({
      query(data) {
        return {
          url: "auth/register",
          method: "POST",
          body: data,
        };
      },
    }),
    login: builder.mutation<{ access_token: string; status: string }, any>({
      query(data) {
        return {
          url: "auth/login",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {}
      },
    }),
    logout: builder.mutation<void, void>({
      query() {
        return {
          url: "auth/logout",
          credentials: "include",
        };
      },
    }),
    verifyEmail: builder.mutation<GenericResponse, string>({
      query(verificationCode) {
        return {
          url: `auth/verifyemail/${verificationCode}`,
          credentials: "include",
        };
      },
    }),
    forgotPassword: builder.mutation<GenericResponse, { email: string }>({
      query(body) {
        return {
          url: `auth/forgotpassword`,
          method: "POST",
          credentials: "include",
          body,
        };
      },
    }),
    resetPassword: builder.mutation<GenericResponse, IResetPasswordRequest>({
      query({ resetToken, password, passwordConfirm }) {
        return {
          url: `auth/resetpassword/${resetToken}`,
          method: "PATCH",
          body: { password, passwordConfirm },
          credentials: "include",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
