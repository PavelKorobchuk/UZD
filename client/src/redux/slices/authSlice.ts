import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../api";

export type AuthState = {
  access_token: null | string;
  username: null | string;
  email: null | string;
  id: null | number | string;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: { access_token: null } as AuthState,
  reducers: {
    register: (state, { payload }: PayloadAction<AuthState>) => {
      // here to set into localstorage
      state.access_token = payload.access_token;
      state.username = payload.username;
      state.email = payload.email;
      state.id = payload.id;
    },
    login: (state, { payload }: PayloadAction<AuthState>) => {
      // here to set into localstorage
      state.access_token = payload.access_token;
      state.username = payload.username;
      state.email = payload.email;
      state.id = payload.id;
    },
    logout: (state) => {
      // here to remove from localstorage
      state.access_token = null;
      state.username = null;
      state.email = null;
      state.id = null;
    },
  },
  extraReducers: (builder) => {
    // builder.addMatcher(
    //   authApi.endpoints.register.matchFulfilled,
    //   (state, { payload }) => {
    //     debugger;
    //     state.access_token = payload.access_token;
    //     state.username = payload.username;
    //     state.email = payload.email;
    //     state.id = payload.id;
    //   }
    // );
    // builder.addMatcher(
    //   authApi.endpoints.login.matchFulfilled,
    //   (state, { payload }) => {
    //     state.access_token = payload.access_token;
    //     state.username = payload.username;
    //     state.email = payload.email;
    //     state.id = payload.id;
    //   }
    // );
  },
});

export const { login, logout, register } = authSlice.actions;

export const selectCurrentUser = (state: any) => state.auth;
