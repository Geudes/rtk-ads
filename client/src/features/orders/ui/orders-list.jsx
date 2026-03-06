import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../widgets/loader/loader'
import { fetchCancelOrder, fetchOrders, fetchRejectOrder } from '../models/orders-thunks'

function OrdersList() {
    const [tab, setTab] = useState('isBuyer')

    const {itemsIsSeller, itemsIsBuyer, loading} = useSelector(state => state.orders)

    const dispatch = useDispatch()

    const list = tab === 'isBuyer' ? itemsIsBuyer  : itemsIsSeller

    useEffect(() => {
        dispatch(fetchOrders(tab === 'isBuyer' ? false : true))
    }, [dispatch, tab])

    const cancelOrder = (id) => {
        dispatch(fetchCancelOrder(id))
    }

    const rejectOrder = (id) => {
        dispatch(fetchRejectOrder(id))
    }

    if(loading) return <Loader />

  return (
    <div>

        <div className="tab">
            <button onClick={() => setTab('isBuyer')}>Покупатель</button>
            <button onClick={() => setTab('isSeller')}>Продавец</button>
        </div>

        {
            list.map(order => (
                <div className="order" key={order.id}>
                    <h2>{order.Ad.title}</h2>
                    <div>Цена: {order.Ad.price}$</div>
                    <div>Статус: {order.status}</div>
                    {
                        (tab === 'isBuyer' && order.status === 'pending') && (
                            <button onClick={() => cancelOrder(order.id)}>
                                Отменить (cancel)
                            </button>
                        )
                    }
                    {
                        (tab === 'isSeller' && order.status === 'pending') && (
                            <button onClick={() => rejectOrder({adId: order.id})}>
                                Отменить (reject)
                            </button>
                        )
                    }
                </div>
            ))
        }
    </div>
  )
}

export default OrdersList