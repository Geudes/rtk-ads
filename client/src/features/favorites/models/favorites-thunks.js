import { createAsyncThunk } from "@reduxjs/toolkit"
import FavoritesApi from "../api/favorites-api"

export const fetchFavorites = createAsyncThunk(
    'orders/fetchFavorites',
    async (_ ,{rejectWithValue}) => {
        try {
            const response = await FavoritesApi.getAll()
            if('error' in response) {
                throw new Error(response.error)
            }

            return response
        } catch(error) {
            return rejectWithValue(error.response?.data?.error ?? error.message)
        }
    }
)

export const fetchAddFavorites = createAsyncThunk(
    'orders/fetchAddFavorites',
    async (adId ,{rejectWithValue}) => {
        try {
            const response = await FavoritesApi.add(adId)
            if('error' in response) {
                throw new Error(response.error)
            }

            return response
        } catch(error) {
            return rejectWithValue(error.response?.data?.error ?? error.message)
        }
    }
)

export const fetchRemoveFavorites = createAsyncThunk(
    'orders/fetchRemoveavorites',
    async (adId ,{rejectWithValue}) => {
        try {
            const response = await FavoritesApi.remove(adId)
            if('error' in response) {
                throw new Error(response.error)
            }

            return adId
        } catch(error) {
            return rejectWithValue(error.response?.data?.error ?? error.message)
        }
    }
)

