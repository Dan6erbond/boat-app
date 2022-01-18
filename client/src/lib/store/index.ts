import { configureStore } from "@reduxjs/toolkit";
import { boatApi } from "./boatApi";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    [boatApi.reducerPath]: boatApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(boatApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
