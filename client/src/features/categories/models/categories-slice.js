import { createSlice } from "@reduxjs/toolkit"
import { createCategories, deleteCategories, setCategories } from "./categories-thunks"

const initialState = {
    items:[],
    loading:false,
    error:undefined,
}

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