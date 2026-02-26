
import { createSlice } from "@reduxjs/toolkit"
import { fetchAds } from "./ads-thunks"


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
                     console.log(1);
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchAds.fulfilled, (state, action) => {
                console.log(1);
                
                state.loading = false
                state.error = undefined
                state.items = action.payload
                console.log(action.payload)
            })
            .addCase(fetchAds.rejected, (state, action) => {
                  console.log(1);
                state.loading = false
                state.error = action.error.message
                console.log(action.payload)
            })
        }
})

export default adsSlice.reducer
