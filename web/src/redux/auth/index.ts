import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IUser = {
  id: string;
  name: string;
  email: string;
  registry: string;
  is_deleted: boolean;
};

type AuthState = { user: IUser | null; token: string | null };

type LoginData = { user: IUser; accessToken: string };

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, accessToken } }: PayloadAction<LoginData>
    ) => {
      state.token = accessToken;
      state.user = user;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
