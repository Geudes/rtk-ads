import { createBrowserRouter } from "react-router";
import AdsOnePage from "../../pages/ads/ads-one-page";
import AdsPage from "../../pages/ads/ads-page";
import LoginPage from "../../pages/auth/login-page";
import RegisterPage from "../../pages/auth/register-page";
import CategoriesPage from "../../pages/categories/categories-page";
import CategoryPage from "../../pages/categories/category-page";
import FavoritesPage from "../../pages/favorites/favorites-page";
import MyOrdersPage from "../../pages/orders/my-orders/my-orders-page";
import OrdersPage from "../../pages/orders/orders-page";
import ProfilePage from "../../pages/profile/profile-page";
import NoteFound from "../../widgets/error/note-found";
import Layouts from "../layouts/Layouts";


const router = createBrowserRouter([
    {
      path:'/',
      element:<Layouts />,
      errorElement:<NoteFound />,
      children:[
        {
            path:'/ads',
            element:<AdsPage />
        },
        {
            path:'/ads/:id',
            element:<AdsOnePage />
        },
        {
            path:'/register',
            element:<RegisterPage />
        },
        {
            path:'/login',
            element:<LoginPage />
        },
        {
            path:'/profile',
            element:<ProfilePage/>
        },
        {
            path:'/favorites',
            element:<FavoritesPage />
        },
        {
            patth:'/categories',
            element:<CategoriesPage/>
        },
        {
            path:'/orders',
            element:<OrdersPage/>
        },
        {
            path:'/orders/:id',
            element:<MyOrdersPage/>
        },
        {
            path:'/categories',
            element:<CategoryPage />
        },
        {
            path:'/categories',
            element:<CategoryPage/>
        }
      ]
    }
])
export default router