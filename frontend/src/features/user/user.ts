import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import User from "../../models/user";

// auth slice
const initialAuthState: User = {
  email: "",
  password: "",
};

const userSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        token: string;
        userId: string;
        tokenExpiration: number;
      }>
    ) => {
      console.log(action.payload);
    },
  },
  extraReducers: {},
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
