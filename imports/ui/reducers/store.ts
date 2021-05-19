import { configureStore } from "@reduxjs/toolkit";
import tasksViewReducer from "./tasksViewSlice";

export const store = configureStore({
  reducer: {
    tasksView: tasksViewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
