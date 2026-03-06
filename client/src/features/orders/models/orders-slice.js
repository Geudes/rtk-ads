import { createSlice } from "@reduxjs/toolkit"
import { fetchCancelOrder, fetchCreateOrder, fetchOrders, fetchRejectOrder } from "./orders-thunks"

const initialState = {
    itemsIsSeller:[],
    itemsIsBuyer: [],
    loading:false,
    error:undefined,
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(fetchOrders.fulfilled, (state, action) => {
            state.loading = false
            state.error = undefined
            const isSeller = action.meta.arg
            if(isSeller) {
                state.itemsIsSeller = action.payload
            } else {
                state.itemsIsBuyer = action.payload
            }
        })
        .addCase(fetchOrders.pending, (state) => {
                    state.loading = true
                    state.error = undefined
        })
        .addCase(fetchOrders.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.error.message
        })
        .addCase(fetchCreateOrder.fulfilled, (state, action) => {
            state.loading = false
            state.error = undefined
            state.itemsIsBuyer.push(action.payload)
        })
        .addCase(fetchCreateOrder.pending, (state) => {
                    state.loading = true
                    state.error = undefined
        })
        .addCase(fetchCreateOrder.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.error.message
        })
        .addCase(fetchCancelOrder.fulfilled, (state, action) => {
            state.loading = false
            state.error = undefined
            state.itemsIsBuyer = state.itemsIsBuyer.map(el => el.id === action.payload.id ? action.payload : el)
        })
        .addCase(fetchCancelOrder.pending, (state) => {
                    state.loading = true
                    state.error = undefined
        })
        .addCase(fetchCancelOrder.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.error.message
        })
        .addCase(fetchRejectOrder.fulfilled, (state, action) => {
            state.loading = false
            state.error = undefined
            state.itemsIsSeller = state.itemsIsSeller.map(el => el.id === action.payload.id ? action.payload : el)
        })
        .addCase(fetchRejectOrder.pending, (state) => {
                    state.loading = true
                    state.error = undefined
        })
        .addCase(fetchRejectOrder.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.error.message
        })
    }
})

export default ordersSlice