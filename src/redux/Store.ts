import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slice/TodoSlice";

export const store = configureStore({
    reducer: {
        todoState: todoSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;