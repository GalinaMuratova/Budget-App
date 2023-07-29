import { configureStore } from '@reduxjs/toolkit';
import {homeReducer} from "../containers/Home/homeSlice";

export const store = configureStore({
    reducer: {
        homeReducer: homeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;