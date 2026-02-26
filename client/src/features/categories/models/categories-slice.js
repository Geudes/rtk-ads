import { createSlice } from "@reduxjs/toolkit"
import CategoriesApi from "../api/categories-api"
import { createCategories, deleteCategories, setCategories } from "./categories-thunks"

const initialState = {
    items:[],
    loading:false,
    error:undefined,
}

// export const fetchUserById = createAsyncThunk(
//   'users/fetchById',
//   async (userId, { rejectWithValue }) => { // The first param can accept arguments, the second is thunkAPI
//     try {
//       const response = await fetch(`/api/users/${userId}`);
//       // fetch won't reject on HTTP errors (like 404), so we check response.ok manually
//       if (!response.ok) {
//         throw new Error('Server error');
//       }
//       const data = await response.json();
//       return data; // This value becomes the payload of the 'fulfilled' action
//     } catch (error) {
//       // Use rejectWithValue to return a specific error payload and trigger the 'rejected' action
//       return rejectWithValue(error.message);
//     }
//   }
// );

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(setCategories.pending, (state) => {
            state.loading = true
            state.error = undefined
        })
        .addCase(setCategories.fulfilled, (state, action) => {
            state.loading = false
            state.error = undefined
            state.items = action.payload
        })
        .addCase(setCategories.rejected, (state, action) => {
            state.loading = false
            state.items = []
            state.error = action.error.message
        })
        .addCase(createCategories.pending, (state) => {
            state.loading = true
            state.error = undefined
        })
        .addCase(createCategories.fulfilled, (state, action) => {
            state.loading = false
            state.error = undefined
            state.items.push(action.payload)
        })
        .addCase(createCategories.rejected, (state, action) => {
            state.loading = false
            state.items = []
            state.error = action.error.message
        })
        .addCase(deleteCategories.pending, (state) => {
            state.loading = true
            state.error = undefined
        })
        .addCase(deleteCategories.fulfilled, (state, action) => {
            console.log(action.payload)
            state.loading = false
            state.error = undefined
            state.items = state.items.filter(el => el.id !== action.payload)
        })
        .addCase(deleteCategories.rejected, (state, action) => {
            state.loading = false
            state.items = []
            state.error = action.error.message
        })
    }
})

export default categoriesSlice.reducer;