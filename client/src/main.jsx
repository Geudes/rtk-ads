
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import './index.css'
import router from './app/routers/routers'
import store from './app/store/store'
import ToastProvider from './widgets/toast/providers/toast-provider'


createRoot(document.querySelector('#root')).render(
    <>
        <Provider store={store}>
            <ToastProvider>
                <RouterProvider router={router} ></RouterProvider>
            </ToastProvider>
        </Provider>

    </>
)
