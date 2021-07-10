import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/user";
import errorReducer from "../features/error/error";

export const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
  },
});

// Inferred type: {user : userState}
export type AppDispatch = typeof store.dispatch;

//RootState in the store, which will be used for selectors and action dispatch
// later on.When we type individual states and actions,
// we get a strongly typed store correctly inferred
export type RootState = ReturnType<typeof store.getState>;
