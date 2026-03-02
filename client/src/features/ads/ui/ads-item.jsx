
import { lazy, Suspense, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAds } from '../models/ads-thunks'

const AdsForm = lazy(() => import('./ads-form'))
const Loader = lazy(() => import('../../../widgets/loader/loader'))
const Modal = lazy(() => import('../../../widgets/modal/modal'))

function AdsItem({ ad }) {
    const [showForm, setShowForm] = useState(false)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const deleteHandler = async () => {
        dispatch(deleteAds(ad.id))
    }

    return (

        <div>
            <h1>{ad.title}</h1>
            <img src={ad.imageUrl} alt="" />
            <h2>{ad.description}</h2>
            <h2>{ad.price}</h2>
            <h2>{ad.Category.name}</h2>
            {
                user && (user.id === ad.userId) &&
                <div>
                    <button onClick={deleteHandler} type='button'>удалить </button>
                    <button type='button' onClick={() => setShowForm(p => !p)}>Обновить</button>
                </div>
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