
import { createSlice } from "@reduxjs/toolkit"
import { createAds, deleteAds, fetchAds, updateAds } from "./ads-thunks"


const initialState = {
    items: [],
    loading:false,
    error:undefined 
}
 
const adsSlice= createSlice({
    name:'ads',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
            builder
            .addCase(fetchAds.pending, (state, _) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchAds.fulfilled, (state, action) => {  
                state.loading = false
                state.error = undefined
                state.items = action.payload
            })
            .addCase(fetchAds.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(createAds.pending, (state, _) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(createAds.fulfilled, (state, action) => {
                state.loading = false
                state.error = undefined
                state.items.push(action.payload)
            })
            .addCase(createAds.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(updateAds.pending, (state, _) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(updateAds.fulfilled, (state, action) => {
                state.loading = false
                state.error = undefined
                state.items = state.items.map(el => el.id === action.payload.id ? action.payload : el)
                console.log(action.payload)
            })
            .addCase(updateAds.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(deleteAds.pending, (state, _) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(deleteAds.fulfilled, (state, action) => {
                state.loading = false
                state.error = undefined
                state.items = state.items.filter(el => el.id !== action.payload)
            })
            .addCase(deleteAds.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        }
})

export default adsSlice.reducer
