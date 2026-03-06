import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import GuardAuth from "../../shared/lib/guard/guard-auth";

const AdsOnePage = lazy(() => import("../../pages/ads/ads-one-page")) ;
const AdsPage = lazy(() => import("../../pages/ads/ads-page")) ;
const LoginPage = lazy(() => import("../../pages/auth/login-page")) ;
const RegisterPage = lazy(() => import("../../pages/auth/register-page")) ;
const CategoriesPage = lazy(() => import("../../pages/categories/categories-page")) ;
const CategoryPage = lazy(() => import("../../pages/categories/category-page")) ;
const FavoritesPage = lazy(() => import("../../pages/favorites/favorites-page")) ;
const MyOrdersPage = lazy(() => import("../../pages/orders/my-orders/my-orders-page")) ;
const OrdersPage = lazy(() => import("../../pages/orders/orders-page")) ;
const ProfilePage = lazy(() => import("../../pages/profile/profile-page")) ;
const NoteFound = lazy(() => import("../../widgets/error/note-found")) ;
const Layouts = lazy(() => import("../layouts/Layouts")) ;


const router = createBrowserRouter([
    {
      path:'/',
      element:<Layouts />,
      errorElement:<NoteFound />,
      children:[
        {
            path:'/ads',
            element:<GuardAuth><AdsPage /></GuardAuth>
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
            element:<GuardAuth><FavoritesPage /></GuardAuth>
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
            element:<GuardAuth><MyOrdersPage/></GuardAuth>
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