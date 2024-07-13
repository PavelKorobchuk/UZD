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
import { authSlice } from "../slices";

const onQueryStarted = async (
  _args: any,
  {
    dispatch,
    queryFulfilled,
  }: MutationLifecycleApi<
    any,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    GenericResponse,
    "authApi"
  >
) => {
  try {
    const { data } = await queryFulfilled;
    const { access_token } = data;
    if (access_token) {
      localStorage.setItem("userAuthData", JSON.stringify(data));
      // dispatch(authSlice.actions.login(data));
    }
  } catch (error) {
    console.warn("Something went wrong!");
  }
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation<GenericResponse, any>({
      query(data) {
        return {
          url: "api/users/signup",
          method: "POST",
          body: data,
        };
      },
      onQueryStarted,
    }),
    login: builder.mutation<GenericResponse, any>({
      query(data: { email: string; password: string }) {
        return {
          url: "api/users/login",
          method: "POST",
          body: data,
          // credentials: "include",
        };
      },
      onQueryStarted,
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
