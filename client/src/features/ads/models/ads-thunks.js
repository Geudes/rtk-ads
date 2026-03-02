import { createAsyncThunk } from "@reduxjs/toolkit"
import AdsApi from "../../../entitites/ads/api/ads-api"


export const fetchAds = createAsyncThunk(
  'ads/fetchAds',
  async (_, { rejectWithValue }) => {
    try {
            const response = await AdsApi.getAll()
            if('error' in response) {
                throw new Error(response.error)
            }

            return response
        } catch(error) {
            return rejectWithValue(error.message)
        }
  }
);

export const createAds = createAsyncThunk(
    'ads/createAds',
    async (ad, { rejectWithValue }) => {
        try {
            const data = await AdsApi.create(ad)
            if('error' in data) {
                throw new Error(data.error)
            }

            return data
        } catch(error) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteAds = createAsyncThunk(
    'ads/deleteAds',
    async (id, {rejectWithValue}) => {
        try {
            const data = await AdsApi.remove(id)
            if('error' in data) {
                throw new Error(data.error)
            }

            return id
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const updateAds = createAsyncThunk(
    'ads/updateAds',
    async ({ ad, id }, {rejectWithValue}) => {
        try {
            const data = await AdsApi.update(id, ad)
            if('error' in data) {
                throw new Error(data.error)
            }

            return data
        } catch (error) {
            return rejectWithValue(error.response.data || error.message || 'Неизвестная ошибка')
        }
    }
)