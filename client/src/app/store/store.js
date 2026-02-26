import { configureStore } from "@reduxjs/toolkit"
import adsReducer from '../../features/ads/models/ads-slice'
import authReducer from '../../features/auth/models/auth-slice'
import categoriesReducer from '../../features/categories/models/categories-slice'

console.log(adsReducer);

export default configureStore({
    reducer:{
     ads:adsReducer,
     auth:authReducer,
     categories: categoriesReducer,
    }
})