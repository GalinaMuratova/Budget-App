import { configureStore } from '@reduxjs/toolkit';
import {homeReducer} from "../containers/Home/homeSlice";
import {categoriesReducer} from "../containers/Categories/categoriesSlice";

export const store = configureStore({
    reducer: {
        homeReducer: homeReducer,
        categoriesReducer: categoriesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;