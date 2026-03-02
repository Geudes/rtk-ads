import { useContext } from "react";
import { ToastContext } from "../context/toast-context";

function useToast() {
    const ctx = useContext(ToastContext)
    if (!ctx) throw new Error('Не подключён, нету провайдера !!!')
    return ctx
}

export default useToast
