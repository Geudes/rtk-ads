
import { lazy, Suspense, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAddFavorites, fetchRemoveFavorites } from '../../../favorites/models/favorites-thunks'
import { fetchCreateOrder } from '../../../orders/models/orders-thunks'
import { deleteAds } from '../../models/ads-thunks'
import styles from './ads-item.module.css'

const AdsForm = lazy(() => import('../ads-form/ads-form'))
const Loader = lazy(() => import('../../../../widgets/loader/loader'))
const Modal = lazy(() => import('../../../../widgets/modal/modal'))

function AdsItem({ ad }) {
    const [showForm, setShowForm] = useState(false)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const deleteHandler = async () => {
        dispatch(deleteAds(ad.id))
    }

    const [clicked, setClicked] = useState(() => {
        const favorite = localStorage.getItem(`favorite-${ad.id}`)
        if (favorite) {
            return true
        }
        return false
    })

    const makeOrder = async (adId) => {
        dispatch(fetchCreateOrder(adId))
    }

    const favoritesHandler = (adId) => {
        if (clicked) {
            dispatch(fetchRemoveFavorites(adId))
            setClicked(false)
            localStorage.removeItem(`favorite-${adId}`)
        } else {
            dispatch(fetchAddFavorites(adId))
            setClicked(true)
            localStorage.setItem(`favorite-${adId}`, '1')
        }
    }

    return (

        <div className={styles['ads-item']}>
            <h3>{ad.title}</h3>
            <img src={ad.imageUrl} alt="" />
            <span>{ad.description}</span>
            <span>{ad.price}</span>
            <span>{ad.Category.name}</span>
            {
                user && (user.id === ad.userId)
                    ? (
                        <div>
                            <button onClick={deleteHandler} type='button'>удалить </button>
                            <button type='button' onClick={() => setShowForm(p => !p)}>Обновить</button>
                        </div>
                    )
                    : (
                        <div>
                            <button onClick={() => makeOrder(ad.id)}>Заказать</button>
                            <button onClick={() => favoritesHandler(ad.id)}>{clicked ? '💗' : '🖤'}</button>
                        </div>
                    )
            }
            {

                <Suspense fallback={<Loader />}>
                    <Modal isOpen={showForm} onClose={() => setShowForm(false)} title={'Обновление'}>
                        <AdsForm ad={ad} />
                    </Modal>
                </Suspense>
            }
        </div>
    )
}

export default AdsItem