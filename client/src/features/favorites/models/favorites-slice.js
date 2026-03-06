import { createSlice } from "@reduxjs/toolkit";
import { fetchAddFavorites, fetchFavorites, fetchRemoveFavorites } from "./favorites-thunks";

const initialState = {
    items: [],
    error: undefined,
    loading: false
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.loading = false
                state.error = undefined
                state.items = action.payload
            })
            .addCase(fetchFavorites.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(fetchAddFavorites.fulfilled, (state, action) => {
                state.loading = false
                state.error = undefined
                state.items.push(action.payload)
            })
            .addCase(fetchAddFavorites.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchAddFavorites.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(fetchRemoveFavorites.fulfilled, (state, action) => {
                state.loading = false
                state.error = undefined
                state.items = state.items.filter(el => el.id !== action.payload)
                console.log(action.payload)
            })
            .addCase(fetchRemoveFavorites.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchRemoveFavorites.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default favoritesSlice