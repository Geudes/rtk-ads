import { createAsyncThunk } from "@reduxjs/toolkit"
import CategoriesApi from "../api/categories-api"

export const setCategories = createAsyncThunk(
    'categories/setCategories',
    async (_ ,{rejectWithValue}) => {
        try {
            const response = await CategoriesApi.getAll()
            if('error' in response) {
                throw new Error(response.error)
            }
            console.log(response)

            return response
        } catch(error) {
            return rejectWithValue(error.message)
        }
    }
)

export const createCategories = createAsyncThunk(
    'categories/createCategories',
    async (category, { rejectWithValue }) => {
        try {
            const data = await CategoriesApi.create(category)
            if('error' in data) {
                throw new Error(data.error)
            }

            return data
        } catch(error) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteCategories = createAsyncThunk(
    'categories/deleteCategories',
    async (id, {rejectWithValue}) => {
        try {
            const data = await CategoriesApi.remove(id)
            if('error' in data) {
                throw new Error(data.error)
            }

            return id
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)