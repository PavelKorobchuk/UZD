import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userApi } from "../api";

export type CurrentUserState = {
  username: null | string;
  email: null | string;
  id: null | number | string;
};

export const userSlice = createSlice({
  name: "user",
  initialState: {} as CurrentUserState,
  reducers: {
    currentUser: (state, { payload }: PayloadAction<CurrentUserState>) => ({
      ...state,
      ...payload,
    }),
  },
  extraReducers: (builder) => {},
});

export const { currentUser } = userSlice.actions;

export const getCurrentUserData = (state: any) => state.currentUser;
