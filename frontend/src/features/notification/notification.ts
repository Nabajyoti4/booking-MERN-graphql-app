import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Error {
  type: string;
  code: string;
  message: string;
  show: boolean;
}
// auth slice
const initialNotificationState: Error = {
  type: "",
  code: "",
  message: "",
  show: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialNotificationState,
  reducers: {
    setNotification: (state, action: PayloadAction<Error>) => {
      state.code = action.payload.code;
      state.message = action.payload.message;
      state.show = action.payload.show;
      state.type = action.payload.type;
    },
  },
  extraReducers: {},
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
