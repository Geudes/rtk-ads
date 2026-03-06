import { createAsyncThunk } from "@reduxjs/toolkit"
import OrdersApi from "../api/orders-api"

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (asSeller ,{rejectWithValue}) => {
        try {
            const response = await OrdersApi.getOrders(asSeller)
            if('error' in response) {
                throw new Error(response.error)
            }

            return response
        } catch(error) {
            return rejectWithValue(error.response?.data?.error ?? error.message)
        }
    }
)

export const fetchCreateOrder = createAsyncThunk(
    'orders/fetchCreateOrder',
    async (adId ,{rejectWithValue}) => {
        try {
            const response = await OrdersApi.createOrder(adId)
            if('error' in response) {
                throw new Error(response.error)
            }

            return response
        } catch(error) {
            return rejectWithValue(error.response?.data?.error ?? error.message)
        }
    }
)

export const fetchCancelOrder = createAsyncThunk(
    'orders/fetchCancelOrder',
    async (adId ,{rejectWithValue}) => {
        try {
            const response = await OrdersApi.cancelOrder(adId)
            if('error' in response) {
                throw new Error(response.error)
            }

            return response
        } catch(error) {
            return rejectWithValue(error.response?.data?.error ?? error.message)
        }
    }
)

export const fetchRejectOrder = createAsyncThunk(
    'orders/fetchRejectOrder',
    async ({ adId, rejectComment } ,{rejectWithValue}) => {
        try {
            const response = await OrdersApi.rejectOrder(adId, rejectComment)
            if('error' in response) {
                throw new Error(response.error)
            }

            return response
        } catch(error) {
            return rejectWithValue(error.response?.data?.error ?? error.message)
        }
    }
)
