import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  token: string;
  userId: string;
  tokenExpiration: number | null;
}

// auth slice
const initialAuthState: User = {
  token: "",
  userId: "",
  tokenExpiration: null,
};

const userSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.tokenExpiration = action.payload.tokenExpiration;
      localStorage.setItem("token", state.token);
    },
  },
  extraReducers: {},
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
