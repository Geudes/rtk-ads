import { useMemo, useState } from 'react'
import { ToastContext } from '../context/toast-context'
import './toast-providers.css'

function ToastProvider({ children }) {

    const [items, setItems] = useState([])

    const showToast = useMemo(() => (message, type = 'info') => {
        const id = Date.now()

        setItems(prev => [...prev, { id, message, type }])

        setTimeout(() => {
            setItems(prev => prev.filter(el => el.id !== id))
        }, 3000)
    }, [])

    return (
        <ToastContext.Provider value={{ showToast }}>
            <div className="toast-container">
                {
                    items.map(item => (
                        <div key={item.id} className={`toast toast-${item.type}`}>
                            <div className="toast__message">{item.message}</div>
                        </div>
                    ))
                }
            </div>
            {children}
        </ToastContext.Provider>
    )
}

export default ToastProvider