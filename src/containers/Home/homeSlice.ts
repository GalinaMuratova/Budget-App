import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";

interface ITransition {
    addTransitionLoading: boolean
}

const initialState: ITransition = {
    addTransitionLoading: false,
};

export const addDish = createAsyncThunk<void, ITrans>(
    'dishes/fetchAdd',
    async (el) => {
        await axiosApi.post('/transitions.json', el);
    },
);

const homeSlice = createSlice( {
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(addDish.pending, (state) => {
            state.addTransitionLoading = true;
        });
        builder.addCase(addDish.fulfilled, (state, action) => {
            state.addTransitionLoading = false;
        });
        builder.addCase(addDish.rejected, (state) => {
            state.addTransitionLoading = false;
        });
    }
});

export const homeReducer = homeSlice.reducer;