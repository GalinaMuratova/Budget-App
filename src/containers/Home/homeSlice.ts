import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";

interface ITransition {
    transitions: ITransMut[];
    transition: ITrans | null;
    addTransitionLoading: boolean;
    getTransitions:boolean;
    getTransition:boolean;
    editLoading: boolean;
    deleteLoading: boolean | string;
}

const initialState: ITransition = {
    transitions: [],
    transition:null,
    addTransitionLoading: false,
    getTransitions: false,
    getTransition:false,
    editLoading:false,
    deleteLoading: false,
};

export const fetchTransitions = createAsyncThunk<ITransMut[]> (
    'transition/getTransitions',
    async () => {
        const response = await axiosApi.get('/transitions.json');
        let transit:ITransMut[] = [];
        let number = 0;
        if (response.data) {
            transit = Object.keys(response.data).map((key) => {
                const newTransition = response.data[key];
                newTransition.id = key;
                number = Number(newTransition.amount);
                newTransition.amount = number;
                return newTransition
            });
        }
        return transit;
    },
);

export const fetchTransition = createAsyncThunk<ITrans, string>(
    'transition/getTransition',
    async (id) => {
        const response = await axiosApi.get(`/transitions/${id}.json`);
        let number = 0;
        number = Number(response.data.amount);
        response.data.amount = number;
        return {
            ...response.data,
        };
    },
);

export const addTransition = createAsyncThunk<void, ITrans>(
    'transition/fetchAdd',
    async (el) => {
        await axiosApi.post('/transitions.json', el);
    },
);

export const updateTransition = createAsyncThunk<void, IUpdateTrans> (
    'transition/updateTransition',
    async (element) => {
        await axiosApi.put(`/transitions/${element.id}.json`, element.info);
    },
);

export const deleteTransition = createAsyncThunk<void, string>(
    'transition/delete',
    async (id: string) => {
        await axiosApi.delete(`transitions/${id}.json`);
    },
);

const homeSlice = createSlice( {
    name: 'transition',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(fetchTransitions.pending, (state) => {
            state.getTransitions = true;
        });
        builder.addCase(fetchTransitions.fulfilled, (state, action) => {
            state.transitions = action.payload;
            state.getTransitions = false;
        });
        builder.addCase(fetchTransitions.rejected, (state) => {
            state.getTransitions = false;
        });
        builder.addCase(fetchTransition.pending, (state) => {
            state.getTransition = true;
        });
        builder.addCase(fetchTransition.fulfilled, (state, action) => {
            state.transition = action.payload;
            state.getTransition = false;
        });
        builder.addCase(fetchTransition.rejected, (state) => {
            state.getTransition = false;
        });
        builder.addCase(addTransition.pending, (state) => {
            state.addTransitionLoading = true;
        });
        builder.addCase(addTransition.fulfilled, (state) => {
            state.addTransitionLoading = false;
        });
        builder.addCase(addTransition.rejected, (state) => {
            state.addTransitionLoading = false;
        });
        builder.addCase(updateTransition.pending, (state) => {
            state.editLoading= true;
        });
        builder.addCase(updateTransition.fulfilled, (state) => {
            state.editLoading = false;
        });
        builder.addCase(updateTransition.rejected, (state) => {
            state.editLoading = false;
        });
        builder.addCase(deleteTransition.pending, (state, action) => {
            state.deleteLoading = action.meta.arg;
        });
        builder.addCase(deleteTransition.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteTransition.rejected, (state) => {
            state.deleteLoading = false;
        });

    }
});

export const homeReducer = homeSlice.reducer;