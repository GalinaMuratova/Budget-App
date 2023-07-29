import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";

interface Category {
    addLoading:boolean;
    getCategory: boolean;
    categories: ICategoryMut[];
    categoryForm: ICategoryForm[];
    deleteLoading: boolean | string;
    category: ICategory | null;
    editLoading: boolean;
    getLoading: boolean;
}

const initialState: Category = {
    addLoading: false,
    getCategory: false,
    categories: [],
    categoryForm: [],
    deleteLoading: false,
    category: null,
    editLoading: false,
    getLoading:false,
};

export const fetchCategories = createAsyncThunk<ICategoryMut[]> (
    'category/getCategories',
    async () => {
        const response = await axiosApi.get('/categories.json');
        let category:ICategoryMut[] = [];
        if (response.data) {
            category = Object.keys(response.data).map((key) => {
                const newCategory = response.data[key];
                newCategory.id = key;
                return newCategory;
            });
        }
        return category;
    },
);

export const fetchCategory = createAsyncThunk<ICategory, string>(
    'category/getCategory',
    async (id) => {
        console.log(id)
        const response = await axiosApi.get(`/categories/${id}.json`);
        console.log(response.data)
        return {
            ...response.data,
        };
    },
);

export const addCategory = createAsyncThunk<void, ICategory>(
    'category/fetchAdd',
    async (el) => {
        await axiosApi.post('/categories.json', el);
    },
);

export const updateCategory = createAsyncThunk<void, IUpdateCategory> (
    'category/updateTransition',
    async (element) => {
        await axiosApi.put(`/categories/${element.id}.json`, element.info);
    },
);

export const deleteCategory = createAsyncThunk<void, string>(
    'category/delete',
    async (id: string) => {
        await axiosApi.delete(`categories/${id}.json`);
    },
);

const categoriesSlice = createSlice( {
    name: 'category',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.getCategory = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.getCategory = false;
        });
        builder.addCase(fetchCategories.rejected, (state) => {
            state.getCategory = false;
        });
        builder.addCase(fetchCategory.pending, (state) => {
            state.getLoading = true;
        });
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.category = action.payload;
            console.log(state.category)
            state.getLoading = false;
        });
        builder.addCase(fetchCategory.rejected, (state) => {
            state.getLoading = false;
        });
        builder.addCase(addCategory.pending, (state) => {
            state.addLoading = true;
        });
        builder.addCase(addCategory.fulfilled, (state) => {
            state.addLoading = false;
        });
        builder.addCase(addCategory.rejected, (state) => {
            state.addLoading = false;
        });
        builder.addCase(updateCategory.pending, (state) => {
            state.editLoading = true;
        });
        builder.addCase(updateCategory.fulfilled, (state) => {
            state.editLoading = false;
        });
        builder.addCase(updateCategory.rejected, (state) => {
            state.editLoading = false;
        });
        builder.addCase(deleteCategory.pending, (state, action) => {
            state.deleteLoading = action.meta.arg;
        });
        builder.addCase(deleteCategory.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteCategory.rejected, (state) => {
            state.deleteLoading = false;
        });
    },
});

export const categoriesReducer = categoriesSlice.reducer;
