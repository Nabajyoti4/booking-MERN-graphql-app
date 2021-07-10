import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Error {
  type: string;
  error: string;
}
// auth slice
const initialErrorState: Error = {
  type: "",
  error: "",
};

const errorSlice = createSlice({
  name: "error",
  initialState: initialErrorState,
  reducers: {
    setError: (state, action: PayloadAction<Error>) => {
      console.log(action.payload);
      state.type = action.payload.type;
      state.error = action.payload.error;
    },
  },
  extraReducers: {},
});

export const { setError } = errorSlice.actions;

export default errorSlice.reducer;
