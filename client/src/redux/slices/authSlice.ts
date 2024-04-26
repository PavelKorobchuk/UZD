import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: { access_token: null } as {
    access_token: null | string;
  },
  reducers: {
    login: (
      state,
      { payload: { access_token } }: PayloadAction<{ access_token: string }>
    ) => {
      // here to set into localstorage
      state.access_token = access_token;
    },
    logout: (state) => {
      // here to remove from localstorage
      state.access_token = null;
    },
  },
  extraReducers: (builder) => {},
});

export const { login, logout } = authSlice.actions;

export const selectCurrentUser = (state: any) => state.auth.user;
