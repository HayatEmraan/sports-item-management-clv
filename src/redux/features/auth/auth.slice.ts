import { createSlice } from "@reduxjs/toolkit";

type IInitialState = {
  user: TUser | null;
  token: string | null;
};

type TUser = {
  userId: string;
  name: string;
  email: string;
  role: string;
  branch: string;
  iat: number;
  exp: number;
};

const initialState: IInitialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.token = token;
      state.user = user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
