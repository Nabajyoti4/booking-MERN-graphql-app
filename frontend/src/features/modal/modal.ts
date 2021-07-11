import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Modal {
  show: boolean;
}
// auth slice
const initialmodalState: Modal = {
  show: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialmodalState,
  reducers: {
    setModal: (state, action: PayloadAction<Modal>) => {
      state.show = action.payload.show;
    },
  },
});

export const { setModal } = modalSlice.actions;

export default modalSlice.reducer;
